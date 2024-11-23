import { Model } from "objection";

import { AbstractModel } from "../../db/abstract.model";
import { PersonModel } from "./person.model";
import { DBTables } from "../../db/db-tables.enum";

class RelationModel extends AbstractModel {
  static tableName = DBTables.RELATIONS;

  parentId!: number;
  childId!: number;

  static relationMappings = {
    parent: {
      relation: Model.BelongsToOneRelation,
      modelClass: PersonModel,
      join: {
        from: `${DBTables.RELATIONS}.parent_id`,
        to: `${DBTables.PERSONS}.id`
      }
    },
    child: {
      relation: Model.BelongsToOneRelation,
      modelClass: PersonModel,
      join: {
        from: `${DBTables.RELATIONS}.child_id`,
        to: `${DBTables.PERSONS}.id`
      }
    }
  };
}

export { RelationModel };
