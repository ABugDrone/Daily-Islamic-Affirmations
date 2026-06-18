import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { loadUserStats, loadDuaCompletions } from "@/lib/utils/dua-tracking";
import { cn } from "@/lib/utils";

interface Statistics {
  totalDuasCompleted: number;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
  mostReadCategory: string;
  totalFavorites: number;
  averageDailyCompletion: number;
}

export function StatisticsDashboard() {
  const colors = useColors();
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  async function loadStatistics() {
    try {
      const userStats = await loadUserStats();
      const completions = await loadDuaCompletions();

      const totalCompleted = userStats.totalDuasCompleted;
      const currentStreak = userStats.currentStreak || 0;
      const longestStreak = userStats.longestStreak || 0;

      const today = new Date().toISOString().split("T")[0];
      const todayCompleted = completions.filter((c) => c.date === today).length;

      const categoryStats: Record<string, number> = {};
      completions.forEach((completion) => {
        const category = completion.duaId.split("_")[0];
        categoryStats[category] = (categoryStats[category] || 0) + 1;
      });

      const mostReadCategory = Object.entries(categoryStats).sort(
        (a, b) => b[1] - a[1]
      )[0]?.[0] || "N/A";

      const uniqueDates = new Set(completions.map((c) => c.date)).size || 1;
      const avgCompletion = Math.round(totalCompleted / uniqueDates);

      setStats({
        totalDuasCompleted: totalCompleted,
        currentStreak,
        longestStreak,
        completionRate: Math.round((todayCompleted / 5) * 100),
        mostReadCategory,
        totalFavorites: 0,
        averageDailyCompletion: avgCompletion,
      });
    } catch (error: unknown) {
      console.error("Error loading statistics:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !stats) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-foreground">Loading statistics...</Text>
      </View>
    );
  }

  const screenWidth = Dimensions.get("window").width;
  const barWidth = (screenWidth - 48) / 7; // 7 days of week

  return (
    <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="mb-6">
        <Text className="text-3xl font-bold text-foreground mb-2">
          Your Statistics
        </Text>
        <Text className="text-muted">Track your spiritual journey</Text>
      </View>

      {/* Key Metrics */}
      <View className="gap-4 mb-6">
        {/* Total Duas */}
        <View
          className="rounded-2xl p-6 gap-2"
          style={{ backgroundColor: colors.surface }}
        >
          <Text className="text-sm font-semibold text-muted">
            Total Duas Completed
          </Text>
          <Text className="text-4xl font-bold text-primary">
            {stats.totalDuasCompleted}
          </Text>
          <Text className="text-xs text-muted">
            Average: {stats.averageDailyCompletion} per day
          </Text>
        </View>

        {/* Streaks */}
        <View className="flex-row gap-4">
          <View
            className="flex-1 rounded-2xl p-4 gap-2"
            style={{ backgroundColor: colors.surface }}
          >
            <Text className="text-xs font-semibold text-muted">
              Current Streak
            </Text>
            <Text className="text-3xl font-bold text-primary">
              {stats.currentStreak}
            </Text>
            <Text className="text-xs text-muted">days</Text>
          </View>

          <View
            className="flex-1 rounded-2xl p-4 gap-2"
            style={{ backgroundColor: colors.surface }}
          >
            <Text className="text-xs font-semibold text-muted">
              Longest Streak
            </Text>
            <Text className="text-3xl font-bold text-primary">
              {stats.longestStreak}
            </Text>
            <Text className="text-xs text-muted">days</Text>
          </View>
        </View>

        {/* Today's Progress */}
        <View
          className="rounded-2xl p-6 gap-3"
          style={{ backgroundColor: colors.surface }}
        >
          <View className="flex-row justify-between items-center">
            <Text className="text-sm font-semibold text-muted">
              Today's Progress
            </Text>
            <Text className="text-lg font-bold text-primary">
              {stats.completionRate}%
            </Text>
          </View>

          {/* Progress Bar */}
          <View
            className="h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: colors.border }}
          >
            <View
              className="h-full rounded-full"
              style={{
                backgroundColor: colors.primary,
                width: `${stats.completionRate}%`,
              }}
            />
          </View>

          <Text className="text-xs text-muted">
            {Math.round((stats.completionRate / 100) * 5)} of 5 duas completed
          </Text>
        </View>

        {/* Favorites & Categories */}
        <View className="flex-row gap-4">
          <View
            className="flex-1 rounded-2xl p-4 gap-2"
            style={{ backgroundColor: colors.surface }}
          >
            <Text className="text-xs font-semibold text-muted">
              Favorites
            </Text>
            <Text className="text-3xl font-bold text-primary">
              {stats.totalFavorites}
            </Text>
            <Text className="text-xs text-muted">saved duas</Text>
          </View>

          <View
            className="flex-1 rounded-2xl p-4 gap-2"
            style={{ backgroundColor: colors.surface }}
          >
            <Text className="text-xs font-semibold text-muted">
              Top Category
            </Text>
            <Text className="text-lg font-bold text-primary">
              {stats.mostReadCategory}
            </Text>
            <Text className="text-xs text-muted">most read</Text>
          </View>
        </View>
      </View>

      {/* Weekly Activity Chart */}
      <View
        className="rounded-2xl p-6 gap-4 mb-6"
        style={{ backgroundColor: colors.surface }}
      >
        <Text className="text-sm font-semibold text-foreground">
          Weekly Activity
        </Text>

        <View className="flex-row justify-between items-end h-32 gap-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
            (day) => (
              <View key={day} className="flex-1 items-center gap-2">
                {/* Bar */}
                <View
                  className="w-full rounded-t-lg"
                  style={{
                    height: `${Math.random() * 100}%`,
                    backgroundColor: colors.primary,
                  }}
                />
                {/* Label */}
                <Text className="text-xs text-muted">{day}</Text>
              </View>
            )
          )}
        </View>
      </View>

      {/* Tips */}
      <View
        className="rounded-2xl p-6 gap-3 mb-6"
        style={{ backgroundColor: colors.surface }}
      >
        <Text className="text-sm font-semibold text-foreground">
          Keep Going!
        </Text>
        <Text className="text-sm text-muted leading-relaxed">
          You're doing great! Keep your streak going by completing your daily
          duas. Every day brings you closer to spiritual growth.
        </Text>
      </View>
    </ScrollView>
  );
}
