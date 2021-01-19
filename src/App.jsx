import React, { useReducer, useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, isPlatform } from "@ionic/react";
import { IonReactRouter, IonReactHashRouter } from "@ionic/react-router";

import Tenants from "./pages/Tenants";

import tenantsReducer from "./store/tenants/reducer";
import { initialState as tenantsInitialState } from "./store/tenants/index";
import { DispatchContextProvider, StateContextProvider, DBContextProvider } from './context/Context';

import { SQLite } from "@ionic-native/sqlite";

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
import "./theme/variables.css";

const Router = isPlatform("electron")
    ? IonReactHashRouter
    : IonReactRouter;

const initDb = (DBsetter, errorSetter) => {
    try {
        SQLite.create({
            name: "ioreel.db",
            location: "default",
        })
        .then(db => {
            db.executeSql(
                "create table if not exists users (id integer primary key autoincrement, firstname VARCHAR(32), lastname VARCHAR(32))",
                []
            );
            return db;
        })
        .then(db => {
            console.log("no error, set db in the state");
            DBsetter(db);
        })
        .catch((err) => console.log(err));
    } catch (e) {
        errorSetter({
            header: "DB Init Error",
            message: "This will only work on a device. Please refer to the README.",
        });
    }
};

const App = () => {
    const [db, setDb] = useState();
    const [error, setError] = useState()

    const [state, dispatch] = useReducer(tenantsReducer, tenantsInitialState);

    // Init DB at mount
    useEffect(() => {
        initDb(setDb, setError);
    }, []);

    return (
            <StateContextProvider value={state}>
                <DispatchContextProvider value={dispatch}>
                    <DBContextProvider value={db}>
                        <IonApp>
                            <Router>
                                <IonRouterOutlet>
                                    <Route exact path="/" render={() => <Redirect to="/tenants" />} />
                                    <Route path="/tenants" component={Tenants} exact={true} />                    
                                </IonRouterOutlet>
                            </Router>
                        </IonApp>
                    </DBContextProvider>
                </DispatchContextProvider>
            </StateContextProvider>
    );
};

export default App;
