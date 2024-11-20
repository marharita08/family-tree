import express, { Request, Response } from "express";
import cors from "cors";

import { Environment } from "./configs/environment";
import "./db/db";

const app = express();
const port = Environment.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
