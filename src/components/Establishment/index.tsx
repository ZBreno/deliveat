import { Image, View } from "react-native";
import React from "react";
import { Text } from "@ui-kitten/components";

type EstablishmentProps = {
  title: string;
  source: {
    height: number;
    width: number;
    uri: string;
  };
  
};

export default function Establishment({ title, source }: EstablishmentProps) {
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={source}
        style={{
          width: 60,
          height: 60,
          borderRadius: 30, // Metade da largura ou altura
          resizeMode: "cover",
        }}
      />
      <Text style={{ textAlign: "center", fontSize: 12, marginTop: 4 }}>
        {title}
      </Text>
    </View>
  );
}
