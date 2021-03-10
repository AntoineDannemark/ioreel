import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../app/store";
import { login } from "./userSlice";
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
} from "@ionic/react";

type FormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch, errors } = useForm<FormData>();
  const history = useHistory();
  const { connected } = useTypedSelector((state) => state.user);

  const onSubmit = handleSubmit(({ email, password }) => {
    dispatch(login({ email, password }));
  });

  useEffect(() => {
    console.log("connected", connected);
    if (connected) {
      console.log("history.push");
      history.push("/");
    }
  }, [connected, history]);

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
