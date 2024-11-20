import type { Knex } from "knex";

export const TABLE_NAME = "persons";

const ColumnName = {
  ID: "id",
  NAME: "name",
  AGE: "age",
  CREATED_AT: "created_at",
  UPDATED_AT: "updated_at"
} as const;

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments(ColumnName.ID).primary();
    table.string(ColumnName.NAME).notNullable();
    table.integer(ColumnName.AGE);
    table.timestamp(ColumnName.CREATED_AT).defaultTo(knex.fn.now());
    table.timestamp(ColumnName.UPDATED_AT).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}
