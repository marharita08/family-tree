import { useEffect, useState } from "react";

import { PersonDto } from "../../types/person-dto.type";
import { envConfig } from "../../configs/env.config";
import styles from "./family-tree.module.css";

const FamilyTree: React.FC = () => {
  const [tree, setTree] = useState<PersonDto[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openNodes, setOpenNodes] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const response = await fetch(`${envConfig.apiUrl}persons/family-tree`);
        if (!response.ok) {
          throw new Error("Failed to fetch family tree");
        }
        const data: PersonDto[] = await response.json();
        setTree(data);
      } catch (err: unknown) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTree();
  }, []);

  const toggleNode = (id: string) => {
    setOpenNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const renderTree = (persons: PersonDto[], rootId: number | null) => (
    <ul className={styles.tree}>
      {persons.map(person => {
        const _rootId = rootId ?? person.id;
        const nodeId = `${_rootId}-${person.id}`;
        const hasChildren = person.children && person.children.length > 0;
        const isOpen = openNodes.has(nodeId) || !hasChildren;
        const handleToggleNode = () => toggleNode(nodeId);

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
