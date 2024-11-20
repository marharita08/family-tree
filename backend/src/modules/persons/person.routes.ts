import { Router, Request, Response } from "express";

import { PersonModel } from "./person.model";
import { RelationModel } from "./relation.model";
import { PersonRepository } from "./person.repository";
import { PersonService } from "./person.service";
import { asyncHandler } from "../../middlewares/async-handler.middleware";
import { PersonCreateDto } from "../../types/person-create-dto.type";
import { HTTPStatus } from "../../enums/http-status.enum";
import { PersonUpdateDto } from "../../types/person-update-dto.type";

const personRepository = new PersonRepository(PersonModel, RelationModel);
const personService = new PersonService(personRepository);

const router = Router();

router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const payload: PersonCreateDto = req.body;
    const person = await personService.create(payload);
    res.status(HTTPStatus.CREATED).json(person);
  })
);

router.put(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const payload: PersonUpdateDto = req.body;
    const person = await personService.update(id, payload);
    res.json(person);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const success = await personService.delete(id);
    res.status(success ? HTTPStatus.NO_CONTENT : HTTPStatus.NOT_FOUND).send();
  })
);

router.get(
  "/family-tree",
  asyncHandler(async (req: Request, res: Response) => {
    const tree = await personService.getFamilyTree();
    res.json(tree);
  })
);

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const persons = await personService.findAll();
    res.json(persons);
  })
);

export { router };
