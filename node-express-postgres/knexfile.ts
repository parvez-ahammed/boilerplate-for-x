import knex, { Knex } from 'knex';
import { dbConfig } from './src/configs/db';

const knexConfig: Knex.Config = {
    client: 'pg',
    connection: {
        host: dbConfig.dbHost,
        port: Number(dbConfig.dbPort),
        user: dbConfig.dbUser,
        password: String(dbConfig.dbPass),
        database: dbConfig.dbName,
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: './src/database/migrations',
        extension: 'ts',
    },
    seeds: {
        directory: './src/database/seeds',
        extension: 'ts',
    },
};

export default knexConfig;
export const db = knex(knexConfig);
