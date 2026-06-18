import { View, Text, ScrollView, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useColors } from "@/hooks/use-colors";
import {
  getUnlockedAchievements,
  getNextAchievementProgress,
  type Achievement,
} from "@/lib/utils/dua-tracking";

interface AchievementsDisplayProps {
  onClose?: () => void;
}

export function AchievementsDisplay({ onClose }: AchievementsDisplayProps) {
  const colors = useColors();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [nextProgress, setNextProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    const unlockedAchievements = await getUnlockedAchievements();
    const nextAchievement = await getNextAchievementProgress();

    setAchievements(unlockedAchievements);
    setNextProgress(nextAchievement);
    setLoading(false);
  };

  if (loading) {
    return (
      <View className="items-center justify-center p-6">
        <Text style={{ color: colors.muted }}>Loading achievements...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="rounded-2xl p-4 mb-4"
      style={{
        backgroundColor: colors.surface,
      }}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text
          className="text-lg font-bold"
          style={{
            color: colors.foreground,
          }}
        >
          Achievements
        </Text>
        {onClose && (
          <Pressable onPress={onClose} className="p-2">
            <MaterialIcons name="close" size={20} color={colors.muted} />
          </Pressable>
        )}
      </View>

      {/* Unlocked Achievements */}
      {achievements.length > 0 && (
        <View className="mb-6">
          <Text
            className="text-sm font-semibold mb-3"
            style={{
              color: colors.primary,
            }}
          >
            Unlocked ({achievements.length})
          </Text>

          {achievements.map((achievement) => (
            <View
              key={achievement.id}
              className="flex-row items-center gap-3 mb-3 p-3 rounded-lg"
              style={{
                backgroundColor: `${colors.primary}15`,
              }}
            >
              <View
                className="w-12 h-12 rounded-full items-center justify-center"
                style={{
                  backgroundColor: colors.primary,
                }}
              >
                <MaterialIcons
                  name={achievement.icon as any}
                  size={24}
                  color={colors.background}
                />
              </View>

              <View className="flex-1">
                <Text
                  className="text-sm font-semibold"
                  style={{
                    color: colors.foreground,
                  }}
                >
                  {achievement.name}
                </Text>
                <Text
                  className="text-xs mt-1"
                  style={{
                    color: colors.muted,
                  }}
                >
                  {achievement.description}
                </Text>
              </View>

              <MaterialIcons name="check-circle" size={20} color={colors.primary} />
            </View>
          ))}
        </View>
      )}

      {/* Next Achievement Progress */}
      {nextProgress && (
        <View className="border-t pt-4" style={{ borderTopColor: colors.border }}>
          <Text
            className="text-sm font-semibold mb-3"
            style={{
              color: colors.foreground,
            }}
          >
            Next Achievement
          </Text>

          <View
            className="p-4 rounded-lg"
            style={{
              backgroundColor: `${colors.primary}10`,
            }}
          >
            <View className="flex-row items-center gap-3 mb-3">
              <View
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{
                  backgroundColor: colors.border,
                }}
              >
                <MaterialIcons
                  name={nextProgress.achievement.icon as any}
                  size={20}
                  color={colors.muted}
                />
              </View>

              <View className="flex-1">
                <Text
                  className="text-sm font-semibold"
                  style={{
                    color: colors.foreground,
                  }}
                >
                  {nextProgress.achievement.name}
                </Text>
                <Text
                  className="text-xs mt-1"
                  style={{
                    color: colors.muted,
                  }}
                >
                  {nextProgress.achievement.description}
                </Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View
              className="h-2 rounded-full overflow-hidden"
              style={{
                backgroundColor: colors.border,
              }}
            >
              <View
                className="h-full"
                style={{
                  backgroundColor: colors.primary,
                  width: `${nextProgress.percentage}%`,
                }}
              />
            </View>

            {/* Progress Text */}
            <View className="flex-row justify-between items-center mt-2">
              <Text
                className="text-xs"
                style={{
                  color: colors.muted,
                }}
              >
                {nextProgress.progress} / {nextProgress.achievement.requirement.value}
              </Text>
              <Text
                className="text-xs font-semibold"
                style={{
                  color: colors.primary,
                }}
              >
                {nextProgress.percentage}%
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Empty State */}
      {achievements.length === 0 && !nextProgress && (
        <View className="items-center py-8">
          <MaterialIcons name="emoji-events" size={48} color={colors.muted} />
          <Text
            className="text-sm mt-3"
            style={{
              color: colors.muted,
            }}
          >
            Complete duas to unlock achievements!
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

/**
 * Compact streak display component
 */
interface StreakDisplayProps {
  streak: number;
  longestStreak: number;
}

export function StreakDisplay({ streak, longestStreak }: StreakDisplayProps) {
  const colors = useColors();

  return (
    <View className="flex-row gap-4">
      {/* Current Streak */}
      <View
        className="flex-1 p-4 rounded-lg items-center"
        style={{
          backgroundColor: colors.surface,
        }}
      >
        <View className="flex-row items-center gap-1 mb-2">
          <MaterialIcons name="local-fire-department" size={20} color={colors.error} />
          <Text
            className="text-sm font-semibold"
            style={{
              color: colors.foreground,
            }}
          >
            Current Streak
          </Text>
        </View>
        <Text
          className="text-2xl font-bold"
          style={{
            color: colors.primary,
          }}
        >
          {streak}
        </Text>
        <Text
          className="text-xs mt-1"
          style={{
            color: colors.muted,
          }}
        >
          days
        </Text>
      </View>

      {/* Longest Streak */}
      <View
        className="flex-1 p-4 rounded-lg items-center"
        style={{
          backgroundColor: colors.surface,
        }}
      >
        <View className="flex-row items-center gap-1 mb-2">
          <MaterialIcons name="star" size={20} color={colors.warning} />
          <Text
            className="text-sm font-semibold"
            style={{
              color: colors.foreground,
            }}
          >
            Best Streak
          </Text>
        </View>
        <Text
          className="text-2xl font-bold"
          style={{
            color: colors.primary,
          }}
        >
          {longestStreak}
        </Text>
        <Text
          className="text-xs mt-1"
          style={{
            color: colors.muted,
          }}
        >
          days
        </Text>
      </View>
    </View>
  );
}
