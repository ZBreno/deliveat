import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Layout, Text, ViewPager, useTheme } from "@ui-kitten/components";
import HeaderNavigation from "../components/HeaderNavigation";
import ArrowBack from "../components/ArrowBack";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamlist } from "../navigators/HomeStack";
import Icon from "../components/Icon";

export type ProfileStoreScreenProps = StackScreenProps<
  HomeStackParamlist,
  "ProfileStore"
>;

export default function ProfileStoreScreen() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 16 }}>
      <HeaderNavigation
        childrenLeft={<ArrowBack />}
        childrenCenter={<View />}
        childrenRight={
          <TouchableOpacity style={{ marginTop: 10 }}>
            <Icon name="search" themeFillColor="color-primary-500" size={24} />
          </TouchableOpacity>
        }
      />
      <Text>ProfileStore</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    height: 192,
    alignItems: "center",
    justifyContent: "center",
  },
});
