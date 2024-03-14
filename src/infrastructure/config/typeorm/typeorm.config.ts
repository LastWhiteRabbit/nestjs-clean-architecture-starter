import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV === 'local') {
  dotenv.config({ path: './env/local.env' });
}

const config = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  schema: process.env.DATABASE_SCHEMA,
  logging: process.env.NODE_ENV === 'development',
  synchronize: false,
  entities: [__dirname + './../../**/*.entity{.ts,.js}'],
  migrationsRun: true,
  migrationsTableName: 'migration_product',
  subscribers: [],
  migrations: ['database/migrations/**/*{.ts,.js}'],
});

console.log('config', config);

export default config;
