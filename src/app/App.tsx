import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  isPlatform,
  getPlatforms,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonHeader,
  IonCheckbox,
  IonContent,
  IonButton,
} from "@ionic/react";
import { IonReactRouter, IonReactHashRouter } from "@ionic/react-router";

// TODO check if library still needed
// import { SQLite } from "@ionic-native/sqlite";

import { useAppContext, dbInitError } from "../context/Context";

import People from "../pages/People";
import Units from "../pages/Units";

import { people, home } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "../theme/variables.css";

const Router = isPlatform("electron") ? IonReactHashRouter : IonReactRouter;

const testDB = async (
  dbReadySetter: React.Dispatch<React.SetStateAction<boolean>>,
  errorSetter: React.Dispatch<React.SetStateAction<dbInitError | null>>
) => {
  const get = await window.api.utils.getEndpoint(isPlatform("electron"));

  console.log("GET", get);

  const res = await window.api.utils.testConnection();

  if (res.dbReady) {
    dbReadySetter(true);
  } else if (res.error) {
    errorSetter({
      header: `[${getPlatforms()[0]}] - DB Init Error`,
      message: JSON.stringify(res.error),
    });
  }
};

const App: React.FC = () => {
  const { dbType, setDbType, setDbReady, setDbInitError } = useAppContext();

  // Init DB at mount
  useEffect(() => {
    if (!isPlatform("electron")) {
      window.api = require("../api").default;
    }
    testDB(setDbReady, setDbInitError);
  }, [setDbInitError, setDbReady]);

  const handleDbChange = async (isLocal: boolean) => {
    const endpoint = isLocal ? "local" : "sls";
    await window.api.utils.setEndpoint(endpoint, isPlatform("electron"));
    setDbType(endpoint);
  };

  const getisLocal = async () => {
    const res = await window.api.utils.getEndpoint(isPlatform("electron"));

    console.log(res);
  };

  return (
    <IonApp>
      <Router>
        <IonHeader
          style={{
            height: "3rem",
            backgroundColor: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <IonCheckbox
            value={"blah"}
            checked={dbType === "local"}
            onIonChange={(e) => handleDbChange(e.detail.checked)}
          />
          <p style={{ margin: "1rem", color: "white" }}>{dbType}</p>
          <IonButton onClick={getisLocal}>TEST</IonButton>
        </IonHeader>
        <IonContent>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/people" component={People} />
              <Route exact path="/units" component={Units} />
              <Route exact path="/" render={() => <Redirect to="/people" />} />
            </IonRouterOutlet>
            <IonTabBar slot={"bottom"}>
              <IonTabButton tab="people" href="/people">
                <IonIcon icon={people} />
                <IonLabel>people</IonLabel>
              </IonTabButton>
              <IonTabButton tab="units" href="/units">
                <IonIcon icon={home} />
                <IonLabel>units</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonContent>
      </Router>
    </IonApp>
  );
};

export default App;
