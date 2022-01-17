// Native
import path, { join } from "path";
import ChildProcess from "child_process";

// Packages
import {
  BrowserWindow,
  app,
  ipcMain,
  IpcMainEvent,
  shell,
  autoUpdater,
  dialog,
} from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";
import express from "express";
import util from "util";
import { keyboard, Key } from "@nut-tree/nut-js";

const startAutoUpdater = (squirrelUrl: string) => {
  // The Squirrel application will watch the provided URL
  autoUpdater.setFeedURL({ url: `http://${squirrelUrl}/` });

  // Display a success message on successful update
  autoUpdater.addListener(
    "update-downloaded",
    (_event, _releaseNotes, releaseName) => {
      dialog.showMessageBox({
        message: `The release ${releaseName} has been downloaded`,
      });
    }
  );

  // Display an error message on update error
  autoUpdater.addListener("error", (error) => {
    dialog.showMessageBox({ message: "Auto updater error: " + error });
  });

  // tell squirrel to check for updates
  autoUpdater.checkForUpdates();
};

// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
}

function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    return false;
  }

  const appFolder = path.resolve(process.execPath, "..");
  const rootAtomFolder = path.resolve(appFolder, "..");
  const updateDotExe = path.resolve(path.join(rootAtomFolder, "Update.exe"));
  const exeName = path.basename(process.execPath);

  const spawn = function (command: any, args: any[]) {
    let spawnedProcess;

    try {
      spawnedProcess = ChildProcess.spawn(command, args, { detached: true });
    } catch (error) {}

    return spawnedProcess;
  };

  const spawnUpdate = function (args: any[]) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case "--squirrel-install":
    case "--squirrel-updated":
      // Optionally do things such as:
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Install desktop and start menu shortcuts
      spawnUpdate(["--createShortcut", exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case "--squirrel-uninstall":
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Remove desktop and start menu shortcuts
      spawnUpdate(["--removeShortcut", exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case "--squirrel-obsolete":
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated

      app.quit();
      return true;
  }
}

let mainWindow: BrowserWindow;

const authApp = express();

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  if (!isDev)
    startAutoUpdater("cdn.zelr.me/download/fullspot");

  await prepareNext("./renderer");

  authApp.use(express.static(join(__dirname, "../renderer/out")));

  authApp.listen(7536);

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 800,
    minWidth: 600,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#000000",
      symbolColor: "#ffffff",
    },
    frame: false,
    icon: join(__dirname, "../resources/win.png"),
    title: "Fullspot",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      partition: "persist:infragistics",
      preload: join(__dirname, "preload.js"),
    },
  });

  mainWindow.setIcon(join(__dirname, "../resources/win.png"),)

  const url = isDev
    ? "http://localhost:7536/index.html"
    : "http://localhost:7536/index.html";

  mainWindow.loadURL(url);

  mainWindow.on("maximize", () =>
    mainWindow?.webContents.send("message", "maximize_yes")
  );

  mainWindow.on("unmaximize", () =>
    mainWindow.webContents?.send("message", "maximize_no")
  );

  mainWindow.on("enter-full-screen", () => {
    mainWindow.webContents?.send("message", "full_screen_yes");
  });

  mainWindow.on("leave-full-screen", () => {
    mainWindow.webContents?.send("message", "full_screen_no");
  });

  let cookies = mainWindow.webContents.session.cookies;

  cookies.on("changed", function (_event, cookie, _cause, removed) {
    if (cookie.session && !removed) {
      let url = util.format(
        "%s://%s%s",
        !cookie.httpOnly && cookie.secure ? "https" : "http",
        cookie.domain,
        cookie.path
      );
      cookies.set({
        url: url,
        name: cookie.name,
        value: cookie.value,
        domain: cookie.domain,
        path: cookie.path,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        expirationDate: new Date().setDate(new Date().getDate() + 14),
      });
    }
  });
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", async (_event: IpcMainEvent, message: any) => {
  if (message === "close") {
    mainWindow.close();
  }
  if (message === "maximize") {
    if (mainWindow.isMaximized() === true) return mainWindow.unmaximize();
    if (mainWindow.isMaximized() === false) return mainWindow.maximize();
  }
  if (message === "minimize") mainWindow.minimize();

  if (message === "full_screen") {
    if (mainWindow.isFullScreen() === true)
      return mainWindow.setFullScreen(false);

    if (mainWindow.isFullScreen() === false)
      return mainWindow.setFullScreen(true);
  }
});

ipcMain.on("media", async (_event: IpcMainEvent, message: any) => {
  if (message === "pause") await keyboard.pressKey(Key.AudioPause);
  if (message === "next") await keyboard.pressKey(Key.AudioNext);
  if (message === "previous") await keyboard.pressKey(Key.AudioPrev);
});

ipcMain.on("start_browser", (_event, message: any) => {
  return shell.openExternal(message);
});
