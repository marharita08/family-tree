class PersonEntity {
  private id: null | number;

  private createdAt: string;

  private updatedAt: string;

  private name: string;

  private age: number | null;

  private children: PersonEntity[] | null;

  private parent1Id: number | null;

  private parent2Id: number | null;

  private constructor({
    id,
    createdAt,
    updatedAt,
    name,
    age,
    children,
    parent1Id,
    parent2Id
  }: {
    id: null | number;
    createdAt: string;
    updatedAt: string;
    name: string;
    age: number | null;
    children: PersonEntity[] | null;
    parent1Id: number | null;
    parent2Id: number | null;
  }) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.name = name;
    this.age = age;
    this.children = children;
    this.parent1Id = parent1Id;
    this.parent2Id = parent2Id;
  }

  public static initialize({
    id,
    createdAt,
    updatedAt,
    name,
    age,
    children
  }: {
    id: null | number;
    createdAt: string;
    updatedAt: string;
    name: string;
    age: number | null;
    children: PersonEntity[] | null;
  }) {
    return new PersonEntity({
      id,
      createdAt,
      updatedAt,
      name,
      age,
      children,
      parent1Id: null,
      parent2Id: null
    });
  }

  public static initializeNew({
    name,
    age,
    parent1Id,
    parent2Id
  }: {
    name: string;
    age: number | null;
    parent1Id: number | null;
    parent2Id: number | null;
  }) {
    return new PersonEntity({
      id: null,
      createdAt: "",
      updatedAt: "",
      name,
      age,
      children: null,
      parent1Id,
      parent2Id
    });
  }

  public toNewObject(): {
    createdAt: string;
    updatedAt: string;
    name: string;
    age: number | null;
    parent1Id: number | null;
    parent2Id: number | null;
  } {
    return {
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      name: this.name,
      age: this.age,
      parent1Id: this.parent1Id,
      parent2Id: this.parent2Id
    };
  }

  public toObject(): {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    age: number | null;
    children: PersonEntity[] | null;
  } {
    return {
      id: this.id as number,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      name: this.name,
      age: this.age,
      children: this.children
    };
  }
}

export { PersonEntity };
