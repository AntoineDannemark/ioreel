import React, { useEffect } from "react";
import { Route } from "react-router-dom";
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
  IonButton,
} from "@ionic/react";
import { IonReactRouter, IonReactHashRouter } from "@ionic/react-router";

// TODO check if library still needed
// import { SQLite } from "@ionic-native/sqlite";

import { useAppContext, dbInitError } from "../context/Context";
import { useAppDispatch, useTypedSelector } from "./store";
import { setEndpoint, clearEndpoint } from "../features/User/userSlice";

import Login from "../features/User/Login";
import EndpointForm from "../features/User/EndpointForm";
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

  useEffect(() => {
    // If we're not in Electron, there is no storageApi in window
    if (!isPlatform("electron")) {
      // Here we should load only the basic version of the api
      window.storageApi = require("../storage").default;
    }

    const setUserAPIEndpoint = async () => {
      const ep = await window.storageApi.getEndpoint(isPlatform("electron"));
      if (!endpoint && !!ep) {
        dispatch(setEndpoint({ endpoint: ep, shouldSetInStorage: false }));
      }
    };

    // Now that we have the storageApi, check if we have an endpoint and set it in redux
    // If we don't we should be redirected to the endpoint form
    setUserAPIEndpoint();
  }, [dispatch, endpoint]);

  useEffect(() => {
    // If we have an endpoint, we can set the api in the window object
    if (!!endpoint) {
      if (!isPlatform("electron")) {
        window.api = require("../api").default;
      }
      testDB(setDbReady, setDbInitError);
    }
  }, [endpoint, setDbInitError, setDbReady]);

  const handleClearEndpoint = () => {
    dispatch(clearEndpoint());
  };

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
          <IonButton onClick={handleClearEndpoint}>CLEAR ENDPOINT</IonButton>
        </IonHeader>
        <IonContent>
          <IonTabs>
            <IonRouterOutlet>
              {/* <Route exact path="/" render={() => <Redirect to="/people" />} /> */}
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                exact
                path="/people"
                component={People}
              />
              <Route exact path="/units" component={Units} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/endpoint" component={EndpointForm} />
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
