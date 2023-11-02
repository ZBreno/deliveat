import { View } from "react-native";
import React from "react";
import { Text } from "@ui-kitten/components";

type HeaderNavigationProps = {
  childrenLeft?: React.ReactNode;
  childrenCenter?: React.ReactNode;
  childrenRight?: React.ReactNode;
};
export default function HeaderNavigation({
  childrenLeft,
  childrenRight,
  childrenCenter,
}: HeaderNavigationProps) {
  return (
    <View
      style={{
        justifyContent: "space-between",
        marginTop: 48,
        marginBottom: 24,
        flexDirection: "row",
      }}
    >
      {childrenLeft && (
        <View style={{ flex: 1 }}>
          {childrenLeft}
        </View>
      )}

      {childrenCenter && (
        <View style={{ flex: 1, justifyContent: 'center', marginTop: 4 }}>{childrenCenter}</View>
      )}

      {childrenRight && (
        <View style={{ flex: 1, alignItems: "flex-end" }}>{childrenRight}</View>
      )}
    </View>
  );
}
