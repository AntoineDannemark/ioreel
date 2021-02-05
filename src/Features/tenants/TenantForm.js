import React from 'react'
import Input from '../../components/Input';
import {
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
} from "@ionic/react";
import {
    saveOutline,
    refreshOutline,
} from "ionicons/icons";

const TenantForm = React.forwardRef(({db, editId, onSubmit, onReset}, ref) => {
    const handleSubmitButtonClick = () => {
        onSubmit && onSubmit();
    }

    const handleResetButtonClick = () => {
        onReset && onReset();
    }

    return (
        <IonGrid>
            <Input name={"firstname"} ref={ref.firstNameInputRef}/>
            <Input name={"lastname"} ref={ref.lastNameInputRef} />
            <IonRow>
                <IonCol className="ion-text-left">
                    <IonButton onClick={handleSubmitButtonClick} disabled={!db}>
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
})

export default TenantForm
