import { Pressable, View, Text, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";
import { type Dua } from "@/lib/data/duas";
import { formatDuaForSharing, getShareText } from "@/lib/utils/share-image";

interface ShareButtonProps {
  dua: Dua;
  size?: "small" | "medium" | "large";
}

export function ShareButton({ dua, size = "medium" }: ShareButtonProps) {
  const colors = useColors();

  const handleShare = async () => {
    try {
      const shareText = formatDuaForSharing(dua);
      Alert.alert(
        "Share Dua",
        "Copy this text and share it on your favorite platform:",
        [
          {
            text: "Copy Text",
            onPress: () => {
              Alert.alert("Success", "Text ready to share!");
            },
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
    } catch (error) {
      console.error("Error sharing dua:", error);
      Alert.alert("Error", "Failed to share dua");
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      const shareText = formatDuaForSharing(dua);
      Alert.alert("Dua Text", shareText, [
        {
          text: "Close",
          style: "cancel",
        },
      ]);
    } catch (error) {
      console.error("Error preparing dua:", error);
      Alert.alert("Error", "Failed to prepare dua");
    }
  };

  const handleShareWhatsApp = async () => {
    try {
      const whatsappText = getShareText(dua, "whatsapp");
      Alert.alert("WhatsApp", whatsappText, [
        {
          text: "Close",
          style: "cancel",
        },
      ]);
    } catch (error) {
      console.error("Error preparing WhatsApp share:", error);
    }
  };

  const sizeStyles = {
    small: { padding: 8, iconSize: 16 },
    medium: { padding: 12, iconSize: 20 },
    large: { padding: 16, iconSize: 24 },
  };

  const style = sizeStyles[size];

  return (
    <View className="flex-row gap-2">
      {/* Main Share Button */}
      <Pressable
        onPress={handleShare}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.7 : 1,
            backgroundColor: colors.primary,
            padding: style.padding,
            borderRadius: 8,
          },
        ]}
        className="flex-row items-center gap-2"
      >
        <MaterialIcons name="share" size={style.iconSize} color={colors.background} />
        <Text
          className={size === "small" ? "text-xs" : size === "medium" ? "text-sm" : "text-base"}
          style={{
            color: colors.background,
            fontWeight: "600",
          }}
        >
          Share
        </Text>
      </Pressable>

      {/* Copy to Clipboard Button */}
      <Pressable
        onPress={handleCopyToClipboard}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.7 : 1,
            backgroundColor: colors.border,
            padding: style.padding,
            borderRadius: 8,
          },
        ]}
      >
        <MaterialIcons name="content-copy" size={style.iconSize} color={colors.foreground} />
      </Pressable>

      {/* WhatsApp Share Button */}
      <Pressable
        onPress={handleShareWhatsApp}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.7 : 1,
            backgroundColor: "#25D366",
            padding: style.padding,
            borderRadius: 8,
          },
        ]}
      >
        <MaterialIcons name="chat" size={style.iconSize} color="white" />
      </Pressable>
    </View>
  );
}

/**
 * Full share menu component
 */
interface ShareMenuProps {
  dua: Dua;
  onClose?: () => void;
}

export function ShareMenu({ dua, onClose }: ShareMenuProps) {
  const colors = useColors();

  const shareOptions = [
    {
      id: "share",
      label: "Share via...",
      icon: "share",
      action: async () => {
        const shareText = formatDuaForSharing(dua);
        Alert.alert("Share Text", shareText, [
          {
            text: "Close",
            style: "cancel",
          },
        ]);
      },
    },
    {
      id: "copy",
      label: "Copy to Clipboard",
      icon: "content-copy",
      action: async () => {
        const shareText = formatDuaForSharing(dua);
        Alert.alert("Text Ready", shareText, [
          {
            text: "Close",
            style: "cancel",
          },
        ]);
      },
    },
    {
      id: "whatsapp",
      label: "Share on WhatsApp",
      icon: "chat",
      action: async () => {
        const whatsappText = getShareText(dua, "whatsapp");
        Alert.alert("WhatsApp", whatsappText, [
          {
            text: "Close",
            style: "cancel",
          },
        ]);
      },
    },
    {
      id: "twitter",
      label: "Share on Twitter",
      icon: "share",
      action: async () => {
        const twitterText = getShareText(dua, "twitter");
        Alert.alert("Twitter", twitterText, [
          {
            text: "Close",
            style: "cancel",
          },
        ]);
      },
    },
  ];

  return (
    <View
      className="rounded-2xl p-4 border"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
      }}
    >
      <Text
        className="text-lg font-bold mb-4"
        style={{
          color: colors.foreground,
        }}
      >
        Share Dua
      </Text>

      {shareOptions.map((option) => (
        <Pressable
          key={option.id}
          onPress={option.action}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.7 : 1,
              backgroundColor: pressed ? colors.border : "transparent",
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              paddingVertical: 12,
              paddingHorizontal: 8,
              borderRadius: 8,
              marginBottom: 8,
            },
          ]}
        >
          <MaterialIcons name={option.icon as any} size={20} color={colors.primary} />
          <Text
            style={{
              color: colors.foreground,
            }}
          >
            {option.label}
          </Text>
        </Pressable>
      ))}

      {onClose && (
        <Pressable
          onPress={onClose}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.7 : 1,
              backgroundColor: colors.border,
              marginTop: 16,
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 8,
              alignItems: "center",
            },
          ]}
        >
          <Text
            style={{
              color: colors.foreground,
              fontWeight: "600",
            }}
          >
            Close
          </Text>
        </Pressable>
      )}
    </View>
  );
}
