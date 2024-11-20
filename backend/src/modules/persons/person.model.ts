import { Model, RelationMappings, QueryBuilder } from "objection";

import { AbstractModel } from "../../db/abstract.model";
import { DBTables } from "../../db/db-tables.enum";

class PersonModel extends AbstractModel {
  static tableName = DBTables.PERSONS;

  name!: string;
  age!: number | null;
  children?: PersonModel[];

  static relationMappings: RelationMappings = {
    children: {
      relation: Model.ManyToManyRelation,
      modelClass: PersonModel,
      join: {
        from: `${DBTables.PERSONS}.id`,
        through: {
          from: `${DBTables.RELATIONS}.parent_id`,
          to: `${DBTables.RELATIONS}.child_id`
        },
        to: `${DBTables.PERSONS}.id`
      }
    }
  };
}

export { PersonModel };
