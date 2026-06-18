import { Pressable, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";
import { formatAudioTime, calculateAudioProgress, type AudioTrack } from "@/lib/utils/audio-player";

interface AudioPlayerProps {
  track: AudioTrack;
  onClose?: () => void;
}

export function AudioPlayer({ track, onClose }: AudioPlayerProps) {
  const colors = useColors();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(track.duration);

  // Simulate audio playback
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 0.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleProgressChange = (newTime: number) => {
    setCurrentTime(newTime);
  };

  const progress = calculateAudioProgress(currentTime, duration);

  return (
    <View
      className={cn(
        "rounded-2xl p-6 border mb-4",
        "bg-surface border-border"
      )}
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
      }}
    >
      {/* Header */}
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1">
          <Text
            className="text-sm font-semibold mb-1"
            style={{
              color: colors.muted,
            }}
          >
            Audio Recitation
          </Text>
          <Text
            className="text-base font-bold"
            style={{
              color: colors.foreground,
            }}
          >
            {track.title}
          </Text>
          <Text
            className="text-xs mt-1"
            style={{
              color: colors.muted,
            }}
          >
            {track.reciter}
          </Text>
        </View>
        <Pressable onPress={onClose} className="p-2">
          <MaterialIcons name="close" size={20} color={colors.muted} />
        </Pressable>
      </View>

      {/* Progress Bar */}
      <View className="mb-4">
        <View
          className="h-1 rounded-full overflow-hidden mb-2"
          style={{
            backgroundColor: colors.border,
          }}
        >
          <View
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              backgroundColor: colors.primary,
            }}
          />
        </View>

        {/* Time Display */}
        <View className="flex-row justify-between">
          <Text
            className="text-xs font-semibold"
            style={{
              color: colors.foreground,
            }}
          >
            {formatAudioTime(currentTime)}
          </Text>
          <Text
            className="text-xs font-semibold"
            style={{
              color: colors.muted,
            }}
          >
            {formatAudioTime(duration)}
          </Text>
        </View>
      </View>

      {/* Controls */}
      <View className="flex-row justify-center gap-4">
        <Pressable
          onPress={handleStop}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.7 : 1,
              backgroundColor: colors.border,
              padding: 12,
              borderRadius: 9999,
            },
          ]}
        >
          <MaterialIcons name="stop" size={24} color={colors.foreground} />
        </Pressable>

        <Pressable
          onPress={handlePlayPause}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.9 : 1,
              backgroundColor: colors.primary,
              padding: 16,
              borderRadius: 9999,
            },
          ]}
        >
          <MaterialIcons
            name={isPlaying ? "pause" : "play-arrow"}
            size={28}
            color={colors.background}
          />
        </Pressable>

        <Pressable
          onPress={() => {
            // Mute/unmute functionality
          }}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.7 : 1,
              backgroundColor: colors.border,
              padding: 12,
              borderRadius: 9999,
            },
          ]}
        >
          <MaterialIcons name="volume-up" size={24} color={colors.foreground} />
        </Pressable>
      </View>

      {/* Info */}
      <Text
        className="text-xs text-center mt-4"
        style={{
          color: colors.muted,
        }}
      >
        🔊 Offline audio • No internet required
      </Text>
    </View>
  );
}
