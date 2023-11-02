import { View, Image } from "react-native";
import React from "react";
import { Text, useTheme } from "@ui-kitten/components";
import Icon from "../Icon";

type StoreProps = {
  name: string;
  image: {
    height: number;
    width: number;
    uri: string;
  };
  category: string;
  open: boolean;
  time: string;
  cost_delivery: string;
  rate: string;
};

export default function Store({
  name,
  category,
  cost_delivery, 
  image,
  open,
  rate,
  time,
}: StoreProps) {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ justifyContent: "center" }}>
        <Image
          source={image}
          style={{
            width: 80,
            height: 80,
            borderRadius: 40, // Metade da largura ou altura
            resizeMode: "cover",
          }}
        />
      </View>
      <View style={{ marginLeft: 8, justifyContent: "space-between" }}>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text category="s1" style={{ marginRight: 6 }}>
              {name}
            </Text>
            <Icon name="star" themeFillColor="color-warning-800" size={14} />
            <Text
              category="h4"
              style={{
                color: theme["color-warning-900"],
                fontSize: 10,
                textAlign: "center",
                marginTop: 2,
              }}
            >
              {rate}
            </Text>
          </View>

          <Text style={{ fontSize: 11, marginTop: -6 }}>{category}</Text>
        </View>
        <View>
          <Text
            style={{
              color: theme[open ? "color-success-900" : "disabled"],
              fontSize: 12,
            }}
          >
            {open ? "Aberto agora" : "Fechado"}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: -6,
            }}
          >
            <Text style={{ fontSize: 12, marginRight: 4 }}>{time}</Text>
            <View
              style={{
                backgroundColor: theme["color-text"],
                width: 5,
                height: 5,
                alignItems: "center",
                borderRadius: 5,
              }}
            />
            <Text style={{ fontSize: 12, marginLeft: 4 }}>R$ {cost_delivery}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
