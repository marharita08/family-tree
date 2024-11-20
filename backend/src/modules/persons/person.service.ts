import { PersonDto } from "../../types/person-dto.type";
import { PersonCreateDto } from "../../types/person-create-dto.type";
import { PersonUpdateDto } from "../../types/person-update-dto.type";
import { PersonEntity } from "./person.entity";
import { PersonRepository } from "./person.repository";

class PersonService {
  private personRepository: PersonRepository;

  constructor(personRepository: PersonRepository) {
    this.personRepository = personRepository;
  }

  public async create(payload: PersonCreateDto): Promise<PersonDto> {
    const person = await this.personRepository.create(
      PersonEntity.initializeNew({
        name: payload.name,
        age: payload.age,
        parent1Id: payload.parent1Id,
        parent2Id: payload.parent2Id
      })
    );

    return person.toObject();
  }

  public async update(id: number, payload: PersonUpdateDto) {
    const person = await this.personRepository.update(
      id,
      PersonEntity.initializeNew({
        name: payload.name,
        age: payload.age,
        parent1Id: null,
        parent2Id: null
      })
    );

    return person.toObject();
  }

  public async delete(id: number): Promise<boolean> {
    return await this.personRepository.delete(id);
  }

  public async getFamilyTree(): Promise<PersonDto[]> {
    const tree = await this.personRepository.getFamilyTree();

    return tree.map(person => person.toObject());
  }

  public async findAll(): Promise<PersonDto[]> {
    const persons = await this.personRepository.findAll();

    return persons.map(person => person.toShortObject());
  }
}

export { PersonService };
