import React from 'react'
import {
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonList,
} from "@ionic/react";
import {
    trashOutline,
    create,
} from "ionicons/icons";
const PeopleList = ({people, onEdit, onDelete, db}) => {
    const handleEditButtonClick = people => {
        onEdit && onEdit(people)
    }

    const handleDeleteButtonClick = id => {
        onDelete && onDelete(id)
    }

    return (
        <IonList>
            {people.length > 0 && people.map((people) => (
                <IonItem key={people.id}>
                    <IonLabel>{`${people.firstname} ${people.lastname} - ${people.id}`}</IonLabel>
                    <IonButton
                        onClick={() => handleEditButtonClick(people)}
                        disabled={!db}
                    >
                        <IonIcon icon={create} />
                    </IonButton>
                    <IonButton
                        onClick={() => handleDeleteButtonClick(people.id)}
                        disabled={!db}
                    >
                        <IonIcon icon={trashOutline} />
                    </IonButton>
                </IonItem>
            ))}
        </IonList>
    )
}

export default PeopleList
