import { Client } from 'pg';

const PROD_DB = process.env.DATABASE_URL_PROD;
const DEV_DB = process.env.DATABASE_URL_DEV;

if (!PROD_DB || !DEV_DB) {
  console.error('Error: DATABASE_URL_PROD y DATABASE_URL_DEV deben estar configuradas');
  process.exit(1);
}

async function backupAndRestore() {
  const prodClient = new Client({
    connectionString: PROD_DB,
    ssl: { rejectUnauthorized: false }
  });
  const devClient = new Client({
    connectionString: DEV_DB,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Conectando a BD Prod...');
    await prodClient.connect();
    console.log('✓ Conectado a BD Prod');

    console.log('Conectando a BD Dev...');
    await devClient.connect();
    console.log('✓ Conectado a BD Dev');

    // Get all tables
    const tables = await prodClient.query(`
      SELECT tablename FROM pg_tables
      WHERE schemaname = 'public'
    `);

    console.log(`\nEncontrando ${tables.rows.length} tablas...`);

    // Copy tables in order (respecting foreign keys)
    for (const table of tables.rows) {
      const tableName = table.tablename;
      console.log(`\nCopiando tabla: ${tableName}...`);

      // Skip Prisma internal tables
      if (tableName.startsWith('_prisma')) {
        console.log('  ⊘ Tabla interna de Prisma, ignorada');
        continue;
      }

      // Delete existing data (cascade if constraints exist)
      try {
        await devClient.query(`DELETE FROM "${tableName}"`);
      } catch (e) {
        // Try with CASCADE if there are foreign keys
        try {
          await devClient.query(`TRUNCATE TABLE "${tableName}" CASCADE`);
        } catch (err) {
          console.warn(`  ⚠ No se pudo vaciar tabla, continuando...`);
        }
      }

      // Get data from prod
      const data = await prodClient.query(`SELECT * FROM "${tableName}"`);

      if (data.rows.length > 0) {
        // Get column names
        const columns = Object.keys(data.rows[0]);
        const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
        const insertQuery = `
          INSERT INTO "${tableName}" (${columns.map(c => `"${c}"`).join(', ')})
          VALUES (${placeholders})
        `;

        // Insert data
        for (const row of data.rows) {
          await devClient.query(insertQuery, columns.map(col => row[col]));
        }
        console.log(`  ✓ Copiadas ${data.rows.length} filas`);
      } else {
        console.log('  ✓ Tabla vacía');
      }
    }

    console.log('\n✓ Migración completada exitosamente');
  } catch (error) {
    console.error('✗ Error durante la migración:', error);
    process.exit(1);
  } finally {
    await prodClient.end();
    await devClient.end();
  }
}

backupAndRestore();
