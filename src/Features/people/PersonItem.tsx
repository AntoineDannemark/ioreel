import React from "react";
import { IonItem, IonLabel, IonButton, IonIcon } from "@ionic/react";
import { trashOutline, create } from "ionicons/icons";
import type { Person } from "./types";

interface Props {
  person: Person;
  onEditBtnClick: (person: Person) => void;
  onDeleteBtnClick: (id: number) => void;
}

const PersonItem: React.FC<Props> = ({
  person,
  onEditBtnClick,
  onDeleteBtnClick,
}) => {
  return (
    <IonItem key={person.id}>
      <IonLabel>{`${person.firstname} ${person.lastname} - ${person.id}`}</IonLabel>
      <IonButton onClick={() => onEditBtnClick && onEditBtnClick(person)}>
        <IonIcon icon={create} />
      </IonButton>
      <IonButton
        onClick={() => onDeleteBtnClick && onDeleteBtnClick(person.id!)}
      >
        <IonIcon icon={trashOutline} />
      </IonButton>
    </IonItem>
  );
};

export default PersonItem;
