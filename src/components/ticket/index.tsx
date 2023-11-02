import { View } from "react-native";
import React from "react";
import { Text, useTheme } from "@ui-kitten/components";
import { ImageBackground } from "expo-image";

type TicketProps = {
  title: string;
  role: string;
  deadline: string;
};

export default function Ticket({ title, role, deadline }: TicketProps) {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: theme["color-bg-stroke"],
        borderRadius: 8,
      }}
    >
      <View
        style={{
          width: "35%",
          backgroundColor: theme["color-primary-500"],
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          justifyContent: 'center'
        }}
      >
        <Text
          style={{
            fontSize: 26,
            color: theme["white"],
            paddingVertical: 16,
            textAlign: "center",
          }}
          category="h6"
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          width: "65%",
          paddingLeft: 8,
          justifyContent: "space-between",
          paddingVertical: 4,
        }}
      >
        <View>
          <Text style={{ fontSize: 14 }}>Cupom de boas vindas</Text>
          <Text
            style={{
              fontSize: 10,
              color: theme["color-primary-500"],
              marginTop: -6,
            }}
          >
            {role}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 11 }}>Disponível até {deadline} </Text>
        </View>
      </View>
    </View>
  );
}
