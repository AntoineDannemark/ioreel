import React , { useState, useContext, useEffect, useRef } from "react";
import { DispatchContext, StateContext, DBContext } from "../context/Context";
import { actions as tenantActions } from '../store/tenants';
import { IonContent } from "@ionic/react";
import TenantForm from '../components/TenantForm';
import TenantsList from '../components/TenantsList';

const Tenants = () => {
    const [editId, setEditId] = useState(null);
    
    const state = useContext(StateContext);    
    const connect = {
        dispatch: useContext(DispatchContext),
        db: useContext(DBContext),
    };

    const firstNameInputRef = useRef(null);
    const lastNameInputRef = useRef(null);

    const cleanInputs = () => {        
        firstNameInputRef.current.value = '';
        lastNameInputRef.current.value = '';
    }

    useEffect(() => {
        connect.db && !state.tenants.length && tenantActions.fetch()(connect)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[connect.db]);

    const handleSubmit = () => {
        let tenant = {        
            firstname: firstNameInputRef.current.value,
            lastname: lastNameInputRef.current.value,
            editId,
        };
        
        if (editId) {
            tenantActions.update(tenant)(connect)            
            setEditId(null)
        } else {
            tenantActions.create(tenant)(connect);
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
        tenantActions.remove(id)(connect)
    }

    return (
        <IonContent>
            <TenantForm 
                onSubmit={handleSubmit} 
                onReset={handleReset} 
                editId={editId} 
                ref={{firstNameInputRef, lastNameInputRef}}
                db={connect.db} 
            />
            <TenantsList 
                tenants={state.tenants} 
                db={connect.db} 
                onEdit={handleEdit} 
                onDelete={handleDelete}
            />
        </IonContent>
    );
};

export default Tenants;
