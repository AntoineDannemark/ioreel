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

import { IonContent, IonAlert } from "@ionic/react";

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

  return (
    <IonContent>
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
