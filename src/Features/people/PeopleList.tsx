import React from "react";
import { IonButton, IonIcon, IonList, IonRow } from "@ionic/react";
import PersonItem from "./PersonItem";
import type { IPerson } from "../../api/person";
import { add } from "ionicons/icons";

interface Props {
  people: IPerson[];
  onEdit: (person: IPerson) => void;
  onDelete: (id: number) => void;
  onCreate: () => void;
}

const PeopleList: React.FC<Props> = ({
  people,
  onEdit,
  onDelete,
  onCreate,
}) => {
  const handleEditButtonClick = (person: IPerson) => {
    onEdit && onEdit(person);
  };

  const handleDeleteButtonClick = (id: number) => {
    onDelete && onDelete(id);
  };

  const handleCreateButtonClick = () => {
    onCreate && onCreate();
  };

  return (
    <>
      <IonList>
        {people.length > 0 &&
          people.map((person) => (
            <PersonItem
              person={person}
              key={person.id}
              onEditBtnClick={handleEditButtonClick}
              onDeleteBtnClick={handleDeleteButtonClick}
            />
          ))}
      </IonList>
      <IonRow className="ion-justify-content-center">
        <IonButton
          onClick={handleCreateButtonClick}
          className="ion-text-center"
        >
          <IonIcon icon={add} />
        </IonButton>
      </IonRow>
    </>
  );
};

export default PeopleList;
