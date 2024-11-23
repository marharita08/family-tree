import styles from "./button.module.css";

type Properties = {
  label: string;
  type?: "submit" | "button";
  onClick?: () => void;
  isDisabled?: boolean;
};

const Button: React.FC<Properties> = ({
  label,
  type = "button",
  onClick,
  isDisabled = false
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={styles.button}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
};

export { Button };
