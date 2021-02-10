import React from "react";
import { IonList } from "@ionic/react";
import PersonItem from "./PersonItem";
import type { Person } from "./types";

interface Props {
  people: Person[];
  onEdit: (person: Person) => void;
  onDelete: (id: number) => void;
}

const PeopleList: React.FC<Props> = ({ people, onEdit, onDelete }) => {
  const handleEditButtonClick = (person: Person) => {
    onEdit && onEdit(person);
  };

  const handleDeleteButtonClick = (id: number) => {
    onDelete && onDelete(id);
  };

  return (
    <IonList>
      {people.length > 0 &&
        people.map((person) => (
          <PersonItem
            person={person}
            onEditBtnClick={handleEditButtonClick}
            onDeleteBtnClick={handleDeleteButtonClick}
          />
        ))}
    </IonList>
  );
};

export default PeopleList;
