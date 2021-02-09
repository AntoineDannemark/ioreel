import React, { useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useTypedSelector } from "../app/store";

import {
  fetchTenants,
  createTenant,
  updateTenant,
  deleteTenant,
} from "../Features/tenants/tenantsSlice";

import { DBContext } from "../XXcontext/Context";

import TenantForm from "../Features/tenants/TenantForm";
import TenantsList from "../Features/tenants/TenantsList";

import { IonContent, IonAlert } from "@ionic/react";

const Tenants = () => {
  const dispatch = useAppDispatch();
  const tenants = useTypedSelector((state) => state.tenants.list);
  const [editId, setEditId] = useState<number>(null);

  const { dbReady, dbInitError, resetDbError } = useContext(DBContext);

  useEffect(() => {
    if (dbReady) {
      setTimeout(() => dispatch(fetchTenants()), 1500);
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
      //   dispatch(updateTenant({ id: editId, fisrtname, lastname }));
      setEditId(null);
    } else {
      dispatch(createTenant({ firstname, lastname }));
    }
    // cleanInputs();
  };

  const handleReset = () => {
    editId && setEditId(null);
  };

  const handleEdit = (tenant) => {
    setEditId(tenant.id);
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
        // onEdit={handleEdit}
        editId={editId}
        dbReady={dbReady}
      />
      <TenantsList
        tenants={tenants || []}
        // dbReady={dbReady}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </IonContent>
  );
};

export default Tenants;
