import { useEffect, useState } from "react";

import { PersonDto } from "../../types/person-dto.type";
import { envConfig } from "../../configs/env.config";
import styles from "./family-tree.module.css";

const FamilyTree: React.FC = () => {
  const [tree, setTree] = useState<PersonDto[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  const renderTree = (persons: PersonDto[]) => (
    <ul className={styles.tree}>
      {persons.map(person => (
        <li key={person.id} className={styles.person}>
          <div className={styles.personInfo}>
            {person.name} {person.age !== null && `(Age: ${person.age})`}
          </div>
          {person.children &&
            person.children.length > 0 &&
            renderTree(person.children)}
        </li>
      ))}
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

  return <div className={styles.container}>{renderTree(tree)}</div>;
};

export { FamilyTree };
