import { PersonCreateDto } from "../../types/person-create-dto.type";
import { AddPersonForm } from "../add-person-form/add-person-form.component";
import { PersonDto } from "../../types/person-dto.type";
import { Modal } from "../modal/modal.component";

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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Create Person</h2>
      <AddPersonForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        persons={persons}
      />
    </Modal>
  );
};

export { AddPersonModal };
