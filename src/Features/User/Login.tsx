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
  const { isAuthenticated } = useTypedSelector((state) => state.user);

  const onSubmit = handleSubmit(({ email, password }) => {
    dispatch(login({ email, password }));
  });

  useEffect(() => {
    console.log("connected", isAuthenticated);
    if (isAuthenticated) {
      console.log("history.push");
      history.push("/");
    }
  }, [isAuthenticated, history]);

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
