type PersonDto = {
  id: number;
  name: string;
  age: number;
  children: PersonDto[] | null;
};
