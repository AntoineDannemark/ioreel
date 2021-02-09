import React, { useRef, useEffect } from "react";
import Input from "../../commons/Input";
import { IonGrid, IonRow, IonCol, IonButton, IonIcon } from "@ionic/react";
import { saveOutline, refreshOutline } from "ionicons/icons";

interface Props {
  dbReady: boolean;
  editId: number;
  editValues: {
    firstname: string;
    lastname: string;
  };
  onSubmit: (data: { firstname: string; lastname: string }) => void;
  onReset: () => void;
}

const TenantForm: React.FC<Props> = ({
  dbReady,
  editId,
  editValues,
  onSubmit,
  onReset,
}) => {
  const firstNameInputRef = useRef<HTMLIonInputElement>(null);
  const lastNameInputRef = useRef<HTMLIonInputElement>(null);

  useEffect(() => {
    if (editValues) {
      firstNameInputRef.current.value = editValues.firstname;
      lastNameInputRef.current.value = editValues.lastname;
    }
  }, [editValues]);

  const handleSubmitButtonClick = () => {
    let tenant = {
      firstname: firstNameInputRef.current.value.toString(),
      lastname: lastNameInputRef.current.value.toString(),
    };

    onSubmit && onSubmit(tenant);
    cleanInputs();
  };

  const handleResetButtonClick = () => {
    onReset && onReset();
    cleanInputs();
  };

  const cleanInputs = () => {
    firstNameInputRef.current.value = "";
    lastNameInputRef.current.value = "";
  };

  return (
    <IonGrid>
      <Input name={"firstname"} ref={firstNameInputRef} />
      <Input name={"lastname"} ref={lastNameInputRef} />
      <IonRow>
        <IonCol className="ion-text-left">
          <IonButton onClick={handleSubmitButtonClick} disabled={!dbReady}>
            <IonIcon slot="start" icon={saveOutline} />
            submit
          </IonButton>
        </IonCol>
        <IonCol className="ion-text-right">
          <IonButton onClick={handleResetButtonClick}>
            <IonIcon slot="start" icon={refreshOutline} />
            {editId ? "cancel" : "reset"}
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default TenantForm;
