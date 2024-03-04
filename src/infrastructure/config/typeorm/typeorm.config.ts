import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV === 'local') {
    dotenv.config({ path: './env/local.env' });
}
const config = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "postgres",
    schema: "public",
    synchronize: false,
    logging: true,
    entities: [__dirname + './../../**/*.entity{.ts,.js}'],
    migrationsTableName: 'migrations',
    subscribers: [],
    // migrations: ['migrations/**/*{.ts,.js}'],
    migrations: ['database/migrations/**/*{.ts,.js}'],
})

// const config = new DataSource({
//   type: 'postgres',
//   host: process.env.DATABASE_HOST,
//   port: parseInt(process.env.DATABASE_PORT),
//   username: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   schema: process.env.DATABASE_SCHEMA,
//   logging: process.env.NODE_ENV === 'development',
//   synchronize: false,
// entities: [__dirname + './../../**/*.entity{.ts,.js}'],
//   migrationsRun: true,
//   migrationsTableName: 'migration_product',
//   migrations: ['database/migrations/**/*{.ts,.js}'],
//   // cli: {
//   //   migrationsDir: 'database/migrations',
//   // },
//   // ssl: {
//   //   rejectUnauthorized: false,
//   // },
// });

console.log('config', config);

export default config;

// import { DataSource } from 'typeorm'
// import * as dotenv from 'dotenv'

// dotenv.config()

// const {
//   DATABASE_HOST,
//   DATABASE_NAME,
//   DATABASE_USER,
//   DATABASE_PASSWORD,
//   DATABASE_PORT,
//   DATABASE_SSL,
// } = process.env

// export const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: DATABASE_HOST,
//   port: parseInt(DATABASE_PORT, 10),
//   username: DATABASE_USER,
//   password: DATABASE_PASSWORD,
//   database: DATABASE_NAME,
//   schema: 'public',
//   logging: process.env.NODE_ENV === 'development',
//   synchronize: false,
// //   ssl: DATABASE_SSL !== 'false',
//   migrationsTableName: 'products',
//   migrations: ['dist/migrations/*.js'],
// })