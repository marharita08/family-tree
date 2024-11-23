import type { Knex } from "knex";

export const TableName = {
  PERSON: "persons",
  RELATIONS: "relations"
} as const;

export const ColumnName = {
  ID: "id",
  PARENT_ID: "parent_id",
  CHILD_ID: "child_id",
  CREATED_AT: "created_at",
  UPDATED_AT: "updated_at"
} as const;

const DELETE_STRATEGY = "CASCADE";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TableName.RELATIONS, table => {
    table.increments(ColumnName.ID).primary();
    table
      .integer(ColumnName.PARENT_ID)
      .unsigned()
      .references(ColumnName.ID)
      .inTable(TableName.PERSON)
      .onDelete(DELETE_STRATEGY);
    table
      .integer(ColumnName.CHILD_ID)
      .unsigned()
      .references(ColumnName.ID)
      .inTable(TableName.PERSON)
      .onDelete(DELETE_STRATEGY);
    table.timestamp(ColumnName.CREATED_AT).defaultTo(knex.fn.now());
    table.timestamp(ColumnName.UPDATED_AT).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TableName.RELATIONS);
}
