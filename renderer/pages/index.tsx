import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import { useCookies } from "react-cookie";
import React from "react";
import refreshToken from "../auth/refreshToken";
import TopPanel from "../components/spotify-emulation/TopPanel";
import {
  BiShuffle,
  BiSkipPrevious,
  BiPlay,
  BiSkipNext,
  BiRepeat,
  BiPause,
} from "react-icons/bi";
import { IoIosRepeat } from "react-icons/io";
import { usePalette } from "react-palette";
import Song from "../components/spotify-emulation/Song";
import SongProgress from "../components/spotify-emulation/SongProgress";
import MediaControls from "../components/spotify-emulation/MediaControls";
import Message from "../components/Message";

function format(time: number) {
  // Hours, minutes and seconds
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";
  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }
  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}

export interface currentlyPlayingType {
  songProgressPercentage: string;
  songDuration: string;
  songProgress: string;
  isPlaying: boolean;
  albumArt: { height: number; url: string }[];
  songName: string;
  artists: string[];
  contextName: string;
  contextType: string;
  albumName: string;
}

const Home = () => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  const [colours, setColours] = useState();

  const [currentlyPlaying, setCurrentlyPlaying] =
    React.useState<currentlyPlayingType>();

  const fetchSpotify = async () => {
    let apiData;
    try {
      apiData = await (
        await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
          headers: {
            Authorization: "Bearer " + cookies.auth.access_token,
          },
        })
      ).json();
    } catch {
      // not playing any songs
      return;
    }

    if (apiData?.error) {
      const tokens = await refreshToken(cookies.auth.refresh_token);
      if (tokens === false) return router.push("/howaboutwelogin.html");
      if (tokens === null)
        return console.log("We have no idea what went wrong. :(");

      setCookie("auth", tokens);
      fetchSpotify();
      return;
    }

    if (apiData?.currently_playing_type !== "track") return;

    let context;

    if (apiData?.context) {
      context = await (
        await fetch(apiData?.context?.href, {
          headers: {
            Authorization: "Bearer " + cookies.auth.access_token,
          },
        })
      ).json();
    } else {
      context = { name: "Liked Songs", type: "playlist" };
    }
    const song = apiData.item;

    const songDuration = format(Math.round(song.duration_ms / 1000));
    const songProgress = format(Math.round(apiData.progress_ms / 1000));
    const songDurationProgress = format(
      Math.round(song.duration_ms - apiData.progress_ms / 1000)
    );

    const songDurationProgressPercentage =
      (apiData.progress_ms / song.duration_ms) * 100 + "%";

    setCurrentlyPlaying({
      songProgressPercentage: songDurationProgressPercentage,
      songDuration: songDuration,
      songProgress: songProgress,
      albumArt: song?.album?.images,
      isPlaying: apiData.is_playing,
      songName: song?.name,
      artists: song?.artists.map((artist: { name: any }) => artist.name),
      contextName: context?.name,
      contextType: context?.type,
      albumName: song?.album?.name,
    });
  };

  useEffect(() => {
    if (cookies.auth?.access_token) {
      const interval = setInterval(fetchSpotify, 250);

      return () => {
        clearInterval(interval);
      };
    }
    return () => {};
  }, []);

  const { data, loading, error } = usePalette(
    currentlyPlaying?.albumArt[0].url || ""
  );

  useEffect(() => {
    if (!cookies.auth?.access_token) {
      router.push("/howaboutwelogin.html");
    }

    return () => {};
  });

  useEffect(() => {
    alert("We have updated!");
  }, []);

  return (
    <>
      <div
        className="absolute top-0 h-screen w-screen transition-all hidden lg:block"
        style={{
          background: `linear-gradient(180deg, ${data.lightVibrant} 0%, ${data.darkVibrant} 100%)`,
        }}
      >
        <Song currentlyPlaying={currentlyPlaying} />
        <SongProgress currentlyPlaying={currentlyPlaying} />

        <div className="p-16">
          <TopPanel currentlyPlaying={currentlyPlaying} />
          <MediaControls currentlyPlaying={currentlyPlaying} />
        </div>
      </div>
      <div className="block lg:hidden">
        <Message
          msg="This application can not be used unless full-screened or if it meets the adequate view-port size."
          title="Please Fullscreen"
        />
      </div>
    </>
  );
};

export default Home;
