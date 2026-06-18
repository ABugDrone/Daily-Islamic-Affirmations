import { ScrollView, View, Pressable, Text, Alert } from "react-native";
import { useEffect, useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { GreetingHeader } from "@/components/greeting-header";
import { PrayerTimeCard } from "@/components/prayer-time-card";
import { ProgressIndicator } from "@/components/progress-indicator";
import { DuaCard } from "@/components/dua-card";
import { MaterialIcons } from "@expo/vector-icons";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";
import { duas, getDuasByCategory, type Dua } from "@/lib/data/duas";
import {
  getPrayerTimes,
  getNextPrayer,
  getCurrentPrayer,
  formatTime,
  type PrayerName,
  type DailyPrayerTimes,
} from "@/lib/utils/prayer-times";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Default location (New York) - user can change in settings
const DEFAULT_LATITUDE = 40.7128;
const DEFAULT_LONGITUDE = -74.006;

export default function HomeScreen() {
  const colors = useColors();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [prayerTimes, setPrayerTimes] = useState<DailyPrayerTimes | null>(null);
  const [currentPrayer, setCurrentPrayer] = useState<PrayerName | null>(null);
  const [nextPrayer, setNextPrayer] = useState<{
    prayer: PrayerName;
    time: Date;
    minutesUntil: number;
  } | null>(null);
  const [todaysDuas, setTodaysDuas] = useState<Dua[]>([]);
  const [completedDuas, setCompletedDuas] = useState<string[]>([]);
  const [bookmarkedDuas, setBookmarkedDuas] = useState<string[]>([]);
  const [countdown, setCountdown] = useState(0);

  // Initialize prayer times on mount
  useEffect(() => {
    const initializePrayerTimes = async () => {
      try {
        // Get saved location or use default
        const savedLocation = await AsyncStorage.getItem("userLocation");
        let latitude = DEFAULT_LATITUDE;
        let longitude = DEFAULT_LONGITUDE;

        if (savedLocation) {
          const location = JSON.parse(savedLocation);
          latitude = location.latitude;
          longitude = location.longitude;
        }

        const times = getPrayerTimes(latitude, longitude, new Date());
        setPrayerTimes(times);

        // Get today's duas (one per prayer time)
        const fajrDua = getDuasByCategory("wealth")[0]; // Morning: Wealth
        const dhuhrDua = getDuasByCategory("anxiety")[0]; // Afternoon: Anxiety
        const asrDua = getDuasByCategory("protection")[0]; // Post-Asr: Protection
        const maghribDua = getDuasByCategory("gratitude")[0]; // Evening: Gratitude
        const ishaDua = getDuasByCategory("sleep")[0]; // Night: Sleep

        setTodaysDuas([fajrDua, dhuhrDua, asrDua, maghribDua, ishaDua]);

        // Load completed and bookmarked duas
        const completed = await AsyncStorage.getItem("completedDuas");
        const bookmarked = await AsyncStorage.getItem("bookmarkedDuas");

        if (completed) {
          setCompletedDuas(JSON.parse(completed));
        }
        if (bookmarked) {
          setBookmarkedDuas(JSON.parse(bookmarked));
        }
      } catch (error) {
        console.error("Error initializing prayer times:", error);
      }
    };

    initializePrayerTimes();
  }, []);

  // Update current time and prayer status every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      if (prayerTimes) {
        const current = getCurrentPrayer(prayerTimes, now);
        setCurrentPrayer(current);

        const next = getNextPrayer(prayerTimes, now);
        if (next) {
          setNextPrayer(next);
          setCountdown(next.minutesUntil);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [prayerTimes]);

  const handleBookmarkDua = async (duaId: string) => {
    try {
      const updated = bookmarkedDuas.includes(duaId)
        ? bookmarkedDuas.filter((id) => id !== duaId)
        : [...bookmarkedDuas, duaId];

      setBookmarkedDuas(updated);
      await AsyncStorage.setItem("bookmarkedDuas", JSON.stringify(updated));

      Alert.alert(
        bookmarkedDuas.includes(duaId) ? "Removed" : "Bookmarked",
        bookmarkedDuas.includes(duaId)
          ? "Dua removed from favorites"
          : "Dua added to favorites"
      );
    } catch (error) {
      console.error("Error bookmarking dua:", error);
    }
  };

  const handleCompleteDua = async (duaId: string) => {
    try {
      const updated = completedDuas.includes(duaId)
        ? completedDuas.filter((id) => id !== duaId)
        : [...completedDuas, duaId];

      setCompletedDuas(updated);
      await AsyncStorage.setItem("completedDuas", JSON.stringify(updated));
    } catch (error) {
      console.error("Error updating completed duas:", error);
    }
  };

  const handleShareDua = (dua: Dua) => {
    // Share functionality would be implemented here
    Alert.alert("Share Dua", `Sharing: ${dua.english.substring(0, 50)}...`);
  };

  if (!prayerTimes || !nextPrayer) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text style={{ color: colors.foreground }}>Loading...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-0">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        {/* Header Section */}
        <View className="px-6 pt-6">
          <GreetingHeader currentTime={currentTime} />
        </View>

        {/* Prayer Time Card */}
        <View className="px-6">
          <PrayerTimeCard
            currentPrayer={currentPrayer}
            nextPrayer={nextPrayer.prayer}
            nextPrayerTime={nextPrayer.time}
            countdownMinutes={countdown}
            location="Your Location"
          />
        </View>

        {/* Today's Affirmations Section */}
        <View className="px-6">
          <ProgressIndicator
            completed={completedDuas.length}
            total={todaysDuas.length}
            label="Today's Affirmations"
          />

          {/* Duas List */}
          {todaysDuas.map((dua) => (
            <View key={dua.id}>
              <DuaCard
                dua={dua}
                onPress={() => handleCompleteDua(dua.id)}
                onBookmark={handleBookmarkDua}
                onShare={handleShareDua}
                isBookmarked={bookmarkedDuas.includes(dua.id)}
                showFullContent={true}
              />
            </View>
          ))}

          {/* Daily Reflection Card */}
          <View
            className={cn(
              "rounded-2xl p-6 border mb-6",
              "bg-primary"
            )}
            style={{
              backgroundColor: colors.primary,
              borderColor: colors.primary,
            }}
          >
            <Text
              className="text-sm font-semibold mb-2"
              style={{
                color: colors.background,
              }}
            >
              Daily Reflection
            </Text>
            <Text
              className="text-base leading-relaxed italic"
              style={{
                color: colors.background,
              }}
            >
              "The best of you are those who are best to their families, and I am the best among you to my family." - Prophet Muhammad (SAW)
            </Text>
          </View>

          {/* Bottom Spacing */}
          <View className="h-8" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
