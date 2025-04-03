import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('auth', (table) => {
        table.dropColumn('user_id');
    });

    await knex.schema.alterTable('auth', (table) => {
        table.string('user_id').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('auth', (table) => {
        table.dropColumn('user_id');
    });

    await knex.schema.alterTable('auth', (table) => {
        table.integer('user_id').unsigned().notNullable();
    });
}
