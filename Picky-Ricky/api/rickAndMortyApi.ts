import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Character {
  id: number;
  name: string;
  image: string;
  episode: string[];
  // Add other properties if needed
}

interface CharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

const fetchCharacters = async (query: string): Promise<CharacterResponse> => {
  const response = await axios.get<CharacterResponse>(
    `https://rickandmortyapi.com/api/character/?name=${query}`
  );
  return response.data;
};

export const useCharacters = (query: string) => {
  return useQuery<CharacterResponse>({
    queryKey: ['characters', query],
    queryFn: () => fetchCharacters(query),
    enabled: query.length > 0,
  });
};
