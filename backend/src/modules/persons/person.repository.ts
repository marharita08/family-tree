import { PersonEntity } from "./person.entity";
import { PersonModel } from "./person.model";
import { RelationModel } from "./relation.model";
import { DBTables } from "../../db/db-tables.enum";

class PersonRepository {
  private personModel: typeof PersonModel;

  private relationModel: typeof RelationModel;

  constructor(
    personModel: typeof PersonModel,
    relationModel: typeof RelationModel
  ) {
    this.personModel = personModel;
    this.relationModel = relationModel;
  }

  public async create(entity: PersonEntity): Promise<PersonEntity> {
    const { name, age, parent1Id, parent2Id } = entity.toNewObject();

    const person = await this.personModel.query().insert({ name, age });

    if (parent1Id) {
      await this.relationModel
        .query()
        .insert({ parentId: parent1Id, childId: person.id });
    }

    if (parent2Id) {
      await this.relationModel
        .query()
        .insert({ parentId: parent2Id, childId: person.id });
    }

    return PersonEntity.initialize({
      id: person.id,
      name: person.name,
      age: person.age,
      createdAt: person.createdAt,
      updatedAt: person.updatedAt,
      children: null
    });
  }

  public async update(
    id: number,
    payload: PersonEntity
  ): Promise<PersonEntity> {
    const { name, age } = payload.toNewObject();

    const person = await this.personModel
      .query()
      .updateAndFetchById(id, { name, age });

    return PersonEntity.initialize({
      id: person.id,
      name: person.name,
      age: person.age,
      createdAt: person.createdAt,
      updatedAt: person.updatedAt,
      children: null
    });
  }

  public async delete(id: number): Promise<boolean> {
    const rowsDeleted = await this.personModel.query().deleteById(id);

    return Boolean(rowsDeleted);
  }

  public async getFamilyTree(): Promise<PersonEntity[]> {
    const tree = await PersonModel.query()
      .whereNotExists(
        RelationModel.query()
          .select(1)
          .whereRaw(
            `"${DBTables.RELATIONS}"."child_id" = "${DBTables.PERSONS}"."id"`
          )
      )
      .withGraphFetched("children.^")
      .orderBy("name");

    function parseToEntity(person: PersonModel): PersonEntity {
      return PersonEntity.initialize({
        id: person.id,
        name: person.name,
        age: person.age,
        createdAt: person.createdAt,
        updatedAt: person.updatedAt,
        children: person.children
          ? person.children.map(child => parseToEntity(child))
          : null
      });
    }

    return tree.map(person => parseToEntity(person));
  }

  public async findAll(): Promise<PersonEntity[]> {
    const persons = await this.personModel.query().orderBy("name");

    return persons.map(person =>
      PersonEntity.initialize({
        id: person.id,
        name: person.name,
        age: person.age,
        createdAt: person.createdAt,
        updatedAt: person.updatedAt,
        children: null
      })
    );
  }
}

export { PersonRepository };
