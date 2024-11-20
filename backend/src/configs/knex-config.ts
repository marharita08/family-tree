import { knexSnakeCaseMappers } from "objection";
import path from "path";

import { Environment } from "./environment";

export default {
  development: {
    client: "pg",
    connection: {
      host: Environment.DB.HOST,
      user: Environment.DB.USER,
      password: Environment.DB.PASSWORD,
      database: Environment.DB.DATABASE
    },
    migrations: {
      directory: "src/db/migrations",
      tableName: "migrations",
    },
    ...knexSnakeCaseMappers({ underscoreBetweenUppercaseLetters: true })
  }
};
