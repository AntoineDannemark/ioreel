import React from 'react'
import {
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
} from "@ionic/react";
import Input from './Input';
import DatePicker from './DatePicker';
import {
    saveOutline,
    refreshOutline,
} from "ionicons/icons";

const PeopleForm = React.forwardRef(({db, editId, onSubmit, onReset}, ref) => {
    const handleSubmitButtonClick = () => {
        onSubmit && onSubmit();
    }

    const handleResetButtonClick = () => {
        onReset && onReset();
    }

    return (
        <IonGrid 
            fixed 
            // className="ion-margin-top" 
            style={{"backgroundColor": "lightBlue"}}
        >
            <IonRow className="ion-justify-content-evenly">
                <IonCol 
                    sizeXs="12" 
                    sizeSm="10" 
                    sizeMd="6"
                    className="ion-padding"
                >
                    <Input name={"firstname"} ref={ref.firstNameInputRef}/>
                </IonCol>
                <IonCol 
                    sizeXs="12"
                    sizeSm="10" 
                    sizeMd="6" 
                    className="ion-padding"
                >
                    <Input name={"lastname"} ref={ref.lastNameInputRef} />
                </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-evenly">
                <IonCol sizeXs="12" sizeSm="10" sizeMd="6" className="ion-padding">
                    <DatePicker ref={ref.birthDateInputRef}/>
                </IonCol>
                <IonCol sizeXs="12" sizeSm="10" sizeMd="6" className="ion-padding">
                    <Input name={"birth place"} ref={ref.birthPlaceInputRef}/>
                </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-evenly">
                <IonCol sizeXs="6" sizeSm="5" sizeMd="3" className="ion-padding ion-text-start">
                    <IonButton onClick={handleResetButtonClick}>
                        <IonIcon slot="start" icon={refreshOutline} />
                        {editId ? "cancel" : "reset"}
                    </IonButton>
                </IonCol>
                <IonCol sizeXs="6" sizeSm="5" sizeMd="3" className="ion-padding ion-text-end">
                    <IonButton 
                        onClick={handleSubmitButtonClick} 
                        // disabled={!db}
                    >
                        <IonIcon slot="start" icon={saveOutline} />
                        submit
                    </IonButton>
                </IonCol>
            </IonRow>
            <IonRow>
                
            </IonRow>
        </IonGrid>
    );
})

export default PeopleForm
