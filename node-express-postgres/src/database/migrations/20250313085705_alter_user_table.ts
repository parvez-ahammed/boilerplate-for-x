import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('users', (table) => {
        table.text('bio').nullable();
        table.string('location').nullable();
        table.integer('followersCount').defaultTo(0).nullable();
        table.json('socialMediaLinks').nullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
        table.unique(['username']);
    });

    await knex.schema.raw(`
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW."updatedAt" = now();
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    `);

    await knex.schema.raw(`
        CREATE TRIGGER update_updated_at
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `);
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('users', (table) => {
        table.dropColumn('bio');
        table.dropColumn('location');
        table.dropColumn('followersCount');
        table.dropColumn('socialMediaLinks');
        table.dropColumn('createdAt');
        table.dropColumn('updatedAt');
        table.dropUnique(['username']);
    });

    await knex.schema.raw(`
        DROP TRIGGER IF EXISTS update_updated_at ON users;
    `);

    await knex.schema.raw(`
        DROP FUNCTION IF EXISTS update_updated_at_column;
    `);
}
