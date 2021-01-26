import { app, ipcMain } from "electron";
import { createCapacitorElectronApp } from "@capacitor-community/electron";
const sqlite3 = require('sqlite3').verbose();

// The MainWindow object can be accessed via myCapacitorApp.getMainWindow()
const myCapacitorApp = createCapacitorElectronApp();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some Electron APIs can only be used after this event occurs.
app.on("ready", () => {
    console.log('[ON READY] - CAPACITOR APP INIT')
    myCapacitorApp.init();

    let mainWindow = myCapacitorApp.getMainWindow();
    

    ipcMain.on("mainWindowLoaded", function () {
        console.log('[IPC MAIN] - RECEIVED MAIN WINDOW LOADED')
        mainWindow.webContents.send("test", "coucou de main process");
    });


});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    if (db && db.close) {
        db.close();
    }
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (myCapacitorApp.getMainWindow().isDestroyed()) myCapacitorApp.init();
});

// Define any IPC or other custom functionality below here
let db;

ipcMain.on("init-db", (event, arg) => {
    try {
        db = new sqlite3.Database('ioreel.db', (err) => {
            if (err) {
                return event.reply("init-db-error", err)
            } else {
                db.run("create table if not exists users (id integer primary key autoincrement, firstname VARCHAR(32), lastname VARCHAR(32))",[]);
                event.reply("init-db-ok")
            }
        });        
    } catch(err) {
        event.reply("init-db-error", err)
    }
})

ipcMain.handle("query", async(event, arg) => {
    console.log(arg);
    const result = new Promise(function(resolve, reject) {
        try {
            db[arg.type](arg.query, arg.params, function(error, rows) {
                if (error) {
                    resolve ({
                        data: {},
                        error,
                    });
                } else if(rows) {
                    resolve({
                        data: rows,
                        error: null
                    })
                } else {
                    resolve ({
                        data: {...this},
                        error: null,
                    })
                }
            })
        } catch(err) {
            reject(err);
        }
    })
    return result;
})