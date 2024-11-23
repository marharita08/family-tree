import {
  FieldErrors,
  FieldValues,
  Control,
  FieldPath,
  Controller
} from "react-hook-form";

import { InputOption } from "../../types/input-option.type";
import styles from "./input.module.css";

type Properties<T extends FieldValues> = {
  label: string;
  control: Control<T>;
  errors?: FieldErrors<T>;
  placeholder?: string;
  type?: "text" | "number";
  name: FieldPath<T>;
  options?: InputOption[];
  isSelect?: boolean;
};

const Input = <T extends FieldValues>({
  label,
  errors,
  placeholder,
  type = "text",
  name,
  control,
  options,
  isSelect = false
}: Properties<T>): JSX.Element => {
  const error = errors?.[name]?.message;
  const hasError = Boolean(error);
  const isNumber = type === "number";

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    return isNumber && e.target.value ? Number(e.target.value) : e.target.value;
  };

  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      {isSelect ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <select
              id={name}
              {...field}
              className={styles.input}
              onChange={e => {
                field.onChange(handleChange(e));
              }}
            >
              <option value={""}>None</option>
              {options &&
                options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
          )}
        />
      ) : (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              id={name}
              type={type}
              placeholder={placeholder}
              {...field}
              className={styles.input}
              onChange={e => {
                field.onChange(handleChange(e));
              }}
            />
          )}
        />
      )}
      {hasError && <span className={styles.error}>{error as string}</span>}
    </div>
  );
};

export { Input };
