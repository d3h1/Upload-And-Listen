import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = (id: string) => {
    // Doesnt allow users to use until logged in
    if (!user) {
      return authModal.onOpen();
    }

    // Allow user to hit play
    player.setId(id);
    // Hitting play and playing any songs will create a playlist of songs
    player.setIds(songs.map((song) => song.id));
  };
  return onPlay;
};

export default useOnPlay;
