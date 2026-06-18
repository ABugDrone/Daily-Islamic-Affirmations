import { Text, View } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface ProgressIndicatorProps {
  completed: number;
  total: number;
  label?: string;
}

export function ProgressIndicator({
  completed,
  total,
  label = "Today's Affirmations",
}: ProgressIndicatorProps) {
  const colors = useColors();
  const percentage = (completed / total) * 100;

  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-2">
        <Text
          className="text-sm font-semibold"
          style={{
            color: colors.foreground,
          }}
        >
          {label}
        </Text>
        <Text
          className="text-sm font-bold"
          style={{
            color: colors.primary,
          }}
        >
          {completed}/{total} Completed
        </Text>
      </View>

      {/* Progress Bar */}
      <View
        className="h-2 rounded-full overflow-hidden"
        style={{
          backgroundColor: colors.border,
        }}
      >
        <View
          className="h-full rounded-full transition-all"
          style={{
            width: `${percentage}%`,
            backgroundColor: colors.primary,
          }}
        />
      </View>
    </View>
  );
}
