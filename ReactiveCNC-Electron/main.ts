import fs from 'fs';
import path from "path";

import { app, BrowserWindow, BrowserWindowConstructorOptions, ipcMain, screen } from "electron";
import { isDev } from "./config";
import { appConfig } from "./electron-store/configuration";

let mainWindow:BrowserWindow;

async function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const appBounds: any = appConfig.get("setting.appBounds");
    const BrowserWindowOptions: BrowserWindowConstructorOptions = {
        width: 1366,
        minWidth: 1366,
        height: 768,
        minHeight: 768,
        webPreferences: {
            preload: __dirname + "/preload.js",
            devTools: isDev,
            nodeIntegration: false,
            contextIsolation: true,
        },
        show: false,
        alwaysOnTop: true,
        frame: true,
        fullscreen: false,
    };

    if (appBounds !== undefined && appBounds !== null) Object.assign(BrowserWindowOptions, appBounds);
    mainWindow = new BrowserWindow(BrowserWindowOptions);

    // Remove menu bar
    mainWindow.removeMenu();

    // and load the index.html of the app.
    // win.loadFile("index.html");
    await mainWindow.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "./index.html")}`);
 
    if (appBounds !== undefined && appBounds !== null && appBounds.width > width && appBounds.height > height) mainWindow.maximize();
    else mainWindow.show();

    // this will turn off always on top after opening the application
    setTimeout(() => {
        mainWindow.setAlwaysOnTop(false);
    }, 1000);

    // Open the DevTools.
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    ipcMain.handle('versions', () => {
        return {
            node: process.versions.chrome,
            chrome: process.versions.chrome,
            electron: process.versions.electron,
            version: app.getVersion(),
            name: app.getName(),
        };
    });
}

// Silence Intel GPU dmesg noise 
//app.commandLine.appendSwitch('ignore-gpu-blacklist');
//app.commandLine.appendSwitch('disable-gpu');
//app.commandLine.appendSwitch('disable-gpu-compositing');
//app.disableHardwareAcceleration()

app.whenReady().then(async () => {
    if (isDev) {
        try {
            const { installExt } = await import("./installDevTool");
            await installExt();
        } catch (e) {
            console.log("Can not install extension!");
        }
    }
    createWindow();
});

app.on("window-all-closed", () => {
    app.quit();
}); 
