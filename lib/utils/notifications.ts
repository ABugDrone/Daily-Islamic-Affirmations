/**
 * Local Push Notifications Utility
 * Schedules local notifications for prayer times and daily reminders
 * Works completely offline using device local storage and scheduler
 */

import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface NotificationSchedule {
  id: string;
  type: "prayer" | "reminder" | "affirmation";
  title: string;
  body: string;
  time: string; // HH:MM format
  enabled: boolean;
  days?: number[]; // 0-6 for days of week, undefined = daily
}

// Default notification schedules
export const DEFAULT_SCHEDULES: NotificationSchedule[] = [
  {
    id: "prayer_fajr",
    type: "prayer",
    title: "🌅 Fajr Prayer Time",
    body: "It's time for Fajr prayer. Start your day with remembrance of Allah.",
    time: "05:30",
    enabled: true,
  },
  {
    id: "prayer_dhuhr",
    type: "prayer",
    title: "☀️ Dhuhr Prayer Time",
    body: "It's time for Dhuhr prayer. Take a moment to connect with Allah.",
    time: "12:30",
    enabled: true,
  },
  {
    id: "prayer_asr",
    type: "prayer",
    title: "🌤️ Asr Prayer Time",
    body: "It's time for Asr prayer. Strengthen your faith.",
    time: "15:30",
    enabled: true,
  },
  {
    id: "prayer_maghrib",
    type: "prayer",
    title: "🌅 Maghrib Prayer Time",
    body: "It's time for Maghrib prayer. Give thanks for the day.",
    time: "18:30",
    enabled: true,
  },
  {
    id: "prayer_isha",
    type: "prayer",
    title: "🌙 Isha Prayer Time",
    body: "It's time for Isha prayer. End your day with Allah's remembrance.",
    time: "20:30",
    enabled: true,
  },
  {
    id: "reminder_morning",
    type: "reminder",
    title: "📿 Daily Affirmation",
    body: "Start your day with today's Islamic affirmation.",
    time: "06:00",
    enabled: true,
  },
  {
    id: "reminder_evening",
    type: "reminder",
    title: "✨ Evening Reflection",
    body: "Reflect on today's blessings with our evening affirmation.",
    time: "19:00",
    enabled: true,
  },
];

/**
 * Initialize notifications handler
 */
export async function initializeNotifications() {
  try {
    // Request permissions
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      console.warn("Notification permissions not granted");
      return false;
    }

    // Set notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    return true;
  } catch (error) {
    console.error("Error initializing notifications:", error);
    return false;
  }
}

/**
 * Schedule a local notification
 */
export async function scheduleNotification(
  schedule: NotificationSchedule,
  trigger?: Notifications.NotificationTriggerInput
) {
  try {
    if (!trigger) {
      // Parse time string and create daily trigger
      const [hours, minutes] = schedule.time.split(":").map(Number);
      trigger = {
        type: "daily",
        hour: hours,
        minute: minutes,
      } as Notifications.DailyTriggerInput;
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: schedule.title,
        body: schedule.body,
        sound: "default",
        badge: 1,
      },
      trigger: trigger as Notifications.NotificationTriggerInput,
    });

    return notificationId;
  } catch (error) {
    console.error("Error scheduling notification:", error);
    return null;
  }
}

/**
 * Cancel a scheduled notification
 */
export async function cancelNotification(notificationId: string) {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch (error) {
    console.error("Error canceling notification:", error);
  }
}

/**
 * Load notification preferences from storage
 */
export async function loadNotificationPreferences(): Promise<NotificationSchedule[]> {
  try {
    const saved = await AsyncStorage.getItem("notificationSchedules");
    if (saved) {
      return JSON.parse(saved);
    }
    return DEFAULT_SCHEDULES;
  } catch (error) {
    console.error("Error loading notification preferences:", error);
    return DEFAULT_SCHEDULES;
  }
}

/**
 * Save notification preferences to storage
 */
export async function saveNotificationPreferences(
  schedules: NotificationSchedule[]
): Promise<boolean> {
  try {
    await AsyncStorage.setItem(
      "notificationSchedules",
      JSON.stringify(schedules)
    );
    return true;
  } catch (error) {
    console.error("Error saving notification preferences:", error);
    return false;
  }
}

/**
 * Enable/disable a notification schedule
 */
export async function toggleNotificationSchedule(
  scheduleId: string,
  enabled: boolean
): Promise<boolean> {
  try {
    const schedules = await loadNotificationPreferences();
    const updated = schedules.map((s) =>
      s.id === scheduleId ? { ...s, enabled } : s
    );
    return await saveNotificationPreferences(updated);
  } catch (error) {
    console.error("Error toggling notification schedule:", error);
    return false;
  }
}

/**
 * Get all scheduled notifications
 */
export async function getAllScheduledNotifications() {
  try {
    return await Notifications.getAllScheduledNotificationsAsync();
  } catch (error) {
    console.error("Error getting scheduled notifications:", error);
    return [];
  }
}

/**
 * Clear all notifications
 */
export async function clearAllNotifications() {
  try {
    await Notifications.dismissAllNotificationsAsync();
  } catch (error) {
    console.error("Error clearing notifications:", error);
  }
}
