type PersonDto = {
  id: number;
  name: string;
  age: number | null;
  children: PersonDto[] | null;
};

export { type PersonDto };
