import React from "react";
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
} from "@ionic/react";
import { login } from "./userSlice";
import { useAppDispatch } from "../../app/store";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch, errors } = useForm<FormData>();

  const onSubmit = handleSubmit(({ email, password }) => {
    dispatch(login({ email, password }));
  });

  return (
    <IonPage>
      <IonContent>
        <form onSubmit={onSubmit}>
          <IonItem>
            <IonLabel position="floating">email</IonLabel>
            <IonInput name="email" ref={register} clearInput></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">password</IonLabel>
            <IonInput
              name="password"
              type="password"
              ref={register}
              clearInput
            ></IonInput>
          </IonItem>
          <IonButton type="submit">submit</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;
