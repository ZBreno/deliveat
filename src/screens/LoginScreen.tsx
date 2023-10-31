import { Image, ScrollView, View, StyleSheet } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Button, Text, useTheme } from "@ui-kitten/components";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

export default function LoginScreen() {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 16,
        justifyContent: "center",
      }}
    >
      <Text style={{ marginTop: 32 }} category="h5">
        Bem vindo ao Deliveat
      </Text>
    </View>
  );
}
