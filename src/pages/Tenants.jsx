import React , { useState, useContext, useEffect, useRef } from "react";
import { DBContext, DispatchContext, StateContext } from "../context/Context";
import { actions as tenantActions } from '../store/tenants';
import { IonContent, IonButton } from "@ionic/react";
import TenantForm from '../components/TenantForm';
import TenantsList from '../components/TenantsList';

const Tenants = () => {
    const [editId, setEditId] = useState(null);
    
    const state = useContext(StateContext);    
    const dispatch = useContext(DispatchContext);
    const dbReady = useContext(DBContext);

    const firstNameInputRef = useRef(null);
    const lastNameInputRef = useRef(null);

    const cleanInputs = () => {        
        firstNameInputRef.current.value = '';
        lastNameInputRef.current.value = '';
    }

    useEffect(() => {
        if (dbReady && !state.tenants.length) {
            tenantActions.fetch()(dispatch)
        }        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dbReady]);

    const handleSubmit = () => {
        let tenant = {        
            firstname: firstNameInputRef.current.value,
            lastname: lastNameInputRef.current.value,
        };
        
        if (editId) {
            tenantActions.update(editId, tenant)(dispatch)            
            setEditId(null)
        } else {
            tenantActions.create(tenant)(dispatch);
        }
        cleanInputs();
    }

    const handleReset = () => {
        editId && setEditId(null);
        cleanInputs();
    }

    const handleEdit = tenant => {
        firstNameInputRef.current.value = tenant.firstname;
        lastNameInputRef.current.value = tenant.lastname;
        setEditId(tenant.id)
    }

    const handleDelete = id => {
        tenantActions.remove(id)(dispatch)
    }

    const handleFetch = () => {
        tenantActions.fetch()(dispatch)
    }

    return (
        <IonContent>
            <IonButton onClick={handleFetch} enabled={dbReady}>{'FETCH'}</IonButton>
            <TenantForm 
                onSubmit={handleSubmit} 
                onReset={handleReset} 
                editId={editId} 
                ref={{firstNameInputRef, lastNameInputRef}}
                db={dbReady} 
            />
            <TenantsList 
                tenants={state.tenants || []} 
                db={dbReady} 
                onEdit={handleEdit} 
                onDelete={handleDelete}
            />
        </IonContent>
    );
};

export default Tenants;
