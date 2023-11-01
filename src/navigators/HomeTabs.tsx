import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { NavigatorScreenParams } from "@react-navigation/native";
import { Icon, useTheme } from "@ui-kitten/components";
import React from "react";

import SearchStack, { SearchStackParamlist } from "./SearchStack";
import OrderStack, { OrderStackParamlist } from "./OrderStack";
import ShopStack, { ShopStackParamlist } from "./ShopStack";
import ProfileStack, { ProfileStackParamlist } from "./ProfileStack";
import TabBarComponent from "../components/TabBar";
import HomeStack, { HomeStackParamlist } from "./HomeStack";
import NotificationScreen from "../screens/NotificationScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NotificationStackParamList } from "./NotificationStack";

export type HomeTabsParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamlist>;
  SearchTab: NavigatorScreenParams<SearchStackParamlist>;
  OrderTab: NavigatorScreenParams<OrderStackParamlist>;
  ShopTab: NavigatorScreenParams<ShopStackParamlist>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamlist>;
};

const Tab = createBottomTabNavigator<HomeTabsParamList>();

const Stack = createStackNavigator<NotificationStackParamList>();

export default function HomeTabs() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      tabBar={(props) => <TabBarComponent {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: false,
        tabBarActiveTintColor: theme["color-primary-default"],
        tabBarInactiveTintColor: theme["color-basic-600"],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "SearchTab") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "OrderTab") {
            iconName = focused ? "settings-2" : "settings-2-outline";
          } else if (route.name === "ShopTab") {
            iconName = focused ? "shopping-bag" : "shopping-bag-outline";
          } else if (route.name === "ProfileTab") {
            iconName = focused ? "settings-2" : "person-outline";
          }

          return (
            <Icon
              name={iconName}
              style={{ width: size, height: size }}
              fill={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: "Início",
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchStack}
        options={{ title: "Procurar" }}
      />
      <Tab.Screen
        name="OrderTab"
        component={OrderStack}
        options={{ title: "Pedidos" }}
      />
      <Tab.Screen
        name="ShopTab"
        component={ShopStack}
        options={{ title: "Sacola" }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{ title: "Perfil" }}
      />
    </Tab.Navigator>
  );
}
