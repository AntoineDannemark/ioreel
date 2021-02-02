import React, { useState } from "react";
import { IonItem, IonLabel, IonDatetime } from "@ionic/react";

const DatePicker = React.forwardRef((props, ref) => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <IonItem>
      <IonLabel position="stacked">birth date</IonLabel>
      <IonDatetime
        displayFormat="MM/DD/YYYY"
        value={selectedDate}
        ref={ref}
        onIonChange={(e) => setSelectedDate(e.detail.value)}
      ></IonDatetime>
    </IonItem>
  );
});

export default DatePicker;
