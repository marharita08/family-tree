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
      relation: Model.HasManyRelation,
      modelClass: PersonModel,
      join: {
        from: `${DBTables.PERSONS}.id`,
        to: `${DBTables.RELATIONS}.parent_id`
      },
      modify: (qb: QueryBuilder<PersonModel>) => {
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

export { PersonModel };
