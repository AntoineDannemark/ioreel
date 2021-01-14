// import React from "react";
// import { Redirect, Route } from "react-router-dom";
// import { IonApp, IonRouterOutlet, isPlatform } from "@ionic/react";
// import { IonReactRouter, IonReactHashRouter } from "@ionic/react-router";
// import Home from "./pages/Home";

// /* Core CSS required for Ionic components to work properly */
// import "@ionic/react/css/core.css";

// /* Basic CSS for apps built with Ionic */
// import "@ionic/react/css/normalize.css";
// import "@ionic/react/css/structure.css";
// import "@ionic/react/css/typography.css";

// /* Optional CSS utils that can be commented out */
// import "@ionic/react/css/padding.css";
// import "@ionic/react/css/float-elements.css";
// import "@ionic/react/css/text-alignment.css";
// import "@ionic/react/css/text-transformation.css";
// import "@ionic/react/css/flex-utils.css";
// import "@ionic/react/css/display.css";

// /* Theme variables */
// import "./theme/variables.css";

// const Router: any = isPlatform("electron")
//   ? IonReactHashRouter
//   : IonReactRouter;

// const App: React.FC = () => (
//   <IonApp>
//     <Router>
//       <IonRouterOutlet>
//         <Route path="/home" component={Home} exact={true} />
//         <Route exact path="/" render={() => <Redirect to="/home" />} />
//       </IonRouterOutlet>
//     </Router>
//   </IonApp>
// );

// export default App;
import React, { useRef, useState, MouseEvent } from "react";
import {
  IonApp,
  IonItem,
  IonLabel,
  IonInput,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonAlert,
  IonList,
} from "@ionic/react";
// import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { saveOutline, refreshOutline, trashOutline } from "ionicons/icons";
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

const dummyUsers = [
  { firstName: "jean", lastName: "bon" },
  { firstName: "albert", lastName: "tôt" },
];

const App: React.FC = () => {
  //   const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState<string>();
  const [users, setUsers] = useState<
    Array<{ firstName: string; lastName: string }>
  >(dummyUsers);
  //   const [dbInitialized, setDbInitialized] = useState<boolean>(false);
  //   const [db, setDb] = useState<SQLiteObject>(null)

  const firstNameInputRef = useRef<HTMLIonInputElement>(null);
  const lastNameInputRef = useRef<HTMLIonInputElement>(null);

  //   // Init DB at mount
  //   useEffect(() => {
  //     effect;
  //     return () => {
  //       cleanup;
  //     };
  //   }, []);

  //   const initDb = (): void => {
  //     try {
  //       SQLite.create({
  //         name: "data.db",
  //         location: "default",
  //       }).then(async (db: SQLiteObject) => {
  //         try {
  //           const create = await db.executeSql(
  //             "create table if not exists danceMoves(name VARCHAR(32))",
  //             []
  //           );
  //           await console.log("Table created/exists. Msg: ", create);
  //           const insert = await db.executeSql(
  //             "insert into danceMoves (name) values (?)",
  //             ["Macarena"]
  //           );
  //           await console.log("Inserted Macarena: ", insert);
  //         } catch (e) {
  //           console.log("SQL error: ", e);
  //         }
  //       });
  //     } catch (e) {
  //       setShowAlert(true);
  //       console.log("please use a device: ", e);
  //     }
  //   };

  const handleSubmitButtonClick = () => {
    let firstName = firstNameInputRef.current!.value?.toString(),
      lastName = lastNameInputRef.current!.value?.toString();
    if (!firstName || !lastName) {
      return setError("Please provide a firstname and a lastname");
    }
    const newUser = {
      firstName,
      lastName,
    };
    console.log(newUser);
    setUsers([...users, newUser]);
    handleResetButtonClick();
  };
  const handleResetButtonClick = () => {
    firstNameInputRef.current!.value = "";
    lastNameInputRef.current!.value = "";
  };
  const handleDeleteUser = (e: MouseEvent) => {
    e.preventDefault();
    console.log(e.currentTarget.id);
  };
  const clearError = () => {
    setError("");
  };
  return (
    <>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: "OK", handler: clearError }]}
      />
      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle className="ion-text-center">Ionic-React-SQLite</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {/* <IonButton onClick={initDb}>Init DB</IonButton>
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header={"Mamma mia!"}
            message={
              "This will only work on a device. Please refer to the README."
            }
            buttons={["OK"]}
          /> */}
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Firstname</IonLabel>
                  <IonInput ref={firstNameInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Lastname</IonLabel>
                  <IonInput ref={lastNameInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="ion-text-left">
                <IonButton onClick={handleSubmitButtonClick}>
                  <IonIcon slot="start" icon={saveOutline} />
                  submit
                </IonButton>
              </IonCol>
              <IonCol className="ion-text-right">
                <IonButton onClick={handleResetButtonClick}>
                  <IonIcon slot="start" icon={refreshOutline} />
                  reset
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
          {users && (
            <IonList>
              {users.map((user) => (
                <IonItem key={`${user.firstName} ${user.lastName}`}>
                  <IonLabel>{`${user.firstName} ${user.lastName}`}</IonLabel>
                  <IonButton
                    onClick={handleDeleteUser}
                    id={`${user.firstName} ${user.lastName}`}
                  >
                    <IonIcon icon={trashOutline} />
                  </IonButton>
                </IonItem>
              ))}
            </IonList>
          )}
        </IonContent>
      </IonApp>
    </>
  );
};
export default App;
