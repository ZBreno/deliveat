import { View } from "react-native";
import React from "react";
import { Text, useTheme } from "@ui-kitten/components";

type TicketProps = {
  title: string;
  description: string;
  deadline: string;
  discount: string;
  code: string;
};

export default function Ticket({
  title,
  description,
  deadline,
  code,
  discount,
}: TicketProps) {
  const theme = useTheme();
  const deadlineFormated = new Date(deadline);
  const day = deadlineFormated.getDate();
  const month = deadlineFormated.toLocaleString("pt-BR", { month: "long" }); // Mês por extenso
  const year = deadlineFormated.getFullYear();
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
          justifyContent: "center",
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
          R$ {discount}
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
          <Text style={{ fontSize: 14 }}>{title} ({code})</Text>
          <Text
            style={{
              fontSize: 10,
              color: theme["color-primary-500"],
              marginTop: -6,
            }}
          >
            {description}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 11 }}>
            Disponível até {day} de {month} de {year}{" "}
          </Text>
        </View>
      </View>
    </View>
  );
}
