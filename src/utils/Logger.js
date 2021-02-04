/**
 *  src/utils/Logger.js
 *  Created by Gummy, 04/02/21
 * 
 *  Small utility methods for loggin purposes.
 *  For electron, logfiles can be found here :
 *      on Linux: ~/.config/{app name}/logs/{process type}.log
 *      on macOS: ~/Library/Logs/{app name}/{process type}.log
 *      on Windows: %USERPROFILE%\AppData\Roaming\{app name}\logs\{process type}.log
 */

import { getPlatforms, isPlatform } from "@ionic/react";

export const log = (...aArgs) => {
    if (isPlatform("electron")) {
        window.api.log("info", `[${getPlatforms()[0]}] - `, ...aArgs);
    } else {
        console.log(`[${getPlatforms()[0]}] - `, ...aArgs);
    }
}

export const warn = (...aArgs) => {
    if (isPlatform("electron")) {
        window.api.log("warn", `[${getPlatforms()[0]}] - `, ...aArgs);
    } else {
        console.warn(`[${getPlatforms()[0]}] - `, ...aArgs);
    }
}

export const error = (...aArgs) => {
    if (isPlatform("electron")) {
        window.api.log("error",`[${getPlatforms()[0]}] - `, ...aArgs);
    } else {
        console.error(`[${getPlatforms()[0]}] - `, ...aArgs);
    }
}

export default {log, warn, error};