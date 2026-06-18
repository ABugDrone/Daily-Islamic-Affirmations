import AsyncStorage from "@react-native-async-storage/async-storage";

export interface NotificationSettings {
  fajrTime: string; // HH:MM
  dhuhrTime: string;
  asrTime: string;
  maghribTime: string;
  ishaTime: string;
  dailyAffirmationTime: string;
  enabled: boolean;
}

const DEFAULT_SETTINGS: NotificationSettings = {
  fajrTime: "06:00",
  dhuhrTime: "12:00",
  asrTime: "15:00",
  maghribTime: "18:00",
  ishaTime: "20:00",
  dailyAffirmationTime: "08:00",
  enabled: true,
};

const STORAGE_KEY = "notification_settings";

export async function getNotificationSettings(): Promise<NotificationSettings> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error("Error reading notification settings:", error);
    return DEFAULT_SETTINGS;
  }
}

export async function saveNotificationSettings(
  settings: NotificationSettings
): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Error saving notification settings:", error);
  }
}

export async function updateNotificationTime(
  prayer: keyof Omit<NotificationSettings, "enabled">,
  time: string
): Promise<void> {
  const settings = await getNotificationSettings();
  settings[prayer] = time;
  await saveNotificationSettings(settings);
}

export async function toggleNotifications(enabled: boolean): Promise<void> {
  const settings = await getNotificationSettings();
  settings.enabled = enabled;
  await saveNotificationSettings(settings);
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const min = parseInt(minutes);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${String(min).padStart(2, "0")} ${period}`;
}

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60) % 24;
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}
