import { View, Text, ScrollView, Pressable, TextInput, FlatList } from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useColors } from "@/hooks/use-colors";
import {
  searchQuran,
  getAllSurahs,
  getSurahByNumber,
  type QuranVerse,
  type Surah,
} from "@/lib/data/quran-lite";

interface QuranBrowserProps {
  onVerseSelect?: (verse: QuranVerse) => void;
}

export function QuranBrowser({ onVerseSelect }: QuranBrowserProps) {
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [searchResults, setSearchResults] = useState<QuranVerse[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  const surahs = getAllSurahs();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      const results = searchQuran(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectSurah = (surahNumber: number) => {
    const surah = getSurahByNumber(surahNumber);
    if (surah) {
      setSelectedSurah(surah);
      setShowSearch(false);
    }
  };

  if (selectedSurah) {
    return (
      <SurahView
        surah={selectedSurah}
        onBack={() => setSelectedSurah(null)}
        onVerseSelect={onVerseSelect}
      />
    );
  }

  if (showSearch && searchResults.length > 0) {
    return (
      <SearchResultsView
        results={searchResults}
        query={searchQuery}
        onBack={() => {
          setShowSearch(false);
          setSearchQuery("");
          setSearchResults([]);
        }}
        onVerseSelect={onVerseSelect}
      />
    );
  }

  return (
    <View
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: colors.surface,
      }}
    >
      {/* Search Bar */}
      <View className="p-4 border-b" style={{ borderBottomColor: colors.border }}>
        <View
          className="flex-row items-center gap-2 px-3 py-2 rounded-lg"
          style={{
            backgroundColor: colors.background,
          }}
        >
          <MaterialIcons name="search" size={20} color={colors.muted} />
          <TextInput
            placeholder="Search Quran..."
            placeholderTextColor={colors.muted}
            value={searchQuery}
            onChangeText={handleSearch}
            onFocus={() => setShowSearch(true)}
            className="flex-1 text-base"
            style={{
              color: colors.foreground,
            }}
          />
          {searchQuery.length > 0 && (
            <Pressable
              onPress={() => {
                setSearchQuery("");
                setSearchResults([]);
              }}
            >
              <MaterialIcons name="close" size={20} color={colors.muted} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Surahs List */}
      <FlatList
        data={surahs}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleSelectSurah(item.number)}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
                borderBottomColor: colors.border,
              },
            ]}
            className="flex-row items-center justify-between p-4 border-b"
          >
            <View className="flex-1">
              <Text
                className="text-base font-semibold"
                style={{
                  color: colors.foreground,
                }}
              >
                {item.number}. {item.name}
              </Text>
              <Text
                className="text-sm mt-1"
                style={{
                  color: colors.muted,
                }}
              >
                {item.nameArabic} • {item.totalVerses} verses • {item.revelation}
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={colors.muted} />
          </Pressable>
        )}
        scrollEnabled={false}
      />
    </View>
  );
}

/**
 * Surah view component
 */
interface SurahViewProps {
  surah: Surah;
  onBack: () => void;
  onVerseSelect?: (verse: QuranVerse) => void;
}

function SurahView({ surah, onBack, onVerseSelect }: SurahViewProps) {
  const colors = useColors();

  return (
    <ScrollView
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: colors.surface,
      }}
    >
      {/* Header */}
      <View className="p-4 border-b" style={{ borderBottomColor: colors.border }}>
          <Pressable
            onPress={onBack}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            className="flex-row items-center gap-2 mb-3"
          >
            <MaterialIcons name="arrow-back" size={20} color={colors.primary} />
            <Text style={{ color: colors.primary }}>Back</Text>
          </Pressable>

        <View className="items-center mt-2">
          <Text
            className="text-2xl font-bold"
            style={{
              color: colors.foreground,
            }}
          >
            {surah.name}
          </Text>
          <Text
            className="text-lg mt-1"
            style={{
              color: colors.primary,
            }}
          >
            {surah.nameArabic}
          </Text>
          <Text
            className="text-sm mt-2"
            style={{
              color: colors.muted,
            }}
          >
            {surah.nameTranslation} • {surah.totalVerses} verses • {surah.revelation}
          </Text>
        </View>
      </View>

      {/* Verses */}
      <View className="p-4">
        {surah.verses.map((verse, index) => (
          <Pressable
            key={index}
            onPress={() => onVerseSelect?.(verse)}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
                backgroundColor: colors.background,
              },
            ]}
            className="mb-6 p-4 rounded-lg"
          >
            {/* Verse Number */}
            <View className="flex-row items-center gap-2 mb-3">
              <View
                className="w-6 h-6 rounded-full items-center justify-center"
                style={{
                  backgroundColor: colors.primary,
                }}
              >
                <Text
                  className="text-xs font-bold"
                  style={{
                    color: colors.background,
                  }}
                >
                  {verse.verse}
                </Text>
              </View>
              <Text
                className="text-xs"
                style={{
                  color: colors.muted,
                }}
              >
                {surah.name} {verse.verse}
              </Text>
            </View>

            {/* Arabic Text */}
            <Text
              className="text-lg font-bold text-right mb-3 leading-relaxed"
              style={{
                color: colors.foreground,
              }}
            >
              {verse.arabic}
            </Text>

            {/* English Translation */}
            <Text
              className="text-sm leading-relaxed"
              style={{
                color: colors.muted,
              }}
            >
              {verse.english}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

/**
 * Search results view component
 */
interface SearchResultsViewProps {
  results: QuranVerse[];
  query: string;
  onBack: () => void;
  onVerseSelect?: (verse: QuranVerse) => void;
}

function SearchResultsView({
  results,
  query,
  onBack,
  onVerseSelect,
}: SearchResultsViewProps) {
  const colors = useColors();

  return (
    <ScrollView
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: colors.surface,
      }}
    >
      {/* Header */}
      <View className="p-4 border-b" style={{ borderBottomColor: colors.border }}>
        <Pressable
          onPress={onBack}
          style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          className="flex-row items-center gap-2 mb-3"
        >
          <MaterialIcons name="arrow-back" size={20} color={colors.primary} />
          <Text style={{ color: colors.primary }}>Back</Text>
        </Pressable>

        <Text
          className="text-lg font-semibold mt-2"
          style={{
            color: colors.foreground,
          }}
        >
          Search Results for "{query}"
        </Text>
        <Text
          className="text-sm mt-1"
          style={{
            color: colors.muted,
          }}
        >
          Found {results.length} verse{results.length !== 1 ? "s" : ""}
        </Text>
      </View>

      {/* Results */}
      <View className="p-4">
        {results.map((verse, index) => (
          <Pressable
            key={index}
            onPress={() => onVerseSelect?.(verse)}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
                backgroundColor: colors.background,
              },
            ]}
            className="mb-4 p-3 rounded-lg"
          >
            <Text
              className="text-xs font-semibold mb-2"
              style={{
                color: colors.primary,
              }}
            >
              Surah {verse.surah}:{verse.verse}
            </Text>
            <Text
              className="text-sm leading-relaxed"
              style={{
                color: colors.foreground,
              }}
            >
              {verse.english}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
