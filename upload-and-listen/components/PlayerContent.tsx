"use client"

import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl
}) => {
    // TODO: need to make it dynamic
    const Icon = true ? BsPauseFill : BsPlayFill

    return ( 
        // This is gonna be the controls of playing and controlling songs
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song}/>
                    <LikeButton songId={song.id}/>
                </div>
            </div>
            {/* Mobile View */}
            <div
                className="
                    flex md:hidden col-auto
                    w-full justify-end items-center
                "
            >
                <div 
                    onClick={() => {}}
                    className="
                        h-10 w-10 flex
                        items-center justify-center
                        rounded-full bg-white p-1
                        cursor-pointer
                    "
                >
                    <Icon size={30} className="text-black"/>
                </div>
            </div>
        </div>
     );
}
 
export default PlayerContent;