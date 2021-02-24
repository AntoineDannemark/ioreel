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
      //   dispatch(fetchPeople());
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

  //   const addPhone = async () => {
  //     const result = await window.api.person.addPhone(1, {
  //       prefix: 33,
  //       number: 123456,
  //     });

  //     console.log(result);
  //   };

  //   const addAddress = async () => {
  //     const result = await window.api.person.addAddress(1, {
  //       street: "rue de joie",
  //       number: 748,
  //       city: "liège le piège",
  //       zip: 4000,
  //       country: "Belgium",
  //     });

  //     console.log(result);
  //   };

  //   const getJohn = async () => {
  //     const john = await window.api.person.findByName("john", "doe");

  //     console.log(john);
  //   };

  const createJohn = async () => {
    let john = {
      firstname: "john",
      lastname: "doe",
      birthDate: new Date(1984, 10, 17).toISOString(),
      birthPlace: "malmedy",
      email: "john.doe@test.com",
      gender: "m",
      bankAccount: "BE63543543254",
      bankCode: "BBRUEB",
      comment: "John est un sacré lascar!",
    };
    // const res = await window.api.person.create(john);

    // console.log(res);
  };

  //   const createPhone = async () => {
  //     let phone = {
  //       prefix: 32,
  //       number: 65873254,
  //     };

  //     const res = await window.api.phone.create(phone);

  //     console.log(res);
  //   };

  const addPhone = async () => {
    let phone = {
      prefix: 32,
      number: 65873254,
    };

    const res = await window.api.person.addPhone(1, phone);

    console.log(res);
  };

  const fetchAllPersons = async () => {
    const res = await window.api.person.fetchAll();

    console.log(res);
  };

  const getEnv = async () => {
    const res = await window.api.utils.env();

    console.log(res);
  };

  return (
    <IonContent>
      <IonButton onClick={getEnv}>env</IonButton>
      <IonButton onClick={createJohn}>create John</IonButton>
      <IonButton onClick={fetchAllPersons}>fetchAllPersons</IonButton>
      <IonButton onClick={addPhone}>addPhone</IonButton>
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
