import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";

// This is how we are gonna grab the song from our storage of songs
const useLoadSongUrl = (song: Song) => {
    // Keeps the page authenicated when playing 
  const { supabaseClient } = useSessionContext();

  if (!song) {
    return "";
  }
  // Getting song from supbase client
  const { data: songData } = supabaseClient.storage
    .from("songs")
    .getPublicUrl(song.song_path);

  return songData.publicUrl;
};

export default useLoadSongUrl;
