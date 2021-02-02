import React , { useState, useContext, useEffect, useRef } from "react";
import { DBContext, DispatchContext, StateContext } from "../context/Context";
import { actions as peopleActions } from '../store/people';
import { IonContent } from "@ionic/react";
import PeopleForm from '../components/PeopleForm';
import PeopleList from '../components/PeopleList';

const People = () => {
    const [editId, setEditId] = useState(null);
    
    const state = useContext(StateContext);    
    const dispatch = useContext(DispatchContext);
    const dbReady = useContext(DBContext);

    const firstNameInputRef = useRef(null);
    const lastNameInputRef = useRef(null);
    const birthPlaceInputRef = useRef(null);

    const cleanInputs = () => {        
        firstNameInputRef.current.value = '';
        lastNameInputRef.current.value = '';
    }

    useEffect(() => {
        if (dbReady && !state.people.length) {
            peopleActions.fetch()(dispatch)
        }        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dbReady]);

    const handleSubmit = () => {
        let people = {        
            firstname: firstNameInputRef.current.value,
            lastname: lastNameInputRef.current.value,
            birthPlace: birthPlaceInputRef.current.value,
        };
        
        if (editId) {
            peopleActions.update(editId, people)(dispatch)            
            setEditId(null)
        } else {
            peopleActions.create(people)(dispatch);
        }
        cleanInputs();
    }

    const handleReset = () => {
        editId && setEditId(null);
        cleanInputs();
    }

    const handleEdit = people => {
        firstNameInputRef.current.value = people.firstname;
        lastNameInputRef.current.value = people.lastname;
        setEditId(people.id)
    }

    const handleDelete = id => {
        peopleActions.remove(id)(dispatch)
    }

    return (
        <IonContent>
            <PeopleForm 
                onSubmit={handleSubmit} 
                onReset={handleReset} 
                editId={editId} 
                ref={{firstNameInputRef, lastNameInputRef}}
                db={dbReady} 
            />
            <PeopleList 
                people={state.people || []} 
                db={dbReady} 
                onEdit={handleEdit} 
                onDelete={handleDelete}
            />
        </IonContent>
    );
};

export default People;
