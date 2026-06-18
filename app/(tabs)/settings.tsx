import { ScrollView, View, Pressable, Text, Switch, Alert } from "react-native";
import { useState, useCallback } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { MaterialIcons } from "@expo/vector-icons";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";
import { useColorScheme } from "@/hooks/use-color-scheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { NotificationTimePicker } from "@/components/notification-time-picker";

export default function SettingsScreen() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(colorScheme === "dark");
  const [fontSize, setFontSize] = useState(16);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notificationTime, setNotificationTime] = useState("06:00");

  // Load settings on mount
  useFocusEffect(
    useCallback(() => {
      const loadSettings = async () => {
        try {
          const saved = await AsyncStorage.getItem("appSettings");
          if (saved) {
            const settings = JSON.parse(saved);
            setFontSize(settings.fontSize || 16);
            setNotificationsEnabled(settings.notificationsEnabled !== false);
            setNotificationTime(settings.notificationTime || "06:00");
          }
        } catch (error) {
          console.error("Error loading settings:", error);
        }
      };
      loadSettings();
    }, [])
  );

  const handleSaveSettings = async () => {
    try {
      const settings = {
        fontSize,
        notificationsEnabled,
        notificationTime,
      };
      await AsyncStorage.setItem("appSettings", JSON.stringify(settings));
      Alert.alert("Success", "Settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      Alert.alert("Error", "Failed to save settings");
    }
  };

  const openPrivacyPolicy = async () => {
    try {
      await WebBrowser.openBrowserAsync("https://example.com/privacy");
    } catch (error) {
      console.error("Error opening privacy policy:", error);
    }
  };

  const openTermsOfService = async () => {
    try {
      await WebBrowser.openBrowserAsync("https://example.com/terms");
    } catch (error) {
      console.error("Error opening terms of service:", error);
    }
  };

  const fontSizeLabel = (size: number): string => {
    if (size < 14) return "Small";
    if (size < 16) return "Medium";
    if (size < 18) return "Large";
    return "Extra Large";
  };

  return (
    <ScreenContainer className="p-0">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text
            className="text-2xl font-bold"
            style={{
              color: colors.foreground,
            }}
          >
            Settings
          </Text>
        </View>

        {/* Theme Section */}
        <View className="px-6 mb-6">
          <Text
            className="text-sm font-semibold mb-3"
            style={{
              color: colors.muted,
            }}
          >
            THEME
          </Text>
          <View
            className={cn(
              "rounded-lg p-4 flex-row justify-between items-center border",
              "bg-surface border-border"
            )}
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <View className="flex-row items-center gap-3">
              <MaterialIcons name="dark-mode" size={20} color={colors.primary} />
              <Text
                style={{
                  color: colors.foreground,
                }}
              >
                Dark Mode
              </Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          </View>
        </View>

        {/* Font Size Section */}
        <View className="px-6 mb-6">
          <Text
            className="text-sm font-semibold mb-3"
            style={{
              color: colors.muted,
            }}
          >
            FONT SIZE
          </Text>
          <View
            className={cn(
              "rounded-lg p-4 border",
              "bg-surface border-border"
            )}
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <View className="mb-4 flex-row gap-2 items-center">
              <Text style={{ color: colors.muted }}>12</Text>
              <View
                className="flex-1 h-1 rounded-full"
                style={{
                  backgroundColor: colors.border,
                }}
              />
              <Text style={{ color: colors.muted }}>22</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text
                style={{
                  color: colors.muted,
                  fontSize: fontSize - 2,
                }}
              >
                {fontSizeLabel(fontSize)}
              </Text>
              <Text
                style={{
                  color: colors.foreground,
                  fontSize: fontSize,
                }}
              >
                Sample Text
              </Text>
            </View>
          </View>
        </View>

        {/* Notifications Section */}
        <View className="px-6 mb-6">
          <Text
            className="text-sm font-semibold mb-3"
            style={{
              color: colors.muted,
            }}
          >
            NOTIFICATIONS
          </Text>
          <View
            className={cn(
              "rounded-lg p-4 flex-row justify-between items-center border mb-3",
              "bg-surface border-border"
            )}
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <View className="flex-row items-center gap-3">
              <MaterialIcons name="notifications" size={20} color={colors.primary} />
              <Text
                style={{
                  color: colors.foreground,
                }}
              >
                Daily Reminders
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          </View>

          {notificationsEnabled && (
            <View className="px-0">
              <NotificationTimePicker
                value={notificationTime}
                onChange={setNotificationTime}
                label="Daily Reminder Time"
              />
            </View>
          )}
        </View>

        {/* About Section */}
        <View className="px-6 mb-6">
          <Text
            className="text-sm font-semibold mb-3"
            style={{
              color: colors.muted,
            }}
          >
            ABOUT
          </Text>
          <View
            className={cn(
              "rounded-lg p-4 border mb-3",
              "bg-surface border-border"
            )}
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }}
          >
            <View className="flex-row justify-between items-center mb-3">
              <Text
                style={{
                  color: colors.muted,
                }}
              >
                App Version
              </Text>
              <Text
                className="font-semibold"
                style={{
                  color: colors.foreground,
                }}
              >
                1.0.0
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text
                style={{
                  color: colors.muted,
                }}
              >
                Developer
              </Text>
              <Text
                className="font-semibold"
                style={{
                  color: colors.foreground,
                }}
              >
                ABugDrone
              </Text>
            </View>
          </View>

          {/* Links */}
          <Pressable
            onPress={openPrivacyPolicy}
            style={({ pressed }) => [
              {
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                marginBottom: 8,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text
              style={{
                color: colors.primary,
                fontWeight: "500",
              }}
            >
              Privacy Policy
            </Text>
          </Pressable>

          <Pressable
            onPress={openTermsOfService}
            style={({ pressed }) => [
              {
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text
              style={{
                color: colors.primary,
                fontWeight: "500",
              }}
            >
              Terms of Service
            </Text>
          </Pressable>
        </View>

        {/* Save Button */}
        <View className="px-6 mb-6">
          <Pressable
            onPress={handleSaveSettings}
            style={({ pressed }) => [
              {
                paddingVertical: 14,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor: colors.primary,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text
              className="text-center font-semibold text-lg"
              style={{
                color: colors.background,
              }}
            >
              Save Settings
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
