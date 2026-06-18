import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";
import type { Dua } from "@/lib/data/duas";

interface DuaCardProps {
  dua: Dua;
  onPress?: () => void;
  onBookmark?: (duaId: string) => void;
  onShare?: (dua: Dua) => void;
  isBookmarked?: boolean;
  showFullContent?: boolean;
}

export function DuaCard({
  dua,
  onPress,
  onBookmark,
  onShare,
  isBookmarked = false,
  showFullContent = false,
}: DuaCardProps) {
  const colors = useColors();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      className="mb-4"
    >
      <View
        className={cn(
          "rounded-2xl p-6 border",
          "bg-surface border-border"
        )}
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }}
      >
        {/* Header with Bookmark Icon */}
        <View className="flex-row justify-between items-start mb-4">
          <View className="flex-1" />
          <Pressable
            onPress={() => onBookmark?.(dua.id)}
            style={({ pressed }) => [
              {
                transform: [{ scale: pressed ? 0.9 : 1 }],
              },
            ]}
            className="p-2"
          >
            <MaterialIcons
              name={isBookmarked ? "bookmark" : "bookmark-outline"}
              size={24}
              color={isBookmarked ? colors.primary : colors.muted}
            />
          </Pressable>
        </View>

        {/* Arabic Text */}
        <Text
          className="text-2xl font-bold text-center mb-4 leading-relaxed"
          style={{
            color: colors.foreground,
            fontFamily: "Uthmani",
          }}
        >
          {dua.arabic}
        </Text>

        {/* Transliteration */}
        <Text
          className="text-base text-center mb-3 italic"
          style={{
            color: colors.muted,
          }}
        >
          {dua.transliteration}
        </Text>

        {/* English Translation */}
        <Text
          className="text-base text-center mb-4 leading-relaxed"
          style={{
            color: colors.foreground,
          }}
        >
          {dua.english}
        </Text>

        {/* Commentary */}
        {showFullContent && (
          <>
            <View
              className="h-px my-4"
              style={{
                backgroundColor: colors.border,
              }}
            />
            <Text
              className="text-sm mb-3 leading-relaxed"
              style={{
                color: colors.muted,
              }}
            >
              {dua.commentary}
            </Text>

            {/* Source Reference */}
            <Text
              className="text-xs font-semibold mt-2"
              style={{
                color: colors.primary,
              }}
            >
              Source: {dua.source}
            </Text>
          </>
        )}

        {/* Action Buttons */}
        {showFullContent && (
          <View className="flex-row gap-3 mt-6 pt-4 border-t" style={{ borderTopColor: colors.border }}>
            <Pressable
              onPress={() => onShare?.(dua)}
              style={({ pressed }) => [
                {
                  flex: 1,
                  opacity: pressed ? 0.7 : 1,
                  backgroundColor: colors.primary,
                },
              ]}
              className="py-2 px-4 rounded-lg items-center"
            >
              <MaterialIcons name="share" size={20} color={colors.background} />
              <Text
                className="text-xs font-semibold mt-1"
                style={{
                  color: colors.background,
                }}
              >
                Share
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                // Copy to clipboard functionality would go here
              }}
              style={({ pressed }) => [
                {
                  flex: 1,
                  opacity: pressed ? 0.7 : 1,
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                },
              ]}
              className="py-2 px-4 rounded-lg items-center"
            >
              <MaterialIcons name="content-copy" size={20} color={colors.primary} />
              <Text
                className="text-xs font-semibold mt-1"
                style={{
                  color: colors.primary,
                }}
              >
                Copy
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </Pressable>
  );
}
