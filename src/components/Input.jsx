import React from 'react'
import {
    IonItem,
    IonLabel,
    IonInput,
} from "@ionic/react";

const Input = React.forwardRef(({name}, ref) => {
    return (
        <IonItem>
            <IonLabel position="floating">{name}</IonLabel>
            <IonInput ref={ref}></IonInput>
        </IonItem>
    )
})

export default Input
