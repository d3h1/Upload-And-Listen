"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  // Find a way to upload mp3 song file from supabase storage
  const songUrl = useLoadSongUrl(song!);

  // We dont load player if song is not chosen
  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div
      className="
                fixed bottom-0 bg-black
                w-full py-2 h-[80px] px-4
            "
    >
      <PlayerContent
        key={songUrl} //! we are using this key here because it will allow users to skip the song (destroying the previous element before it)
        song={song}
        songUrl={songUrl}
      />
    </div>
  );
};

export default Player;
