import { View, Text, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useColors } from "@/hooks/use-colors";
import {
  gregorianToHijri,
  hijriToGregorian,
  HIJRI_MONTHS,
  HIJRI_MONTHS_ARABIC,
  getEventsForMonth,
  formatHijriDate,
  isIslamicHoliday,
} from "@/lib/utils/hijri-calendar";

export function HijriCalendar() {
  const colors = useColors();
  const today = gregorianToHijri();
  const [selectedMonth, setSelectedMonth] = useState(today.month);
  const [selectedYear, setSelectedYear] = useState(today.year);

  const events = getEventsForMonth(selectedMonth);

  // Get days in Hijri month (29 or 30 days)
  const daysInMonth = selectedMonth % 2 === 1 ? 30 : 29;

  const handlePreviousMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const isToday = (day: number) => {
    return (
      day === today.day &&
      selectedMonth === today.month &&
      selectedYear === today.year
    );
  };

  const getEventForDay = (day: number) => {
    return events.find((e) => e.hijriDay === day);
  };

  return (
    <ScrollView
      className="rounded-2xl p-4 mb-4"
      style={{
        backgroundColor: colors.surface,
      }}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Pressable
          onPress={handlePreviousMonth}
          style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          className="p-2"
        >
          <MaterialIcons name="chevron-left" size={24} color={colors.primary} />
        </Pressable>

        <View className="items-center">
          <Text
            className="text-lg font-bold"
            style={{
              color: colors.foreground,
            }}
          >
            {HIJRI_MONTHS[selectedMonth - 1]}
          </Text>
          <Text
            className="text-sm"
            style={{
              color: colors.muted,
            }}
          >
            {selectedYear} AH
          </Text>
          <Text
            className="text-xs mt-1"
            style={{
              color: colors.primary,
            }}
          >
            {HIJRI_MONTHS_ARABIC[selectedMonth - 1]}
          </Text>
        </View>

        <Pressable
          onPress={handleNextMonth}
          style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          className="p-2"
        >
          <MaterialIcons name="chevron-right" size={24} color={colors.primary} />
        </Pressable>
      </View>

      {/* Calendar Grid */}
      <View className="mb-6">
        {/* Day headers */}
        <View className="flex-row justify-between mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <Text
              key={day}
              className="text-xs font-semibold text-center"
              style={{
                color: colors.muted,
                flex: 1,
              }}
            >
              {day}
            </Text>
          ))}
        </View>

        {/* Calendar days */}
        <View className="flex-row flex-wrap">
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const event = getEventForDay(day);
            const isTodayDate = isToday(day);

            return (
              <View
                key={day}
                className="w-1/7 aspect-square items-center justify-center mb-2"
                style={{
                  flex: 1 / 7,
                }}
              >
                <Pressable
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.7 : 1,
                      backgroundColor: isTodayDate ? colors.primary : event ? colors.border : "transparent",
                      width: "90%",
                      aspectRatio: 1,
                      borderRadius: 8,
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  ]}
                >
                  <Text
                    className="text-sm font-semibold"
                    style={{
                      color: isTodayDate ? colors.background : colors.foreground,
                    }}
                  >
                    {day}
                  </Text>
                  {event && (
                    <View
                      className="w-1 h-1 rounded-full mt-0.5"
                      style={{
                        backgroundColor: event.type === "holiday" ? colors.error : colors.primary,
                      }}
                    />
                  )}
                </Pressable>
              </View>
            );
          })}
        </View>
      </View>

      {/* Events for this month */}
      {events.length > 0 && (
        <View className="border-t pt-4" style={{ borderTopColor: colors.border }}>
          <Text
            className="text-sm font-bold mb-3"
            style={{
              color: colors.foreground,
            }}
          >
            Islamic Events
          </Text>

          {events.map((event, index) => (
            <View
              key={index}
              className="mb-3 p-3 rounded-lg"
              style={{
                backgroundColor: event.type === "holiday" ? `${colors.error}15` : `${colors.primary}15`,
              }}
            >
              <View className="flex-row items-start gap-2">
                <MaterialIcons
                  name={event.type === "holiday" ? "celebration" : "event"}
                  size={16}
                  color={event.type === "holiday" ? colors.error : colors.primary}
                />
                <View className="flex-1">
                  <Text
                    className="text-sm font-semibold"
                    style={{
                      color: colors.foreground,
                    }}
                  >
                    {event.name}
                  </Text>
                  <Text
                    className="text-xs mt-0.5"
                    style={{
                      color: colors.muted,
                    }}
                  >
                    {event.nameArabic}
                  </Text>
                  <Text
                    className="text-xs mt-1"
                    style={{
                      color: colors.muted,
                    }}
                  >
                    {event.hijriDay} {HIJRI_MONTHS[event.hijriMonth - 1]}
                  </Text>
                  <Text
                    className="text-xs mt-1 leading-relaxed"
                    style={{
                      color: colors.muted,
                    }}
                  >
                    {event.description}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

/**
 * Compact Hijri date display component
 */
interface HijriDateDisplayProps {
  showArabic?: boolean;
}

export function HijriDateDisplay({ showArabic = true }: HijriDateDisplayProps) {
  const colors = useColors();
  const hijriDate = gregorianToHijri();

  return (
    <View className="items-center">
      <Text
        className="text-sm font-semibold"
        style={{
          color: colors.foreground,
        }}
      >
        {hijriDate.day} {HIJRI_MONTHS[hijriDate.month - 1]} {hijriDate.year} AH
      </Text>
      {showArabic && (
        <Text
          className="text-xs mt-1"
          style={{
            color: colors.muted,
          }}
        >
          {hijriDate.day} {HIJRI_MONTHS_ARABIC[hijriDate.month - 1]} {hijriDate.year} هـ
        </Text>
      )}
    </View>
  );
}
