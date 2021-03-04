import React, { useEffect } from "react";
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
  const res = await window.api.utils.testDBConnection();

  if (res.dbReady) {
    dbReadySetter(true);
  } else if (res.error) {
    errorSetter({
      header: `[${getPlatforms()[0]}] - DB Init Error`,
      message: res.error,
    });
  }
};

const App: React.FC = () => {
  const { setDbReady, setDbInitError } = useAppContext();

  // Init DB at mount
  useEffect(() => {
    if (!isPlatform("electron")) {
      window.api = require("../api").default;
    }
    testDB(setDbReady, setDbInitError);
  }, [setDbInitError, setDbReady]);

  return (
    <IonApp>
      <Router>
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
      </Router>
    </IonApp>
  );
};

export default App;
