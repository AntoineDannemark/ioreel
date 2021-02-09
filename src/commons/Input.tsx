import React from "react";
import { IonItem, IonLabel, IonInput } from "@ionic/react";

interface Props {
  name: string;
  error?: string | null;
}

const Input = React.forwardRef<HTMLIonInputElement, Props>(({ name }, ref) => {
  return (
    <IonItem>
      <IonLabel position="floating">{name}</IonLabel>
      <IonInput ref={ref} clearInput></IonInput>
    </IonItem>
  );
});

export default Input;
