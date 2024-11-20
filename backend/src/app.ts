import express from "express";
import cors from "cors";

import { errorHandler } from "./middlewares/error-handler.middleware";
import { Environment } from "./configs/environment";
import { router as personsRouter } from "./modules/persons/person.routes";
import "./db/db";

const app = express();
const port = Environment.PORT;

app.use(cors());
app.use(express.json());

app.use("/persons", personsRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
