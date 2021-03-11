import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import ProtectedRoute, {
  ProtectedRouteProps,
} from "../features/User/ProtectedRoute";
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
  IonContent,
} from "@ionic/react";
import { IonReactRouter, IonReactHashRouter } from "@ionic/react-router";

// TODO check if library still needed
// import { SQLite } from "@ionic-native/sqlite";

import { useAppContext, dbInitError } from "../context/Context";
import { useAppDispatch, useTypedSelector } from "./store";
import { setEndpoint } from "../features/User/userSlice";

import Login from "../features/User/Login";
import Endpoint from "../features/User/Endpoint";
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
  const { setDbReady, setDbInitError } = useAppContext();
  const { connected, endpoint } = useTypedSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: connected,
    authenticationPath: "/login",
    hasApiEndpoint: !!endpoint,
    getApiEndpointPath: "/endpoint",
  };

  const getUserAPIEndpoint = async () => {
    return await window.storageApi.getEndpoint(isPlatform("electron"));
  };

  useEffect(() => {
    // If we're not in Electron, there is no storageApi in window
    if (!isPlatform("electron")) {
      // Here we should load only the basic version of the api
      window.storageApi = require("../storage").default;
    }

    // Now that we have an api, check if we have an endpoint and set it in redux
    getUserAPIEndpoint().then((ep) => {
      if (!endpoint && !!ep) {
        dispatch(setEndpoint(ep));
      }
    });
  }, [dispatch, endpoint]);

  useEffect(() => {
    if (!!endpoint) {
      if (!isPlatform("electron")) {
        window.api = require("../api").default;
      }
      testDB(setDbReady, setDbInitError);
    }
    // TODO probably refactor endpoint because we are watching an object!!
  }, [endpoint, setDbInitError, setDbReady]);

  //   // Init DB at mount
  //   useEffect(() => {
  //     if (!isPlatform("electron")) {
  //       window.storageApi = require("../storage").default;
  //       //   window.api = require("../api").default;
  //     }
  //     testDB(setDbReady, setDbInitError);
  //   }, [setDbInitError, setDbReady]);

  return (
    <IonApp>
      <Router>
        <IonHeader
          style={{
            height: "3rem",
            backgroundColor: "black",
            color: "pink",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          Bonjour m'fi
        </IonHeader>
        <IonContent>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/" render={() => <Redirect to="/people" />} />
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                exact
                path="/people"
                component={People}
              />
              <Route exact path="/units" component={Units} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/endpoint" component={Endpoint} />
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
