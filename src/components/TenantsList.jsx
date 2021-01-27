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
const TenantsList = ({tenants, onEdit, onDelete, db}) => {
    const handleEditButtonClick = tenant => {
        onEdit && onEdit(tenant)
    }

    const handleDeleteButtonClick = id => {
        onDelete && onDelete(id)
    }

    return (
        <IonList>
            {tenants.length > 0 && tenants.map((tenant) => (
                <IonItem key={tenant.id}>
                    <IonLabel>{`${tenant.firstname} ${tenant.lastname} - ${tenant.id}`}</IonLabel>
                    <IonButton
                        onClick={() => handleEditButtonClick(tenant)}
                        disabled={!db}
                    >
                        <IonIcon icon={create} />
                    </IonButton>
                    <IonButton
                        onClick={() => handleDeleteButtonClick(tenant.id)}
                        disabled={!db}
                    >
                        <IonIcon icon={trashOutline} />
                    </IonButton>
                </IonItem>
            ))}
        </IonList>
    )
}

export default TenantsList
