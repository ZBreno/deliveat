import { View } from "react-native";
import React from "react";
import { Text } from "@ui-kitten/components";
import Category from "../components/Category";
import HeaderNavigation from "../components/HeaderNavigation";
import ArrowBack from "../components/ArrowBack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamlist } from "../navigators/HomeStack";
import { CompositeScreenProps } from "@react-navigation/native";
import { NotificationStackParamList } from "../navigators/NotificationStack";
import NotificationTicket from "../components/Notification";

export type LoginScreenProps = CompositeScreenProps<
  StackScreenProps<HomeStackParamlist, "Home">,
  StackScreenProps<NotificationStackParamList>
>;

export default function HomeScreen() {
  const categories = [
    {
      title: "Restaurantes",
      width: 80,
      height: 58,
      source: require("../assets/restaurant-category.png"),
    },
    {
      title: "Bebidas",
      width: 80,
      height: 58,
      source: require("../assets/drinks-category.png"),
    },
    {
      title: "Padarias",
      width: 80,
      height: 58,
      source: require("../assets/bakery-category.png"),
    },
    {
      title: "Lanchonetes",
      width: 80,
      height: 58,
      source: require("../assets/snackbar-category.png"),
    },
  ];
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        paddingHorizontal: 16,
      }}
    >
      <HeaderNavigation
        childrenLeft={<Text>Cidade onde estou</Text>}
        childrenRight={<NotificationTicket />}
      />

      <View style={{ flexDirection: "row", gap: 16 }}>
        {categories.map(({ title, width, height, source }, index) => (
          <TouchableOpacity key={index}>
            <Category
              title={title}
              width={width}
              height={height}
              source={source}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
