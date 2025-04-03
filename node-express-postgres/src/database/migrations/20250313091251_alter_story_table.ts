import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('story', (table) => {
        table.uuid('authorId').nullable();
        table.text('summary').nullable();
        table.integer('likes').defaultTo(0);
        table.specificType('tags', 'TEXT[]').nullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('story', (table) => {
        table.dropColumn('authorId');
        table.dropColumn('summary');
        table.dropColumn('likes');
        table.dropColumn('tags');
        table.dropColumn('createdAt');
        table.dropColumn('updatedAt');
    });
}
