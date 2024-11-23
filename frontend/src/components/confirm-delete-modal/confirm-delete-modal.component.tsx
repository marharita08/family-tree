import styles from "./confirm-delete-modal.module.css";
import { PersonDto } from "../../types/person-dto.type";
import { Button } from "../button/button.component";

interface PersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  person: PersonDto;
}

const DeletePersonModal: React.FC<PersonModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  person
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
        <h2>Delete Person</h2>
        <div>
          Are you sure that you want to delete {person.name} from family tree?
        </div>
        <div className={styles.actionButtons}>
          <Button label="Yes" onClick={onConfirm} />
          <Button label="No" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export { DeletePersonModal };
