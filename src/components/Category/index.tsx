import { Image, View } from "react-native";
import React from "react";
import { Text } from "@ui-kitten/components";

type CategoryProps = {
  title: string;
  source: any;
  width: number;
  height: number;
  borderRadius: number;
};

export default function Category({
  title,
  source,
  height,
  width,
  borderRadius,
}: CategoryProps) {
  return (
    <View>
      <Image
        source={source}
        resizeMode="cover"
        style={{ height: height, width: width, borderRadius: borderRadius }}
      />
      <Text style={{ textAlign: "center", fontSize: 12, marginTop: 2 }}>{title}</Text>
    </View>
  );
}
