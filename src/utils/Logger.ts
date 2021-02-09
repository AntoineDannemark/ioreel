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

export const log = (text: string) => {
    if (isPlatform("electron")) {
        window.api.log && window.api.log({type: "info", message: `[${getPlatforms()[0]}] - ${text}`});
    } else {
        console.log(`[${getPlatforms()[0]}] - ${text}`);
    }
}

export const warn = (text: string) => {
    if (isPlatform("electron")) {
        window.api.log && window.api.log({type: "warn", message: `[${getPlatforms()[0]}] - ${text}`});
    } else {
        console.warn(`[${getPlatforms()[0]}] - ${text}`);
    }
}

export const error = (text: string) => {
    if (isPlatform("electron")) {
        window.api.log && window.api.log({type: "error", message: `[${getPlatforms()[0]}] - ${text}`});
    } else {
        console.error(`[${getPlatforms()[0]}] - ${text}`);
    }
}

export default {log, warn, error};