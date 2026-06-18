import { ScrollView, View, TextInput, Pressable, Text, FlatList } from "react-native";
import { useState, useMemo } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { DuaCard } from "@/components/dua-card";
import { MaterialIcons } from "@expo/vector-icons";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";
import { duas, searchDuas, getDuasByCategory, type DuaCategory, type Dua } from "@/lib/data/duas";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

type FilterCategory = DuaCategory | "all";

export default function SearchScreen() {
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>("all");
  const [bookmarkedDuas, setBookmarkedDuas] = useState<string[]>([]);

  // Load bookmarked duas when screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadBookmarks = async () => {
        try {
          const bookmarked = await AsyncStorage.getItem("bookmarkedDuas");
          if (bookmarked) {
            setBookmarkedDuas(JSON.parse(bookmarked));
          }
        } catch (error) {
          console.error("Error loading bookmarks:", error);
        }
      };
      loadBookmarks();
    }, [])
  );

  // Search and filter duas
  const filteredDuas = useMemo(() => {
    let results: Dua[] = [];

    if (searchQuery.trim()) {
      results = searchDuas(searchQuery);
    } else {
      results = duas;
    }

    if (selectedFilter !== "all") {
      results = results.filter((dua) => dua.category === selectedFilter);
    }

    return results;
  }, [searchQuery, selectedFilter]);

  const handleBookmarkDua = async (duaId: string) => {
    try {
      const updated = bookmarkedDuas.includes(duaId)
        ? bookmarkedDuas.filter((id) => id !== duaId)
        : [...bookmarkedDuas, duaId];

      setBookmarkedDuas(updated);
      await AsyncStorage.setItem("bookmarkedDuas", JSON.stringify(updated));
    } catch (error) {
      console.error("Error bookmarking dua:", error);
    }
  };

  const handleShareDua = (dua: Dua) => {
    // Share functionality would be implemented here
  };

  const filters: Array<{ label: string; value: FilterCategory }> = [
    { label: "All", value: "all" },
    { label: "Anxiety", value: "anxiety" },
    { label: "Wealth", value: "wealth" },
    { label: "Protection", value: "protection" },
    { label: "Gratitude", value: "gratitude" },
    { label: "Sleep", value: "sleep" },
  ];

  return (
    <ScreenContainer className="p-0">
      <View className="px-6 pt-6 pb-4">
        {/* Search Header */}
        <Text
          className="text-2xl font-bold mb-4"
          style={{
            color: colors.foreground,
          }}
        >
          Search Duas
        </Text>

        {/* Search Input */}
        <View
          className={cn(
            "flex-row items-center rounded-lg px-4 py-3 border",
            "bg-surface border-border"
          )}
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
          }}
        >
          <MaterialIcons name="search" size={20} color={colors.muted} />
          <TextInput
            placeholder="Search by topic, verse, keyword..."
            placeholderTextColor={colors.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-3 text-base"
            style={{
              color: colors.foreground,
            }}
          />
          {searchQuery && (
            <Pressable onPress={() => setSearchQuery("")}>
              <MaterialIcons name="close" size={20} color={colors.muted} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-6 pb-4"
        contentContainerStyle={{ gap: 8 }}
      >
        {filters.map((filter) => (
          <Pressable
            key={filter.value}
            onPress={() => setSelectedFilter(filter.value)}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
                backgroundColor:
                  selectedFilter === filter.value ? colors.primary : colors.surface,
                borderColor:
                  selectedFilter === filter.value ? colors.primary : colors.border,
                borderWidth: 1,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
              },
            ]}
          >
            <Text
              className="text-sm font-semibold"
              style={{
                color:
                  selectedFilter === filter.value ? colors.background : colors.foreground,
              }}
            >
              {filter.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Results */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 px-6"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {filteredDuas.length > 0 ? (
          filteredDuas.map((dua) => (
            <View key={dua.id}>
              <DuaCard
                dua={dua}
                onBookmark={handleBookmarkDua}
                onShare={handleShareDua}
                isBookmarked={bookmarkedDuas.includes(dua.id)}
                showFullContent={false}
              />
            </View>
          ))
        ) : (
          <View className="items-center justify-center py-12">
            <MaterialIcons name="search-off" size={48} color={colors.muted} />
            <Text
              className="text-lg font-semibold mt-4 text-center"
              style={{
                color: colors.foreground,
              }}
            >
              No results found
            </Text>
            <Text
              className="text-sm text-center mt-2"
              style={{
                color: colors.muted,
              }}
            >
              Try searching with different keywords or select a category
            </Text>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
