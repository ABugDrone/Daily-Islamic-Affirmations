import { ScrollView, View, Pressable, Text } from "react-native";
import { useState, useMemo } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { DuaCard } from "@/components/dua-card";
import { MaterialIcons } from "@expo/vector-icons";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";
import { duas, getDuasByCategory, type DuaCategory, type Dua } from "@/lib/data/duas";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

type FilterCategory = DuaCategory | "all";

export default function FavoritesScreen() {
  const colors = useColors();
  const [bookmarkedDuas, setBookmarkedDuas] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>("all");

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

  // Get bookmarked duas and filter
  const filteredDuas = useMemo(() => {
    let results = duas.filter((dua) => bookmarkedDuas.includes(dua.id));

    if (selectedFilter !== "all") {
      results = results.filter((dua) => dua.category === selectedFilter);
    }

    return results;
  }, [bookmarkedDuas, selectedFilter]);

  const handleBookmarkDua = async (duaId: string) => {
    try {
      const updated = bookmarkedDuas.filter((id) => id !== duaId);
      setBookmarkedDuas(updated);
      await AsyncStorage.setItem("bookmarkedDuas", JSON.stringify(updated));
    } catch (error) {
      console.error("Error removing bookmark:", error);
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
        {/* Header */}
        <View className="flex-row justify-between items-center mb-4">
          <Text
            className="text-2xl font-bold"
            style={{
              color: colors.foreground,
            }}
          >
            My Favorites
          </Text>
          <Text
            className="text-lg font-semibold"
            style={{
              color: colors.primary,
            }}
          >
            {bookmarkedDuas.length}
          </Text>
        </View>
      </View>

      {/* Filter Tabs */}
      {bookmarkedDuas.length > 0 && (
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
      )}

      {/* Favorites List */}
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
                isBookmarked={true}
                showFullContent={false}
              />
            </View>
          ))
        ) : (
          <View className="items-center justify-center py-12">
            <MaterialIcons name="bookmark-outline" size={48} color={colors.muted} />
            <Text
              className="text-lg font-semibold mt-4 text-center"
              style={{
                color: colors.foreground,
              }}
            >
              No favorites yet
            </Text>
            <Text
              className="text-sm text-center mt-2"
              style={{
                color: colors.muted,
              }}
            >
              Bookmark duas to save them for later
            </Text>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
