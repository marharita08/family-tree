import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispatch } from "../../store/store";
import { actions } from "../../store/family-tree/family-tree.slice";
import { PersonDto } from "../../types/person-dto.type";
import styles from "./family-tree.module.css";
import { AddPersonModal } from "../add-person-modal/add-person-modal.component";
import { Button } from "../button/button.component";
import { PersonCreateDto } from "../../types/person-create-dto.type";
import { useModalOpen } from "../../hooks/useModalOpen";
import { PersonUpdateDto } from "../../types/person-update-dto.type";
import { UpdatePersonModal } from "../update-person-modal/update-person-modal.component";

const FamilyTree: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tree, loading, error, openNodes, persons, person } = useSelector(
    (state: RootState) => state.familyTree
  );

  const {
    isModalOpen: isAddPersonModalOpen,
    openModal: openAddPersonModal,
    closeModal: closeAddPersonModal
  } = useModalOpen();
  const {
    isModalOpen: isUpdatePersonModalOpen,
    openModal: openUpdatePersonModal,
    closeModal: closeUpdatePersonModal
  } = useModalOpen();

  useEffect(() => {
    dispatch(actions.fetchFamilyTreeStart());
    dispatch(actions.fetchPersonsStart());
  }, [dispatch]);

  const handleCreatePerson = (data: PersonCreateDto) => {
    dispatch(actions.addPersonStart(data));
    closeAddPersonModal();
  };

  const handleUpdatePerson = (data: PersonUpdateDto) => {
    const id = (person as PersonDto).id;
    dispatch(actions.updatePersonStart({ id, person: data }));
    closeUpdatePersonModal();
  };

  const handleEdit = (person: PersonDto) => () => {
    dispatch(actions.setPerson(person));
    openUpdatePersonModal();
  };

  const renderTree = (persons: PersonDto[], rootId: number | null) => (
    <ul className={styles.tree}>
      {persons.map(person => {
        const _rootId = rootId ?? person.id;
        const nodeId = `${_rootId}-${person.id}`;
        const hasChildren = person.children && person.children.length > 0;
        const isOpen = openNodes.includes(nodeId) || !hasChildren;
        const handleToggleNode = () => dispatch(actions.toggleNode(nodeId));

        return (
          <li key={nodeId} className={styles.person}>
            <div className={styles.personInfo}>
              <div>
                <button
                  className={styles.toggleButton}
                  onClick={handleToggleNode}
                  disabled={!hasChildren}
                >
                  {isOpen ? "−" : "+"}
                </button>
                {person.name} {person.age !== null && `(Age: ${person.age})`}
              </div>
              <div>
                <Button onClick={handleEdit(person)} label="Edit" />
              </div>
            </div>
            {hasChildren &&
              isOpen &&
              renderTree(person.children as PersonDto[], _rootId)}
          </li>
        );
      })}
    </ul>
  );

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!tree || tree.length === 0) {
    return <div className={styles.empty}>No data available</div>;
  }

  return (
    <>
      <h1 className={styles.title}>Family tree</h1>
      <div className={styles.addPersonButton}>
        <Button onClick={openAddPersonModal} label="Add person" />
      </div>
      <AddPersonModal
        isOpen={isAddPersonModalOpen}
        onClose={closeAddPersonModal}
        persons={persons ?? []}
        onSubmit={handleCreatePerson}
      />
      <UpdatePersonModal
        isOpen={isUpdatePersonModalOpen}
        onClose={closeUpdatePersonModal}
        onSubmit={handleUpdatePerson}
        person={person as PersonDto}
      />
      {!tree || tree.length === 0 ? (
        <div className={styles.empty}>No data available</div>
      ) : (
        <div className={styles.container}>{renderTree(tree, null)}</div>
      )}
    </>
  );
};

export { FamilyTree };
