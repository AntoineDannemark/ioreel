import { getConnection } from 'typeorm';
import { User } from '../entities/User';

const fetchTenants = async() => {
    return await getConnection()
        .createQueryBuilder()
        .select("*")
        .from(User)
        .execute()
}

const createTenant = async(tenant) => {
    return await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(tenant)
        .execute()
};

const removeTenant = async(id) => {
    return await getConnection()
        .createQueryBuilder()
        .softDelete()
        .delete()
        .from(User)
        .where("id = :id", { id })
        .execute();
};

export default {
    fetchTenants,
    createTenant,
    removeTenant,
}