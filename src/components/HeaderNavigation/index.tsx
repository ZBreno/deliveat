import { View } from "react-native";
import React from "react";
import { Text } from "@ui-kitten/components";

type HeaderNavigationProps = {
  childrenLeft: React.ReactNode;
  childrenRight?: React.ReactNode;
};
export default function HeaderNavigation({
  childrenLeft,
  childrenRight,
}: HeaderNavigationProps) {
  return (
    <View style={{ justifyContent: "space-between", marginTop: 48, marginBottom: 24, flexDirection: 'row' }}>
      <View>{childrenLeft}</View>
      <View style={{flex: 1}}>{childrenRight}</View>
    </View>
  );
}
