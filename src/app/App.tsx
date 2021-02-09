import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  isPlatform,
  getPlatforms,
} from "@ionic/react";
import { IonReactRouter, IonReactHashRouter } from "@ionic/react-router";

// TODO check if library still needed
// import { SQLite } from "@ionic-native/sqlite";

import { useAppContext } from "../context/Context";

import { dbInitError } from "../context/Context";

import Tenants from "../pages/Tenants";

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

const getDriver = () => (isPlatform("cordova") ? "cordova" : "sqlite");

const initDb = async (
  dbReadySetter: React.Dispatch<React.SetStateAction<boolean>>,
  errorSetter: React.Dispatch<React.SetStateAction<dbInitError | null>>
) => {
  if (!isPlatform("cordova") && !isPlatform("electron")) return;
  if (isPlatform("cordova")) {
    window.api = require("../api").api;
  }

  const res = await window.api.initDB(getDriver());

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
  const { log } = window.api;

  // Init DB at mount
  useEffect(() => {
    log &&
      log({
        type: "info",
        message: "you're simply the best",
      });

    log && log({ type: "info", message: "coucouc charcles" });

    initDb(setDbReady, setDbInitError);
  }, [log, setDbInitError, setDbReady]);

  return (
    <IonApp>
      <Router>
        <IonRouterOutlet>
          <Route exact path="/" render={() => <Redirect to="/tenants" />} />
          <Route path="/tenants" component={Tenants} exact={true} />
        </IonRouterOutlet>
      </Router>
    </IonApp>
  );
};

export default App;
