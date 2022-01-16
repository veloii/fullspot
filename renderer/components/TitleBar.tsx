import MDFullscreen, { MdFullscreen } from "react-icons/md"
import { useEffect, useState } from "react";

const TitleBar = () => {
  const [maximize, setMaximize] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    global.ipcRenderer.addListener("message", (_event, args) => {
      if (args === "maximize_yes") return setMaximize(true);
      if (args === "maximize_no") return setMaximize(false);

      if (args === "full_screen_yes") return setFullScreen(true);
      if (args === "full_screen_no") return setFullScreen(false);
    });
  }, []);

  const minimizeClick = () => {
    global.ipcRenderer.send("message", "minimize");
  };

  const closeClick = () => {
    global.ipcRenderer.send("message", "close");
  };

  const maximizeClick = () => {
    global.ipcRenderer.send("message", "maximize");
  };

  const fullScreenClick = () => {
    global.ipcRenderer.send("message", "full_screen");
  };

  return (
    <div>
      <div className="absolute bottom-0 right-0 z-50 pointer-events-auto">
        <div></div>
        <div className="m-20 mx-28 bg-white bg-opacity-40 hover:bg-opacity-100 p-2 rounded-xl transition duration-500">
          <MdFullscreen
            onClick={fullScreenClick}
            className="text-3xl text-black transition"
          />
        </div>
      </div>

      {!fullScreen && (
        <div className="top-0 w-full flex justify-between items-center pl-2 drag pointer-events-auto h-8 bg-transparent"></div>
      )}
    </div>
  );
};

export default TitleBar;
