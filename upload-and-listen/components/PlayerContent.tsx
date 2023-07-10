"use client";

import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import useSound from "use-sound";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  // TODO: need to make it dynamic
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    // If our song is the last one in the array, you want to reset the array of songs to play the next song
    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrev = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const prevSong = player.ids[currentIndex - 1];

    // If our song is the first one in the array, you want to reset the array of songs to play the prev song
    if (!prevSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(prevSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"], // this will allow us to hear the song
  });

  // Automatically play a song when the player is called on
  useEffect(() => {
    sound?.play();

    return () => {
        sound?.unload();
    }
  }, [sound]);

  const handlePlay = () => {
    if(!isPlaying) {
        play();
    }
    else {
        pause();
    }
  }

  const toggleMute = () => {
    if (volume === 0) {
        setVolume(1);
    }
    else {
        setVolume(0)
    }
  }

  return (
    // This is gonna be the controls of playing and controlling songs
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      {/* Mobile View Icon*/}
      <div
        className="
                flex md:hidden col-auto
                    w-full justify-end items-center
                    "
      >
        <div
          onClick={handlePlay}
          className="
                    h-10 w-10 flex
                    items-center justify-center
                    rounded-full bg-white p-1
                    cursor-pointer
                    "
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>
      {/* Desktop View Icon */}
      <div
        className="
                hidden h-full md:flex
                justify-center items-center
                w-full max-w-[722px]
                gap-x-6
            "
      >
        <AiFillStepBackward
          size={30}
          className="
                text-neutral-400 cursor-pointer
                hover:text-white transition
            "
          onClick={onPlayPrev}
        />
        <div
          onClick={handlePlay}
          className="
                flex items-center justify-center
                h-10 w-10 rounded-full bg-white
                p-1 cursor-pointer
            "
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          size={30}
          className="
                text-neutral-400 cursor-pointer
                hover:text-white transition
            "
          onClick={onPlayNext}
        />
      </div>
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon size={34} onClick={toggleMute} className="cursor-pointer" />
          <Slider 
            value={volume}
            onChange={(value) => setVolume(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
