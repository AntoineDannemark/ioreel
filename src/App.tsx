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
import React, { useRef, useState, useEffect, MouseEvent } from "react";
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
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
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

const App: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState<{
    header: string;
    message: string;
  } | null>();
  const [users, setUsers] = useState<
    Array<{ id: number; firstname: string; lastname: string }>
  >();
  const [db, setDb] = useState<SQLiteObject | null>(null);

  const firstNameInputRef = useRef<HTMLIonInputElement>(null);
  const lastNameInputRef = useRef<HTMLIonInputElement>(null);

  // Init DB at mount
  useEffect(() => {
    initDb();
  }, []);

  const initDb = (): void => {
    try {
      SQLite.create({
        name: "ioreel.db",
        location: "default",
      })
        .then((db: SQLiteObject) => {
          db.executeSql(
            "create table if not exists users (id integer primary key autoincrement, firstname VARCHAR(32), lastname VARCHAR(32))",
            []
          );
          return db;
        })
        .then((db) => {
          console.log("no error, set db in the state");
          setDb(db);
        })
        .catch((err) => console.log(err));
    } catch (e) {
      setError({
        header: "DB Init Error",
        message: "This will only work on a device. Please refer to the README.",
      });
    }
  };

  const handleSubmitButtonClick = async () => {
    let firstname = firstNameInputRef.current!.value?.toString(),
      lastname = lastNameInputRef.current!.value?.toString();
    if (!firstname || !lastname) {
      return setError({
        header: "Form error",
        message: "Please provide a firstname and a lastname",
      });
    }

    db!
      .executeSql("insert into users (firstname, lastname) values (?,?)", [
        firstname,
        lastname,
      ])
      .then((res) => {
        console.log(res);
        handleResetButtonClick();
      })
      .catch((err) => console.log(err));
  };

  const handleResetButtonClick = () => {
    firstNameInputRef.current!.value = "";
    lastNameInputRef.current!.value = "";
  };

  const handleDeleteUser = (id: number) => {
    db!
      .executeSql("delete from users where id = ?", [id])
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const clearError = () => {
    setError(null);
  };

  const handleGetUsers = () => {
    db!
      .executeSql("select * from users", [])
      .then((res) => {
        let users = [];

        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            console.log(res.rows.item(i));
            users.push({
              id: res.rows.item(i).id,
              firstname: res.rows.item(i).firstname,
              lastname: res.rows.item(i).lastname,
            });
          }
        }
        setUsers(users);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <IonAlert
        isOpen={!!error}
        header={error!.header}
        message={error!.message}
        buttons={[{ text: "OK", handler: clearError }]}
      />
      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle className="ion-text-center">Ionic-React-SQLite</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonButton onClick={handleGetUsers} disabled={!db}>
            get users
          </IonButton>
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
                <IonButton onClick={handleSubmitButtonClick} disabled={!db}>
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
                <IonItem key={user.id}>
                  <IonLabel>{`${user.firstname} ${user.lastname}`}</IonLabel>
                  <IonButton
                    onClick={() => handleDeleteUser(user.id)}
                    disabled={!db}
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
