import { createConnection } from 'typeorm';
import { User } from './entities/User';
import tenantHandlers from './handlers/tenants';


const initDB = async() => {
    return await createConnection({
        type: "cordova",
        database: "ioreel.db",
        location: "default",
        logging: ["error", "query", "schema"],
        synchronize: true,
        entities: [User],
    }).then(conn => {
        return {
            dbReady: conn.isConnected,
            error: null,
        }
    }).catch(err => {
        return {
            dbReady: false,
            error: err,
        }
    })
}

export const api = {
    initDB,
    ...tenantHandlers,
}
