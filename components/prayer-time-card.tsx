import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";
import { formatTime, getPrayerNameEnglish, getPrayerNameArabic, type PrayerName } from "@/lib/utils/prayer-times";

interface PrayerTimeCardProps {
  currentPrayer: PrayerName | null;
  nextPrayer: PrayerName;
  nextPrayerTime: Date;
  countdownMinutes: number;
  location?: string;
}

export function PrayerTimeCard({
  currentPrayer,
  nextPrayer,
  nextPrayerTime,
  countdownMinutes,
  location = "Your Location",
}: PrayerTimeCardProps) {
  const colors = useColors();

  const formatCountdown = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const secs = Math.floor((minutes % 1) * 60);

    if (hours > 0) {
      return `${hours}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <View
      className={cn(
        "rounded-2xl p-6 border mb-6",
        "bg-surface border-border"
      )}
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
      }}
    >
      {/* Current Prayer */}
      {currentPrayer && (
        <View className="mb-4">
          <Text
            className="text-sm font-semibold mb-1"
            style={{
              color: colors.muted,
            }}
          >
            Current Prayer
          </Text>
          <View className="flex-row items-center gap-2">
            <MaterialIcons name="schedule" size={20} color={colors.primary} />
            <Text
              className="text-lg font-bold"
              style={{
                color: colors.foreground,
              }}
            >
              {getPrayerNameEnglish(currentPrayer)} ({getPrayerNameArabic(currentPrayer)})
            </Text>
          </View>
        </View>
      )}

      {/* Divider */}
      {currentPrayer && (
        <View
          className="h-px my-4"
          style={{
            backgroundColor: colors.border,
          }}
        />
      )}

      {/* Next Prayer */}
      <View className="mb-4">
        <Text
          className="text-sm font-semibold mb-2"
          style={{
            color: colors.muted,
          }}
        >
          Next Prayer
        </Text>
        <View className="flex-row items-center justify-between">
          <View>
            <Text
              className="text-2xl font-bold"
              style={{
                color: colors.primary,
              }}
            >
              {getPrayerNameEnglish(nextPrayer)}
            </Text>
            <Text
              className="text-sm mt-1"
              style={{
                color: colors.muted,
              }}
            >
              {getPrayerNameArabic(nextPrayer)}
            </Text>
          </View>
          <View className="items-end">
            <Text
              className="text-lg font-semibold"
              style={{
                color: colors.foreground,
              }}
            >
              {formatTime(nextPrayerTime)}
            </Text>
            <Text
              className="text-xs mt-1 font-bold"
              style={{
                color: colors.primary,
              }}
            >
              {formatCountdown(countdownMinutes)}
            </Text>
          </View>
        </View>
      </View>

      {/* Location */}
      <View className="flex-row items-center gap-2 mt-4 pt-4 border-t" style={{ borderTopColor: colors.border }}>
        <MaterialIcons name="location-on" size={16} color={colors.muted} />
        <Text
          className="text-xs"
          style={{
            color: colors.muted,
          }}
        >
          {location}
        </Text>
      </View>
    </View>
  );
}
