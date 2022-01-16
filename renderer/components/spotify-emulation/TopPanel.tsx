import { currentlyPlayingType } from "../../pages";

const TopPanel = (props: {currentlyPlaying?: currentlyPlayingType}) => {
  return (
    <div className="px-10 flex justify-between">
      <div className="flex gap-5 opacity-50">
        <img src="/spotify.png" className="h-16 filter drop-shadow-xl" />
        <div className="text-white">
          <div className="uppercase tracking-widest text-lg font-medium filter drop-shadow">
            playing from {props.currentlyPlaying?.contextType}
          </div>
          <div className="font-bold text-2xl filter drop-shadow">
            {props.currentlyPlaying?.contextName}
          </div>
        </div>
      </div>
      <div className="bg-black bg-opacity-60 h-24 flex gap-6 items-center rounded-2xl shadow-xl">
        <img
          className="p-1.5 h-full rounded-2xl"
          src={props.currentlyPlaying?.albumArt[1].url}
        />

        <div className="text-white py-3 pr-9 space-y-1 pb-4">
          <div className="uppercase tracking-widest text-base">from the album</div>
          <div className="font-bold text-xl tracking-wide">
            {props.currentlyPlaying?.albumName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPanel;
