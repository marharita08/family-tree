import { PersonCreateDto } from "../../types/person-create-dto.type";
import { AddPersonForm } from "../add-person-form/add-person-form.component";
import styles from "./add-person-modal.module.css";
import { PersonDto } from "../../types/person-dto.type";

interface PersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  persons: PersonDto[];
  onSubmit: (data: PersonCreateDto) => void;
}

const AddPersonModal: React.FC<PersonModalProps> = ({
  isOpen,
  onClose,
  persons,
  onSubmit
}) => {
  const defaultValues: PersonCreateDto = {
    name: "",
    age: "",
    parent1Id: "",
    parent2Id: ""
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2>Create Person</h2>
        <AddPersonForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          persons={persons}
        />
      </div>
    </div>
  );
};

export { AddPersonModal };
