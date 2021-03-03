import React, { useRef, useEffect } from "react";
import Input from "../../commons/Input";
import { IonGrid, IonRow, IonCol, IonButton, IonIcon } from "@ionic/react";
import { saveOutline, refreshOutline } from "ionicons/icons";
import { IPerson } from "../../api/person";

interface Props {
  dbReady: boolean;
  editId: number | null;
  editValues: IPerson | null;
  onSubmit: (data: IPerson) => void;
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
  const birthDateInputRef = useRef<HTMLIonInputElement>(null);
  const birthPlaceInputRef = useRef<HTMLIonInputElement>(null);
  const emailInputRef = useRef<HTMLIonInputElement>(null);
  const genderInputRef = useRef<HTMLIonInputElement>(null);
  const bankAccountInputRef = useRef<HTMLIonInputElement>(null);
  const bankCodeInputRef = useRef<HTMLIonInputElement>(null);
  const commentInputRef = useRef<HTMLIonInputElement>(null);

  useEffect(() => {
    if (editValues) {
      firstNameInputRef.current!.value = editValues.firstname;
      lastNameInputRef.current!.value = editValues.lastname;
      birthDateInputRef.current!.value = editValues.birthDate;
      birthPlaceInputRef.current!.value = editValues.birthPlace;
      emailInputRef.current!.value = editValues.email;
      genderInputRef.current!.value = editValues.gender;
      bankAccountInputRef.current!.value = editValues.bankAccount;
      bankCodeInputRef.current!.value = editValues.bankCode;
      commentInputRef.current!.value = editValues.comment;
    }
  }, [editValues]);

  const handleSubmitButtonClick = () => {
    let people = {
      firstname: firstNameInputRef.current!.value!.toString(),
      lastname: lastNameInputRef.current!.value!.toString(),
      // TODO check toLocaleString()
      //   birthDate: birthDateInputRef.current!.value!.toISOString(),
      birthDate: new Date().toISOString(),
      birthPlace: birthPlaceInputRef.current!.value!.toString(),
      email: emailInputRef.current!.value!.toString(),
      gender: genderInputRef.current!.value!.toString(),
      bankAccount: bankAccountInputRef.current!.value!.toString(),
      bankCode: bankCodeInputRef.current!.value!.toString(),
      comment: commentInputRef.current!.value!.toString(),
    };

    onSubmit && onSubmit(people);
    cleanInputs();
  };

  const handleResetButtonClick = () => {
    onReset && onReset();
    cleanInputs();
  };

  const cleanInputs = () => {
    firstNameInputRef.current!.value = "";
    lastNameInputRef.current!.value = "";
    birthDateInputRef.current!.value = "";
    birthPlaceInputRef.current!.value = "";
    emailInputRef.current!.value = "";
    genderInputRef.current!.value = "";
    bankAccountInputRef.current!.value = "";
    bankCodeInputRef.current!.value = "";
    commentInputRef.current!.value = "";
  };

  return (
    <IonGrid>
      <Input name={"firstname"} ref={firstNameInputRef} />
      <Input name={"lastname"} ref={lastNameInputRef} />
      <Input name={"birthDate"} ref={birthDateInputRef} />
      <Input name={"birthPlace"} ref={birthPlaceInputRef} />
      <Input name={"email"} ref={emailInputRef} />
      <Input name={"gender"} ref={genderInputRef} />
      <Input name={"bankAccount"} ref={bankAccountInputRef} />
      <Input name={"bankCode"} ref={bankCodeInputRef} />
      <Input name={"comment"} ref={commentInputRef} />
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
