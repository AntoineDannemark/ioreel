import React, { useState, useContext, useEffect } from "react";
import { useAppDispatch, useTypedSelector } from "../app/store";

import {
  fetchTenants,
  createTenant,
  updateTenant,
  deleteTenant,
} from "../Features/tenants/tenantsSlice";

import { Context } from "../context/Context";

import TenantForm from "../Features/tenants/TenantForm";
import TenantsList from "../Features/tenants/TenantsList";

import { IonContent, IonAlert } from "@ionic/react";

const Tenants = () => {
  const dispatch = useAppDispatch();
  const tenants = useTypedSelector((state) => state.tenants.list);
  const [editId, setEditId] = useState<number>(null);
  const [editValues, setEditValues] = useState<{
    firstname: string;
    lastname: string;
  }>(null);

  const { dbReady, dbInitError, resetDbError } = useContext(Context);

  useEffect(() => {
    if (dbReady) {
      dispatch(fetchTenants());
    }
  }, [dbReady, dispatch]);

  const handleSubmit = ({
    firstname,
    lastname,
  }: {
    firstname: string;
    lastname: string;
  }) => {
    if (editId) {
      dispatch(updateTenant({ id: editId, firstname, lastname }));
      setEditId(null);
      setEditValues(null);
    } else {
      dispatch(createTenant({ firstname, lastname }));
    }
  };

  const handleReset = () => {
    editId && setEditId(null);
  };

  const handleEdit = (tenant) => {
    let { id, firstname, lastname } = tenant;
    setEditId(id);
    setEditValues({ firstname, lastname });
  };

  const handleDelete = (id) => {
    dispatch(deleteTenant(id));
  };

  return (
    <IonContent>
      <IonAlert
        isOpen={!!dbInitError}
        onDidDismiss={() => resetDbError}
        header={dbInitError && dbInitError.header}
        message={dbInitError && dbInitError.message}
      />
      <TenantForm
        onSubmit={handleSubmit}
        onReset={handleReset}
        editId={editId}
        editValues={editValues}
        dbReady={dbReady}
      />
      <TenantsList
        tenants={tenants}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </IonContent>
  );
};

export default Tenants;
