import React from "react";
import { IonButton } from "@ionic/react";

const Login = () => {
  const handleLogin = () => {
    console.log("login");
  };

  return <IonButton onClick={handleLogin}>Login</IonButton>;
};

export default Login;
