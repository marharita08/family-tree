import { useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../input/input.component";
import { Button } from "../button/button.component";
import { PersonCreateDto } from "../../types/person-create-dto.type";
import styles from "./update-person-form.module.css";
import { PersonUpdateDto } from "../../types/person-update-dto.type";
import { UpdatePersonSchema } from "../../validation-schemas/update-person.validation-schema";

type Props = {
  defaultValues: PersonUpdateDto;
  onSubmit: (data: PersonUpdateDto) => void;
};

const UpdatePersonForm: React.FC<Props> = ({ defaultValues, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PersonCreateDto>({
    resolver: zodResolver(UpdatePersonSchema),
    defaultValues: defaultValues,
    mode: "onBlur"
  });

  const handleFormSubmit: SubmitHandler<PersonUpdateDto> = useCallback(
    data => {
      onSubmit(data);
      reset();
    },
    [onSubmit, reset]
  );

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

      <div className={styles.button}>
        <Button label="Save" type="submit" />
      </div>
    </form>
  );
};

export { UpdatePersonForm };
