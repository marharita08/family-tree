import styles from "./update-person-modal.module.css";
import { PersonDto } from "../../types/person-dto.type";
import { UpdatePersonForm } from "../update-person-form/update-person-form.component";
import { PersonUpdateDto } from "../../types/person-update-dto.type";

interface PersonModalProps {
  isOpen: boolean;
  person: PersonDto;
  onClose: () => void;
  onSubmit: (data: PersonUpdateDto) => void;
}

const UpdatePersonModal: React.FC<PersonModalProps> = ({
  isOpen,
  person,
  onClose,
  onSubmit
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2>Update Person</h2>
        <UpdatePersonForm defaultValues={person} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export { UpdatePersonModal };
