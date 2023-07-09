import { create } from "zustand";

interface PlayerStore {
  ids: string[];
  activeId?: string;
  setId: (id: string) => void;
  setIds: (id: string[]) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  // Everytime you hit play, you will set a list of ids which will play in a playlist and the current clicked id will be played
  ids: [],
  activeId: undefined,
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids }),
  reset: () => set({ ids: [], activeId: undefined }),
}));

export default usePlayer;
