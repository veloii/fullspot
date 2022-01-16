import {
  BiPause,
  BiPlay,
  BiShuffle,
  BiSkipNext,
  BiSkipPrevious,
} from "react-icons/bi";
import { IoIosRepeat } from "react-icons/io";
import { currentlyPlayingType } from "../../pages";

const MediaControls = (props: { currentlyPlaying?: currentlyPlayingType }) => {
  type MediaControls = "pause" | "next" | "previous";

  const handleMediaControl = (control: MediaControls) => {
    global.ipcRenderer.send("media", control);
  };

  return (
    <div className="w-full absolute top-7 left-0 h-full pointer-events-auto">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 p-16 pb-24 text-white">
        <div className="flex gap-8">
          <div className="flex justify-center items-center gap-8">
            <BiSkipPrevious
              onClick={() => handleMediaControl("previous")}
              className="text-4xl opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
          <div
            onClick={() => handleMediaControl("pause")}
            className="bg-white shadow-lg w-16 h-16 rounded-2xl text-black flex justify-center items-center hover:scale-90 transition duration-500"
          >
            {props.currentlyPlaying?.isPlaying ? (
              <BiPause className="text-5xl" />
            ) : (
              <BiPlay className="text-5xl pl-1" />
            )}
          </div>
          <div className="flex justify-center items-center gap-8">
            <BiSkipNext
              onClick={() => handleMediaControl("next")}
              className="text-4xl opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaControls;
