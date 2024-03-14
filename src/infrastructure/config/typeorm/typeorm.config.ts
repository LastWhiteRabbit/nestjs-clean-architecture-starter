import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV === 'local') {
  dotenv.config({ path: './env/local.env' });
}

function getConfig(): DataSourceOptions & SeederOptions {
  return {
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
    seeds: ['src/infrastructure/database/seeds/**/*{.ts,.js}'],
    factories: ['src/infrastructure/database/factories/**/*{.ts,.js}'],
  };
}

const config = new DataSource(getConfig());

console.log('config', config);

export default config;
