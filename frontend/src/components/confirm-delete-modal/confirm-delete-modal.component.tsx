import styles from "./confirm-delete-modal.module.css";
import { PersonDto } from "../../types/person-dto.type";
import { Button } from "../button/button.component";
import { Modal } from "../modal/modal.component";

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
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Delete Person</h2>
      <div className={styles.body}>
        <div>
          Are you sure that you want to delete {person.name} from family tree?
        </div>
        <div className={styles.actionButtons}>
          <Button label="Yes" onClick={onConfirm} />
          <Button label="No" onClick={onClose} />
        </div>
      </div>
    </Modal>
  );
};

export { DeletePersonModal };
