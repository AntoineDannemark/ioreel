import React, { useState, useEffect } from "react";
import { useAppDispatch, useTypedSelector } from "../app/store";
import { useAppContext } from "../context/Context";

import {
  fetchPeople,
  createPerson,
  updatePerson,
  deletePerson,
} from "../Features/people/peopleSlice";

import { Person } from "../Features/people/types";

import PersonForm from "../Features/people/PersonForm";
import PeopleList from "../Features/people/PeopleList";

import { IonContent, IonAlert, IonButton } from "@ionic/react";
import Input from "../commons/Input";

const People = () => {
  const dispatch = useAppDispatch();
  const people = useTypedSelector((state) => state.people.list);
  const [editId, setEditId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{
    firstname: string;
    lastname: string;
    email: string;
  } | null>(null);

  const { dbReady, dbInitError, resetDbError } = useAppContext();

  useEffect(() => {
    if (dbReady) {
      dispatch(fetchPeople());
    }
  }, [dbReady, dispatch]);

  const handleSubmit = ({
    firstname,
    lastname,
    email,
  }: {
    firstname: string;
    lastname: string;
    email: string;
  }) => {
    if (editId) {
      dispatch(updatePerson({ id: editId, firstname, lastname, email }));
      setEditId(null);
      setEditValues(null);
    } else {
      dispatch(createPerson({ firstname, lastname, email }));
    }
  };

  const handleReset = () => {
    editId && setEditId(null);
  };

  const handleEdit = (tenant: Person) => {
    let { id, firstname, lastname, email } = tenant;
    setEditId(id!);
    setEditValues({ firstname, lastname, email });
  };

  const handleDelete = (id: number) => {
    dispatch(deletePerson(id));
  };

  const addPhone = async () => {
    const result = await window.api.person.addPhone(1, {
      prefix: 33,
      number: 123456,
    });

    console.log(result);
  };

  const addAddress = async () => {
    const result = await window.api.person.addAddress(1, {
      street: "rue de joie",
      number: 748,
      city: "liège le piège",
      zip: 4000,
      country: "Belgium",
    });

    console.log(result);
  };

  const getJohn = async () => {
    const john = await window.api.person.findByName("john", "doe");

    console.log(john);
  };

  return (
    <IonContent>
      <IonButton onClick={addPhone}>submit phone</IonButton>
      <IonButton onClick={addAddress}>submit address</IonButton>
      <IonButton onClick={getJohn}>getJohn</IonButton>
      <IonAlert
        isOpen={!!dbInitError}
        onDidDismiss={() => resetDbError}
        header={!!dbInitError ? dbInitError.header : undefined}
        message={!!dbInitError ? dbInitError.message : undefined}
      />
      <PersonForm
        onSubmit={handleSubmit}
        onReset={handleReset}
        editId={editId}
        editValues={editValues}
        dbReady={dbReady}
      />
      <PeopleList people={people} onEdit={handleEdit} onDelete={handleDelete} />
    </IonContent>
  );
};

export default People;
