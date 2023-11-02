import { Image, View } from "react-native";
import React from "react";
import { Text } from "@ui-kitten/components";

type CategoryProps = {
  title: string;
  source: any;
  width: number;
  height: number;
};

export default function Category({
  title,
  source,
  height,
  width,
}: CategoryProps) {
  return (
    <View >
      <Image
        source={source}
        resizeMode="cover"
        width={width}
        height={height}
      />
      <Text style={{textAlign: 'center', fontSize: 12}}>{title}</Text>
    </View>
  );
}
