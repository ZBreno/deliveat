import { View, Image } from "react-native";
import React from "react";
import { Text, TextElement, useTheme } from "@ui-kitten/components";
import reactStringReplace from "react-string-replace";

type NotificationProps = {
  title: string;
  description: string;
  code: string;
  time: string;
};
export default function Notification({
  title,
  description,
  code,
  time,
}: NotificationProps) {
  const theme = useTheme();

  const descripitionReplaced = reactStringReplace(
    description,
    code,
    (match) => (
      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 13 }}>
        {match}
      </Text>
    )
  );

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: theme["color-bg-stroke"],
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 16,
        borderWidth: 0.5,
        borderColor: theme["color-border"],
      }}
    >
      <View style={{ justifyContent: "center" }}>
        <Image
          source={require("../../assets/icon-notification.png")}
          style={{ width: 80, height: 64 }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, fontFamily: "Poppins-SemiBold" }}>
          {title}
        </Text>
        <Text style={{ fontSize: 12 }}>
          {descripitionReplaced[0] as TextElement}
          {descripitionReplaced[1] as TextElement}
          {descripitionReplaced[2] as TextElement}
        </Text>
        <Text
          style={{ fontSize: 11, marginTop: 10, color: theme["color-sended"] }}
        >
          {time}
        </Text>
      </View>
    </View>
  );
}
