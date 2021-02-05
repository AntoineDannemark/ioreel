import React from 'react'
import {
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
} from "@ionic/react";
import {
    trashOutline,
    create,
} from "ionicons/icons";

const Tenant = ({ tenant, onEditBtnClick, onDeleteBtnClick }) => {
    return (
        <IonItem key={tenant.id}>
            <IonLabel>{`${tenant.firstname} ${tenant.lastname} - ${tenant.id}`}</IonLabel>
            <IonButton
                onClick={() => onEditBtnClick && onEditBtnClick(tenant)}
            >
                <IonIcon icon={create} />
            </IonButton>
            <IonButton
                onClick={() => onDeleteBtnClick && onDeleteBtnClick(tenant.id)}
            >
                <IonIcon icon={trashOutline} />
            </IonButton>
        </IonItem>
    )
}

export default Tenant
