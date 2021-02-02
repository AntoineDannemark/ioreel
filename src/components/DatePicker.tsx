import React, { useState } from "react";
import { IonItem, IonLabel, IonDatetime } from "@ionic/react";

const DatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    "2012-12-15T13:47:20.789"
  );

  return (
    <IonItem>
      <IonLabel position="floating">MM/DD/YYYY</IonLabel>
      <IonDatetime
        displayFormat="MM/DD/YYYY"
        min="1994-03-14"
        max="2012-12-09"
        value={selectedDate}
        onIonChange={(e) => setSelectedDate(e.detail.value!)}
      ></IonDatetime>
    </IonItem>
  );
};

export default DatePicker;
