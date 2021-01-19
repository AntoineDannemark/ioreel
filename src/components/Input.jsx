import React from 'react'
import {
    IonItem,
    IonLabel,
    IonInput,
    IonRow,
    IonCol,
} from "@ionic/react";

const Input = React.forwardRef(({name}, ref) => {
    return (
        <IonRow>
            <IonCol>
                <IonItem>
                    <IonLabel position="floating">{name}</IonLabel>
                    <IonInput ref={ref}></IonInput>
                </IonItem>
            </IonCol>
        </IonRow>
    )
})

export default Input
