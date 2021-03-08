import React, { useState, useEffect } from "react";
import { useAppDispatch, useTypedSelector } from "../app/store";
import { useAppContext } from "../context/Context";

import {
  fetchPeople,
  createPerson,
  updatePerson,
  deletePerson,
} from "../Features/people/peopleSlice";

import PersonForm from "../Features/people/PersonForm";
import PeopleList from "../Features/people/PeopleList";

import { IonContent, IonAlert, IonPage } from "@ionic/react";
import { IPerson } from "../api/person";

const People = () => {
  const dispatch = useAppDispatch();
  const people = useTypedSelector((state) => state.people.list);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<IPerson | null>(null);

  const { dbReady, dbInitError, resetDbError } = useAppContext();

  useEffect(() => {
    if (dbReady) {
      dispatch(fetchPeople());
    }
  }, [dbReady, dispatch]);

  const handleSubmit = (person: IPerson) => {
    if (editId) {
      dispatch(updatePerson(person));
      setEditId(null);
      setEditValues(null);
    } else {
      dispatch(createPerson(person));
    }
  };

  const handleReset = () => {
    setIsEditing(false);
    editId && setEditId(null);
  };

  const handleCreate = () => {
    setIsEditing(true);
  };

  const handleEdit = (person: IPerson) => {
    setIsEditing(true);
    setEditId(person.id!);
    setEditValues({ ...person });
  };

  const handleDelete = (id: number) => {
    dispatch(deletePerson(id));
  };

  return (
    <IonPage>
      <IonContent>
        <IonAlert
          isOpen={!!dbInitError}
          onDidDismiss={() => resetDbError}
          header={!!dbInitError ? dbInitError.header : undefined}
          message={!!dbInitError ? dbInitError.message : undefined}
        />
        {isEditing ? (
          <PersonForm
            onSubmit={handleSubmit}
            onReset={handleReset}
            editId={editId}
            editValues={editValues}
            dbReady={dbReady}
          />
        ) : (
          <PeopleList
            people={people}
            onCreate={handleCreate}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default People;
