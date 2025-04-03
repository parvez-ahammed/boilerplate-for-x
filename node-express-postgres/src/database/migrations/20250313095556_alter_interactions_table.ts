import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('interactions');

    await knex.schema.createTable('interactions', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('parentId').notNullable();
        table.uuid('childId').notNullable();
        table.string('parentType', 50).notNullable();
        table.string('childType', 50).notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());

        // Indexes for faster lookups
        table.index(['parentType', 'parentId']);
        table.index(['childType', 'childId']);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('interactions');

    await knex.schema.createTable('interactions', (table) => {
        table.increments('id').primary();
        table.integer('parentId').notNullable();
        table.integer('childId').notNullable();
        table.string('parentType', 50).notNullable();
        table.string('childType', 50).notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());

        // Indexes for faster lookups
        table.index(['parentType', 'parentId']);
        table.index(['childType', 'childId']);
    });
}
