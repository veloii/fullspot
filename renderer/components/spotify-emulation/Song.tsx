import { currentlyPlayingType } from "../../pages";

function arrayToList(array: string[] | undefined) {
  if (array === undefined) return "";
  return array.join(", ").replace(/, ((?:.(?!, ))+)$/, ", $1");
}

const Song = (props: { currentlyPlaying?: currentlyPlayingType }) => {
  return (
    <div className="z-50 absolute bottom-72 w-full h-2 px-32 flex items-end gap-12">
      <img src={props.currentlyPlaying?.albumArt[1].url} className="h-48 rounded-3xl shadow-xl" />
      <div className="space-y-6">
        <div className="text-white text-6xl font-black tracking-wide filter drop-shadow-md">
          {props.currentlyPlaying?.songName}
        </div>
        <div className="text-gray-300 opacity-80 font-bold text-2xl filter drop-shadow">
          {arrayToList(props.currentlyPlaying?.artists)}
        </div>
      </div>
    </div>
  );
};

export default Song;
