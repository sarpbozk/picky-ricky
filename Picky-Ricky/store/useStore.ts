import { create } from 'zustand';

export interface Character {
  id: number;
  name: string;
  image: string;
  episode: string[];
}

interface StoreState {
  selectedCharacters: Character[];
  addCharacter: (character: Character) => void;
  removeCharacter: (id: number) => void;
}

export const useStore = create<StoreState>((set) => ({
  selectedCharacters: [],
  addCharacter: (character: Character) =>
    set((state) => ({
      selectedCharacters: [...state.selectedCharacters, character],
    })),
  removeCharacter: (id: number) =>
    set((state) => ({
      selectedCharacters: state.selectedCharacters.filter((char) => char.id !== id),
    })),
}));
