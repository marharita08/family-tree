import { Model, RelationMappings, QueryBuilder } from "objection";

import { AbstractModel } from "../../db/abstract.model";
import { DBTables } from "../../db/db-tables.enum";

class Person extends AbstractModel {
  static tableName = DBTables.PERSONS;

  name!: string;
  age?: number;
  children?: Person[];

  static relationMappings: RelationMappings = {
    children: {
      relation: Model.HasManyRelation,
      modelClass: Person,
      join: {
        from: `${DBTables.PERSONS}.id`,
        to: `${DBTables.RELATIONS}.parent_id`
      },
      modify: (qb: QueryBuilder<Person>) => {
        qb.join(
          DBTables.RELATIONS,
          `${DBTables.PERSONS}.id`,
          "=",
          `${DBTables.RELATIONS}.child_id`
        );
      }
    }
  };
}

export { Person };
