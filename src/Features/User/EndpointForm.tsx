import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonListHeader,
  IonPage,
  IonRadio,
  IonRadioGroup,
} from "@ionic/react";
import { setEndpoint as setUserEndpoint } from "./userSlice";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../app/store";
// import type { Endpoint } from "../../storage/types";

// Will include a selector allowing to chose between a local DB and a hosted DB
// In case of hosted DB, will show an input to type in the url

const EndpointForm: React.FC = (props: any) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch, errors } = useForm();
  const history = useHistory();
  const { endpoint } = useTypedSelector((state) => state.user);
  //   const [hosting, setHosting] = useState<string | undefined>(undefined);

  const onSubmit = handleSubmit(({ dbHosting, slsEndpoint }) => {
    dispatch(
      setUserEndpoint({
        endpoint: dbHosting === "local" ? dbHosting : slsEndpoint,
        shouldSetInStorage: true,
      })
    );
  });

  useEffect(() => {
    console.log("endpoint", endpoint);
    if (!!endpoint) {
      console.log("history.push");
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  const dbHosting = watch("dbHosting", props.dbHosting);

  return (
    <IonPage>
      <IonContent>
        <form onSubmit={onSubmit}>
          <IonRadioGroup
            value={dbHosting}
            name="dbHosting"
            ref={register}
            // onIonChange={(e) => setHosting(e.detail.value)}
          >
            <IonListHeader>
              <IonLabel>Select database hosting</IonLabel>
            </IonListHeader>
            <IonItem>
              <IonLabel>local</IonLabel>
              <IonRadio slot="start" value="local" />
            </IonItem>
            <IonItem>
              <IonLabel>AWS</IonLabel>
              <IonRadio slot="start" value="sls" />
            </IonItem>
          </IonRadioGroup>
          {/* {dbHosting === "sls" ? ( */}
          <IonItem>
            <IonLabel position="floating">Serverless endpoint</IonLabel>
            <IonInput
              name="slsEndpoint"
              ref={
                register
                //   hosting === "sls" ? register({ required: true }) : register
              }
              clearInput
            ></IonInput>
          </IonItem>
          {/* ) : null} */}
          <IonButton type="submit">submit</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default EndpointForm;