import { getConnection } from 'typeorm';
import { Tenant } from '../entities/Tenant';

const fetchTenants = async() => {
    return await getConnection()
        .createQueryBuilder()
        .select("*")
        .from(Tenant)
        .execute()
}

const createTenant = async(tenant) => {
    return await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Tenant)
        .values(tenant)
        .execute()
};

const removeTenant = async(id) => {
    return await getConnection()
        .createQueryBuilder()
        .softDelete()
        .delete()
        .from(Tenant)
        .where("id = :id", { id })
        .execute();
};

export default {
    fetchTenants,
    createTenant,
    removeTenant,
}