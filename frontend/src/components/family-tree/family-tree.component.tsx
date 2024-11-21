import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispatch } from "../../store/store";
import { actions } from "../../store/family-tree/family-tree.slice";
import { PersonDto } from "../../types/person-dto.type";
import styles from "./family-tree.module.css";

const FamilyTree: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tree, loading, error, openNodes } = useSelector(
    (state: RootState) => state.familyTree
  );

  useEffect(() => {
    dispatch(actions.fetchFamilyTreeStart());
  }, [dispatch]);

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
              <button
                className={styles.toggleButton}
                onClick={handleToggleNode}
                disabled={!hasChildren}
              >
                {isOpen ? "−" : "+"}
              </button>
              {person.name} {person.age !== null && `(Age: ${person.age})`}
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

  return <div className={styles.container}>{renderTree(tree, null)}</div>;
};

export { FamilyTree };
