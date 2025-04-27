exports.up = async (knex) => {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('username').unique().notNullable();
        table.string('email').unique().notNullable();
        table.string('password_hash').notNullable();
        table.string('full_name');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('letters', (table) => {
        table.increments('id').primary();
        table.string('reference_number').unique().notNullable();
        table.string('subject').notNullable();
        table.text('content');
        table.string('sender').notNullable();
        table.string('recipient').notNullable();
        table.date('date_received').notNullable();
        table.string('file_path');
        table.integer('created_by').references('id').inTable('users');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('letter_transactions', (table) => {
        table.increments('id').primary();
        table.integer('letter_id').references('id').inTable('letters').notNullable();
        table.string('action').notNullable(); // e.g., 'created', 'forwarded', 'closed'
        table.integer('from_user_id').references('id').inTable('users');
        table.integer('to_user_id').references('id').inTable('users');
        table.text('comments');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('letter_transactions');
    await knex.schema.dropTableIfExists('letters');
    await knex.schema.dropTableIfExists('users');
};