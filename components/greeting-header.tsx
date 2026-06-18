import { Text, View } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface GreetingHeaderProps {
  currentTime: Date;
  showHijri?: boolean;
}

export function GreetingHeader({
  currentTime,
  showHijri = true,
}: GreetingHeaderProps) {
  const colors = useColors();

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const getGreeting = (date: Date): string => {
    const hour = date.getHours();
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  // Simple Hijri conversion (approximate)
  const getHijriDate = (gregorianDate: Date): string => {
    const jd = Math.floor(
      (gregorianDate.getTime() / 86400000) + 2440587.5
    );
    const l = jd + 68569;
    const n = Math.floor((4 * l) / 146097);
    const l2 = l - Math.floor((146097 * n + 3) / 4);
    const i = Math.floor((4000 * (l2 + 1)) / 1461001);
    const l3 = l2 - Math.floor((1461 * i) / 4) + 31;
    const j = Math.floor((80 * l3) / 2447);
    const d = l3 - Math.floor((2447 * j) / 80);
    const l4 = Math.floor(j / 11);
    const m = j + 2 - 12 * l4;
    const y = 100 * (n - 49) + i + l4;

    // Hijri conversion (simplified)
    const hijriYear = Math.floor((y - 622) * 1.03);
    const hijriMonth = m;
    const hijriDay = d;

    const months = [
      "Muharram",
      "Safar",
      "Rabi' al-awwal",
      "Rabi' al-thani",
      "Jumada al-awwal",
      "Jumada al-thani",
      "Rajab",
      "Sha'ban",
      "Ramadan",
      "Shawwal",
      "Dhu al-Qi'dah",
      "Dhu al-Hijjah",
    ];

    return `${hijriDay} ${months[hijriMonth - 1]} ${hijriYear} AH`;
  };

  return (
    <View className="mb-6">
      {/* Greeting */}
      <Text
        className="text-3xl font-bold mb-2"
        style={{
          color: colors.foreground,
        }}
      >
        Assalamu Alaikum
      </Text>

      {/* Subtext */}
      <Text
        className="text-base mb-3"
        style={{
          color: colors.muted,
        }}
      >
        {getGreeting(currentTime)}
      </Text>

      {/* Gregorian Date */}
      <Text
        className="text-sm"
        style={{
          color: colors.muted,
        }}
      >
        {formatDate(currentTime)}
      </Text>

      {/* Hijri Date */}
      {showHijri && (
        <Text
          className="text-sm mt-1"
          style={{
            color: colors.primary,
          }}
        >
          {getHijriDate(currentTime)}
        </Text>
      )}
    </View>
  );
}
