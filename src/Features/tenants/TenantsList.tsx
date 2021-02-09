import React from "react";
import { IonList } from "@ionic/react";
import TenantItem from "./TenantItem";
import type { Tenant } from "./types";

interface Props {
  tenants: Tenant[];
  onEdit: (tenant: Tenant) => void;
  onDelete: (id: number) => void;
}

const TenantsList: React.FC<Props> = ({ tenants, onEdit, onDelete }) => {
  const handleEditButtonClick = (tenant: Tenant) => {
    onEdit && onEdit(tenant);
  };

  const handleDeleteButtonClick = (id: number) => {
    onDelete && onDelete(id);
  };

  return (
    <IonList>
      {tenants.length > 0 &&
        tenants.map((tenant) => (
          <TenantItem
            tenant={tenant}
            onEditBtnClick={handleEditButtonClick}
            onDeleteBtnClick={handleDeleteButtonClick}
          />
        ))}
    </IonList>
  );
};

export default TenantsList;
