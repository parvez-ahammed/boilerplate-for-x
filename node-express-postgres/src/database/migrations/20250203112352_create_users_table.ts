import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('username').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.dateTime('joinDate').notNullable().defaultTo(knex.fn.now());
        table.integer('role').defaultTo(0);
        table.dateTime('passwordLastModificationTime').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('users');
}
