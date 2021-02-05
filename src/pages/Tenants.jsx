import React, { 
    useState, 
    useContext, 
    useEffect, 
    useRef 
} from "react"
import { 
    useDispatch, 
    useSelector 
} from 'react-redux'
import { 
    fetchTenants,
    createTenant,
    updateTenant,
    deleteTenant
} from '../Features/tenants/tenantsSlice'
import { DBContext } from "../XXcontext/Context"

import TenantForm from '../Features/tenants/TenantForm'
import TenantsList from '../Features/tenants/TenantsList'

import { 
    IonContent,
    IonAlert 
} from "@ionic/react"

const Tenants = () => {
    const dispatch = useDispatch()
    const tenants = useSelector(({tenants}) => tenants.list)
    const [editId, setEditId] = useState(null)

    const {dbReady, dbInitError, resetDbError} = useContext(DBContext)

    const firstNameInputRef = useRef(null)
    const lastNameInputRef = useRef(null)

    const cleanInputs = () => {        
        firstNameInputRef.current.value = '';
        lastNameInputRef.current.value = '';
    }

    useEffect(() => {
        if (dbReady) {
            dispatch(fetchTenants())
        }        
    },[dbReady, dispatch])

    const handleSubmit = () => {
        // TODO Consider new Tenant({})
        let tenant = {        
            firstname: firstNameInputRef.current.value,
            lastname: lastNameInputRef.current.value,
        }
        
        if (editId) {
            dispatch(updateTenant({ id: editId, ...tenant}))           
            setEditId(null)
        } else {
            dispatch(createTenant(tenant));
        }
        cleanInputs()
    }

    const handleReset = () => {
        editId && setEditId(null)
        cleanInputs()
    }

    const handleEdit = tenant => {
        firstNameInputRef.current.value = tenant.firstname;
        lastNameInputRef.current.value = tenant.lastname;
        setEditId(tenant.id)
    }

    const handleDelete = id => {
        dispatch(deleteTenant(id))
    }

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
                ref={{firstNameInputRef, lastNameInputRef}}
                db={dbReady} 
            />
            <TenantsList 
                tenants={tenants || []} 
                db={dbReady} 
                onEdit={handleEdit} 
                onDelete={handleDelete}
            />
        </IonContent>
    );
};

export default Tenants;
