import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Modal } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";

interface TimePickerProps {
  value: string; // HH:MM format
  onChange: (time: string) => void;
  label: string;
}

export function NotificationTimePicker({
  value,
  onChange,
  label,
}: TimePickerProps) {
  const colors = useColors();
  const [showPicker, setShowPicker] = useState(false);
  const [hours, setHours] = useState(parseInt(value.split(":")[0]) || 7);
  const [minutes, setMinutes] = useState(parseInt(value.split(":")[1]) || 0);

  const handleConfirm = () => {
    const timeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    onChange(timeString);
    setShowPicker(false);
  };

  const hoursList = Array.from({ length: 24 }, (_, i) => i);
  const minutesList = Array.from({ length: 60 }, (_, i) => i);

  return (
    <View className="gap-2">
      <Text className="text-sm font-semibold text-muted">{label}</Text>

      <Pressable
        onPress={() => setShowPicker(true)}
        style={({ pressed }) => [
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <Text className="text-lg font-semibold text-foreground">{value}</Text>
      </Pressable>

      <Modal
        visible={showPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPicker(false)}
      >
        <View
          className="flex-1 justify-end"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <View
            className="rounded-t-2xl p-6 gap-4"
            style={{ backgroundColor: colors.background }}
          >
            <Text className="text-xl font-bold text-foreground">
              Set Notification Time
            </Text>

            {/* Time Picker */}
            <View className="flex-row gap-4 justify-center items-center h-48">
              {/* Hours */}
              <View className="flex-1">
                <Text className="text-center text-sm text-muted mb-2">
                  Hours
                </Text>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  scrollEventThrottle={16}
                >
                  {hoursList.map((hour) => (
                    <Pressable
                      key={hour}
                      onPress={() => setHours(hour)}
                      style={({ pressed }) => [
                        {
                          paddingVertical: 12,
                          paddingHorizontal: 16,
                          borderRadius: 8,
                          backgroundColor:
                            hours === hour ? colors.primary : "transparent",
                          opacity: pressed ? 0.7 : 1,
                        },
                      ]}
                    >
                      <Text
                        className={cn(
                          "text-center font-semibold",
                          hours === hour
                            ? "text-background"
                            : "text-foreground"
                        )}
                      >
                        {String(hour).padStart(2, "0")}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>

              {/* Separator */}
              <Text className="text-2xl font-bold text-foreground">:</Text>

              {/* Minutes */}
              <View className="flex-1">
                <Text className="text-center text-sm text-muted mb-2">
                  Minutes
                </Text>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  scrollEventThrottle={16}
                >
                  {minutesList.map((minute) => (
                    <Pressable
                      key={minute}
                      onPress={() => setMinutes(minute)}
                      style={({ pressed }) => [
                        {
                          paddingVertical: 12,
                          paddingHorizontal: 16,
                          borderRadius: 8,
                          backgroundColor:
                            minutes === minute ? colors.primary : "transparent",
                          opacity: pressed ? 0.7 : 1,
                        },
                      ]}
                    >
                      <Text
                        className={cn(
                          "text-center font-semibold",
                          minutes === minute
                            ? "text-background"
                            : "text-foreground"
                        )}
                      >
                        {String(minute).padStart(2, "0")}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            </View>

            {/* Buttons */}
            <View className="flex-row gap-3">
              <Pressable
                onPress={() => setShowPicker(false)}
                style={({ pressed }) => [
                  {
                    flex: 1,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    backgroundColor: colors.surface,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <Text className="text-center font-semibold text-foreground">
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                onPress={handleConfirm}
                style={({ pressed }) => [
                  {
                    flex: 1,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    backgroundColor: colors.primary,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <Text className="text-center font-semibold text-background">
                  Confirm
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
