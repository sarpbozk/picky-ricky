import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { useCharacters } from "../api/rickAndMortyApi";
import { useStore } from "../store/useStore";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface Character {
  id: number;
  name: string;
  image: string;
  episode: string[];
}

export const MultiSelectAutocomplete: React.FC = () => {
  const [query, setQuery] = useState("");
  const { data, isLoading, isError } = useCharacters(query);
  const { selectedCharacters, addCharacter, removeCharacter } = useStore();

  const handleSelect = (character: Character) => {
    addCharacter(character);
  };

  const handleRemove = (id: number) => {
    removeCharacter(id);
  };

  const renderSearchItem = ({ item }: { item: Character }) => {
    const regex = query ? new RegExp(`(${query})`, "gi") : null;
    let nameParts;
    if (regex) {
      nameParts = item.name.split(regex);
    } else {
      nameParts = [item.name];
    }

    const isSelected = selectedCharacters.some((char) => char.id === item.id);

    return (
      <StyledTouchableOpacity
        onPress={() => handleSelect(item)}
        disabled={isSelected}
        className={`p-2 flex-row items-center border-b border-gray-200 ${
          isSelected ? "opacity-50" : ""
        }`}
      >
        <StyledImage
          source={{ uri: item.image }}
          className="w-12 h-12 rounded-full mr-3"
        />
        <StyledView className="flex-1">
          <StyledText className="text-lg font-semibold text-gray-800">
            {nameParts.map((part, index) =>
              regex && regex.test(part) ? (
                <StyledText key={index} className="font-bold text-blue-600">
                  {part}
                </StyledText>
              ) : (
                <StyledText key={index}>{part}</StyledText>
              )
            )}
          </StyledText>
          <StyledText className="text-sm text-gray-500">
            Episodes: {item.episode.length}
          </StyledText>
        </StyledView>
      </StyledTouchableOpacity>
    );
  };

  const renderSelectedItem = ({ item }: { item: Character }) => {
    return (
      <StyledView className="flex-1 p-2">
        <StyledView className="bg-white rounded-md overflow-hidden shadow-md">
          <StyledImage
            source={{ uri: item.image }}
            className="w-full h-40"
            resizeMode="cover"
          />
          <StyledView className="p-2">
            <StyledText className="text-base text-center text-gray-800">
              {item.name}
            </StyledText>
            <StyledTouchableOpacity
              onPress={() => handleRemove(item.id)}
              className="mt-2 bg-red-500 py-1 rounded-md"
            >
              <StyledText className="text-white text-center">Remove</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledView>
    );
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <StyledView className="p-4">
        <StyledTextInput
          placeholder="Search characters"
          value={query}
          onChangeText={setQuery}
          className="border border-gray-300 p-3 rounded-md shadow-sm mb-4 text-base"
        />

        {isLoading && <StyledText>Loading...</StyledText>}
        {isError && <StyledText>Error fetching data.</StyledText>}

        {data && (
          <FlatList
            data={data.results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderSearchItem}
            scrollEnabled={false}
          />
        )}

        <StyledView className="mt-6">
          <StyledText className="font-bold text-xl mb-3">
            Selected Characters:
          </StyledText>
          {selectedCharacters.length === 0 ? (
            <StyledText className="text-gray-500">
              No characters selected.
            </StyledText>
          ) : (
            <FlatList
              data={selectedCharacters}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              renderItem={renderSelectedItem}
              scrollEnabled={false}
            />
          )}
        </StyledView>
      </StyledView>
    </ScrollView>
  );
};
