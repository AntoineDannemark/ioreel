import React, { useEffect, useState } from "react";
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
import Tenants from "../pages/Tenants";

import { DBContextProvider } from "../XXcontext/Context";

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

const getDriver = () => {
  let driver;

  if (isPlatform("cordova")) {
    driver = "cordova";
  } else if (isPlatform("electron")) {
    driver = "sqlite";
  }
  return driver;
};

// TODO extract platform logic
const initDb = async (dbReadySetter, errorSetter) => {
  if (!isPlatform("cordova") && !isPlatform("electron")) return;
  if (isPlatform("cordova")) {
    window.api = require("../api").api;
  }

  const res = await window.api.initDB(getDriver());

  if (res.dbReady) {
    console.log(`[${getPlatforms()[0]}] - DB Init Success`);
    dbReadySetter(true);
  } else if (res.error) {
    console.log(`[${getPlatforms()[0]}] - DB Init Error: ${res.error}`);
    errorSetter({
      header: `[${getPlatforms()[0]}] - DB Init Error`,
      message: res.error,
    });
  }
};

const App: React.FC = () => {
  const [dbReady, setDbReady] = useState();
  const [dbInitError, setDbInitError] = useState();

  // Init DB at mount
  useEffect(() => {
    initDb(setDbReady, setDbInitError);
  }, []);

  const resetDbError = () => setDbInitError(null);

  return (
    <DBContextProvider value={{ dbReady, dbInitError, resetDbError }}>
      <IonApp>
        <Router>
          <IonRouterOutlet>
            <Route exact path="/" render={() => <Redirect to="/tenants" />} />
            <Route path="/tenants" component={Tenants} exact={true} />
          </IonRouterOutlet>
        </Router>
      </IonApp>
    </DBContextProvider>
  );
};

export default App;
