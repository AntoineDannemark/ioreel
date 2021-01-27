import { app, ipcMain } from "electron";
import { createCapacitorElectronApp } from "@capacitor-community/electron";

import { createConnection, getConnection } from 'typeorm';
const User = require('./typeorm/entities/User');

// Enable contextIsolation for security, the API will be exposed through the preloader script
// See https://www.electronjs.org/docs/tutorial/context-isolation
const capacitorAppOptions = {
    mainWindow: {
        windowOptions: {
            webPreferences: {
                contextIsolation: true,
            }
        }
    }
}

// The MainWindow object can be accessed via myCapacitorApp.getMainWindow()
const myCapacitorApp = createCapacitorElectronApp(capacitorAppOptions);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some Electron APIs can only be used after this event occurs.
app.on("ready", () => {
    myCapacitorApp.init();
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (myCapacitorApp.getMainWindow().isDestroyed()) myCapacitorApp.init();
});

// Define any IPC or other custom functionality below here
ipcMain.handle("init-db", async function(event, arg) {
   return await createConnection({
        type: "sqlite",
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
});     

ipcMain.handle('create-tenant', async(event, tenant) => {
    return await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(tenant)
        .execute()
});

ipcMain.handle('fetch-tenants', async() => {
    return await getConnection()
        .createQueryBuilder()
        .select("*")
        .from(User)
        .execute()
})

ipcMain.handle('remove-tenant', async(event, id) => {
    return await getConnection()
        .createQueryBuilder()
        .softDelete()
        .from(User)
        .where("id = :id", { id })
        .execute();
})

ipcMain.handle("query", async(event, arg) => {
    return true;
    // console.log(arg);
    // const result = new Promise(function(resolve, reject) {
    //     try {
    //         db[arg.type](arg.query, arg.params, function(error, rows) {
    //             if (error) {
    //                 resolve ({
    //                     data: {},
    //                     error,
    //                 });
    //             } else if(rows) {
    //                 resolve({
    //                     data: rows,
    //                     error: null
    //                 })
    //             } else {
    //                 resolve ({
    //                     data: {...this},
    //                     error: null,
    //                 })
    //             }
    //         })
    //     } catch(err) {
    //         reject(err);
    //     }
    // })
    // return result;
})