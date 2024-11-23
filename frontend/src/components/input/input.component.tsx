import {
  useController,
  FieldErrors,
  FieldValues,
  Control,
  FieldPath
} from "react-hook-form";

import { InputOption } from "../../types/input-option.type";
import styles from "./input.module.css";

type Properties<T extends FieldValues> = {
  label: string;
  control: Control<T>;
  errors?: FieldErrors<T>;
  placeholder?: string;
  type?: string;
  name: FieldPath<T>;
  options?: InputOption[];
};

const Input = <T extends FieldValues>({
  label,
  errors,
  placeholder,
  type = "text",
  name,
  control,
  options
}: Properties<T>): JSX.Element => {
  const { field } = useController({ control, name });

  const error = errors?.[name]?.message;
  const hasError = Boolean(error);
  const isSelect = type === "select";

  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      {isSelect ? (
        <select id={name} {...field} className={styles.input}>
          <option value={""}>None</option>
          {options &&
            options.map(option => (
              <option key={option.value} value={option.value}>
                {" "}
                {option.label}
              </option>
            ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          {...field}
          className={styles.input}
        />
      )}
      {hasError && <span className={styles.error}>{error as string}</span>}
    </div>
  );
};

export { Input };
