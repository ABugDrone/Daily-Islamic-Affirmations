/**
 * Dua Tracking System
 * Tracks daily dua completion, streaks, and achievements
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

export interface DuaCompletion {
  duaId: string;
  date: string; // YYYY-MM-DD format
  completedAt: number; // timestamp
}

export interface UserStats {
  totalDuasCompleted: number;
  currentStreak: number;
  longestStreak: number;
  lastCompletionDate: string | null;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
  requirement: {
    type: "streak" | "total";
    value: number;
  };
}

// Achievement definitions
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_dua",
    name: "First Step",
    description: "Complete your first dua",
    icon: "favorite",
    requirement: { type: "total", value: 1 },
  },
  {
    id: "week_warrior",
    name: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: "local-fire-department",
    requirement: { type: "streak", value: 7 },
  },
  {
    id: "month_master",
    name: "Month Master",
    description: "Maintain a 30-day streak",
    icon: "emoji-events",
    requirement: { type: "streak", value: 30 },
  },
  {
    id: "century",
    name: "Century",
    description: "Complete 100 duas",
    icon: "numbers",
    requirement: { type: "total", value: 100 },
  },
  {
    id: "golden_streak",
    name: "Golden Streak",
    description: "Maintain a 100-day streak",
    icon: "star",
    requirement: { type: "streak", value: 100 },
  },
  {
    id: "devoted",
    name: "Devoted",
    description: "Complete 365 duas",
    icon: "favorite-border",
    requirement: { type: "total", value: 365 },
  },
  {
    id: "eternal_flame",
    name: "Eternal Flame",
    description: "Maintain a 365-day streak",
    icon: "whatshot",
    requirement: { type: "streak", value: 365 },
  },
];

/**
 * Get today's date in YYYY-MM-DD format
 */
function getTodayString(): string {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

/**
 * Get yesterday's date in YYYY-MM-DD format
 */
function getYesterdayString(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split("T")[0];
}

/**
 * Load user statistics from storage
 */
export async function loadUserStats(): Promise<UserStats> {
  try {
    const saved = await AsyncStorage.getItem("userStats");
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      totalDuasCompleted: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastCompletionDate: null,
      achievements: [],
    };
  } catch (error) {
    console.error("Error loading user stats:", error);
    return {
      totalDuasCompleted: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastCompletionDate: null,
      achievements: [],
    };
  }
}

/**
 * Save user statistics to storage
 */
export async function saveUserStats(stats: UserStats): Promise<boolean> {
  try {
    await AsyncStorage.setItem("userStats", JSON.stringify(stats));
    return true;
  } catch (error) {
    console.error("Error saving user stats:", error);
    return false;
  }
}

/**
 * Load dua completions from storage
 */
export async function loadDuaCompletions(): Promise<DuaCompletion[]> {
  try {
    const saved = await AsyncStorage.getItem("duaCompletions");
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  } catch (error) {
    console.error("Error loading dua completions:", error);
    return [];
  }
}

/**
 * Save dua completions to storage
 */
export async function saveDuaCompletions(completions: DuaCompletion[]): Promise<boolean> {
  try {
    await AsyncStorage.setItem("duaCompletions", JSON.stringify(completions));
    return true;
  } catch (error) {
    console.error("Error saving dua completions:", error);
    return false;
  }
}

/**
 * Mark a dua as completed
 */
export async function completeDua(duaId: string): Promise<UserStats> {
  const completions = await loadDuaCompletions();
  const stats = await loadUserStats();
  const today = getTodayString();

  // Check if already completed today
  const alreadyCompleted = completions.some(
    (c) => c.duaId === duaId && c.date === today
  );

  if (!alreadyCompleted) {
    completions.push({
      duaId,
      date: today,
      completedAt: Date.now(),
    });

    stats.totalDuasCompleted += 1;

    // Update streak
    if (stats.lastCompletionDate === null) {
      // First completion
      stats.currentStreak = 1;
      stats.longestStreak = 1;
    } else if (stats.lastCompletionDate === getYesterdayString()) {
      // Streak continues
      stats.currentStreak += 1;
      stats.longestStreak = Math.max(stats.currentStreak, stats.longestStreak);
    } else if (stats.lastCompletionDate !== today) {
      // Streak broken, start new one
      stats.currentStreak = 1;
    }

    stats.lastCompletionDate = today;

    // Check for new achievements
    stats.achievements = await checkAchievements(stats);

    await saveDuaCompletions(completions);
    await saveUserStats(stats);
  }

  return stats;
}

/**
 * Check if dua was completed today
 */
export async function isDuaCompletedToday(duaId: string): Promise<boolean> {
  const completions = await loadDuaCompletions();
  const today = getTodayString();
  return completions.some((c) => c.duaId === duaId && c.date === today);
}

/**
 * Get today's completions count
 */
export async function getTodayCompletionsCount(): Promise<number> {
  const completions = await loadDuaCompletions();
  const today = getTodayString();
  return completions.filter((c) => c.date === today).length;
}

/**
 * Check for unlocked achievements
 */
export async function checkAchievements(stats: UserStats): Promise<Achievement[]> {
  const unlockedAchievements: Achievement[] = [];

  for (const achievement of ACHIEVEMENTS) {
    // Check if already unlocked
    if (stats.achievements.some((a) => a.id === achievement.id)) {
      unlockedAchievements.push(
        stats.achievements.find((a) => a.id === achievement.id)!
      );
      continue;
    }

    // Check if requirement is met
    let isUnlocked = false;
    if (achievement.requirement.type === "streak") {
      isUnlocked = stats.currentStreak >= achievement.requirement.value;
    } else if (achievement.requirement.type === "total") {
      isUnlocked = stats.totalDuasCompleted >= achievement.requirement.value;
    }

    if (isUnlocked) {
      unlockedAchievements.push({
        ...achievement,
        unlockedAt: Date.now(),
      });
    }
  }

  return unlockedAchievements;
}

/**
 * Get achievement by ID
 */
export function getAchievementById(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id);
}

/**
 * Get all unlocked achievements
 */
export async function getUnlockedAchievements(): Promise<Achievement[]> {
  const stats = await loadUserStats();
  return stats.achievements;
}

/**
 * Get progress towards next achievement
 */
export async function getNextAchievementProgress(): Promise<{
  achievement: Achievement | null;
  progress: number;
  percentage: number;
} | null> {
  const stats = await loadUserStats();

  for (const achievement of ACHIEVEMENTS) {
    if (stats.achievements.some((a) => a.id === achievement.id)) {
      continue; // Already unlocked
    }

    let progress = 0;
    let total = 0;

    if (achievement.requirement.type === "streak") {
      progress = stats.currentStreak;
      total = achievement.requirement.value;
    } else if (achievement.requirement.type === "total") {
      progress = stats.totalDuasCompleted;
      total = achievement.requirement.value;
    }

    const percentage = Math.min(100, Math.round((progress / total) * 100));

    return {
      achievement,
      progress,
      percentage,
    };
  }

  return null;
}

/**
 * Reset daily stats (for testing)
 */
export async function resetDailyStats(): Promise<void> {
  try {
    await AsyncStorage.removeItem("duaCompletions");
    const stats = await loadUserStats();
    stats.currentStreak = 0;
    stats.lastCompletionDate = null;
    await saveUserStats(stats);
  } catch (error) {
    console.error("Error resetting daily stats:", error);
  }
}

/**
 * Get completion history for a date range
 */
export async function getCompletionHistory(
  startDate: string,
  endDate: string
): Promise<Record<string, number>> {
  const completions = await loadDuaCompletions();
  const history: Record<string, number> = {};

  const start = new Date(startDate);
  const end = new Date(endDate);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    history[dateStr] = 0;
  }

  completions.forEach((c) => {
    if (c.date >= startDate && c.date <= endDate) {
      history[c.date] = (history[c.date] || 0) + 1;
    }
  });

  return history;
}
