import React from "react";
import { IonList } from "@ionic/react";
import TenantItem from "./TenantItem";
import type { Tenant } from "./types";

interface Props {
  // TODO replace with Tenant type
  tenants: Tenant[];
  // TODO replace with Tenant type && check return type
  onEdit: (tenant: Tenant) => void;
  // TODO check return type
  onDelete: (id: number) => void;
}

const TenantsList: React.VFC<Props> = ({ tenants, onEdit, onDelete }) => {
  const handleEditButtonClick = (tenant) => {
    onEdit && onEdit(tenant);
  };

  const handleDeleteButtonClick = (id) => {
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
