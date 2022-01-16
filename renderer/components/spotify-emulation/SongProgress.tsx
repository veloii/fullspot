import { currentlyPlayingType } from "../../pages";

const SongProgress = (props: {currentlyPlaying?: currentlyPlayingType}) => {
  return (
    <div className="z-50 absolute bottom-40 w-full h-2 px-28 flex justify-center items-center gap-3 text-gray-300">
      <div className="w-6 text-xs filter drop-shadow">{props.currentlyPlaying?.songProgress}</div>
      <div className="bg-white h-1 w-full rounded-full bg-opacity-25 shadow">
        <div
          style={{
            width: props.currentlyPlaying?.songProgressPercentage,
          }}
          className="bg-white h-full rounded-full bg-opacity-50 transition-all"
        ></div>
      </div>
      <div className="w-6 text-xs filter drop-shadow">{props.currentlyPlaying?.songDuration}</div>
    </div>
  );
};

export default SongProgress;
