import "reflect-metadata";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import * as serviceWorker from "./serviceWorker";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import ContextProvider from "./context/Context";
import { InsertResult, UpdateResult, DeleteResult } from "typeorm";

interface log {
  type: "info" | "warn" | "error";
  message: string;
}

// TODO This should (probably) be declared elsewhere
// + interface the api + replace 'any'
declare global {
  interface Window {
    // https://stackoverflow.com/questions/56457935/typescript-error-property-x-does-not-exist-on-type-window/56458070
    api: {
      fetchTenants: () => Promise<any>;
      createTenant: (tenant: any) => Promise<InsertResult>;
      updateTenant: (id: number, data: any) => Promise<UpdateResult>;
      removeTenant: (id: number) => Promise<DeleteResult>;
      initDB: (platform: any) => Promise<any>;
      log?: (log: log) => void;
    };
  }
}

const renderApp = () => {
  const App = require("./app/App").default;

  render(
    <ContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ContextProvider>,
    document.getElementById("root")
  );
};

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

// Following is added for using the camera
// https://capacitorjs.com/docs/web/pwa-elements
// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);
