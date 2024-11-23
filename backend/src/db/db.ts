import knex from "knex";
import { Model } from "objection";

import knexConfig from "../configs/knex-config";

const db = knex(knexConfig.development);

Model.knex(db);

export default db;
