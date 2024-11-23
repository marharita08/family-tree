import { PersonDto } from "../../types/person-dto.type";
import { UpdatePersonForm } from "../update-person-form/update-person-form.component";
import { PersonUpdateDto } from "../../types/person-update-dto.type";
import { Modal } from "../modal/modal.component";

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
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Update Person</h2>
      <UpdatePersonForm defaultValues={person} onSubmit={onSubmit} />
    </Modal>
  );
};

export { UpdatePersonModal };
