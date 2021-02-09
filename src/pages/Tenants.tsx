import React, { useState, useEffect } from "react";
import { useAppDispatch, useTypedSelector } from "../app/store";
import { useAppContext } from "../context/Context";

import {
  fetchTenants,
  createTenant,
  updateTenant,
  deleteTenant,
} from "../Features/tenants/tenantsSlice";

import { Tenant } from "../Features/tenants/types";

import TenantForm from "../Features/tenants/TenantForm";
import TenantsList from "../Features/tenants/TenantsList";

import { IonContent, IonAlert } from "@ionic/react";

const Tenants = () => {
  const dispatch = useAppDispatch();
  const tenants = useTypedSelector((state) => state.tenants.list);
  const [editId, setEditId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{
    firstname: string;
    lastname: string;
  } | null>(null);

  const { dbReady, dbInitError, resetDbError } = useAppContext();

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

  const handleEdit = (tenant: Tenant) => {
    let { id, firstname, lastname } = tenant;
    setEditId(id);
    setEditValues({ firstname, lastname });
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTenant(id));
  };

  return (
    <IonContent>
      <IonAlert
        isOpen={!!dbInitError}
        onDidDismiss={() => resetDbError}
        header={!!dbInitError ? dbInitError.header : undefined}
        message={!!dbInitError ? dbInitError.message : undefined}
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
