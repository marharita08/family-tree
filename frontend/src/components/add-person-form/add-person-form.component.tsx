import { useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../input/input.component";
import { Button } from "../button/button.component";
import { PersonCreateDto } from "../../types/person-create-dto.type";
import styles from "./add-person-form.module.css";
import { PersonDto } from "../../types/person-dto.type";
import { InputOption } from "../../types/input-option.type";
import { AddPersonSchema } from "../../validation-schemas/add-person.validation-schema";

type Props = {
  defaultValues: PersonCreateDto;
  onSubmit: (data: PersonCreateDto) => void;
  persons: PersonDto[];
};

const AddPersonForm: React.FC<Props> = ({
  defaultValues,
  onSubmit,
  persons
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PersonCreateDto>({
    resolver: zodResolver(AddPersonSchema),
    defaultValues: defaultValues,
    mode: "onBlur"
  });

  const handleFormSubmit: SubmitHandler<PersonCreateDto> = useCallback(
    data => {
      onSubmit(data);
      reset();
    },
    [onSubmit, reset]
  );

  const parentOptions: InputOption[] = persons.map(person => ({
    label: person.name,
    value: person.id
  }));

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <Input
        label="Name"
        placeholder="Enter name"
        errors={errors}
        control={control}
        name="name"
      />

      <Input
        label="Age"
        placeholder="Enter age"
        errors={errors}
        control={control}
        type="number"
        name="age"
      />

      <Input
        label="Parent"
        errors={errors}
        control={control}
        name="parent1Id"
        type="number"
        options={parentOptions}
        isSelect
      />

      <Input
        label="Parent"
        errors={errors}
        control={control}
        name="parent2Id"
        type="number"
        options={parentOptions}
        isSelect
      />

      <div className={styles.button}>
        <Button label="Save" type="submit" />
      </div>
    </form>
  );
};

export { AddPersonForm };
