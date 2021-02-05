import React from 'react'
import { IonList } from "@ionic/react"
import Tenant from './Tenant'

const TenantsList = ({ tenants, onEdit, onDelete }) => {
    const handleEditButtonClick = tenant => {
        onEdit && onEdit(tenant)
    }

    const handleDeleteButtonClick = id => {
        onDelete && onDelete(id)
    }

    return (
        <IonList>
            {tenants.length > 0 && tenants.map((tenant) => (
                <Tenant 
                    tenant={tenant}
                    onEditBtnClick={handleEditButtonClick} 
                    onDeleteBtnClick={handleDeleteButtonClick}
                />
            ))}
        </IonList>
    )
}

export default TenantsList
