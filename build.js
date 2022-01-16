var electronInstaller = require("electron-winstaller");

resultPromise = electronInstaller.createWindowsInstaller({
  appDirectory: "./release/package/Fullspot-win32-x64",
  outputDirectory: "./release/installer",
  authors: "zelr",
  exe: "Fullspot.exe",
  loadingGif: "./resources/animation.gif",
  setupIcon: "./resources/Icon.ico",
  iconUrl: "http://cdn.zelr.me/download/fullspot/Icon.ico",
});

resultPromise.then(
  () => console.log("It worked!"),
  (e) => console.log(`Not today: ${e}`)
);
