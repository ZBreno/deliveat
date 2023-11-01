import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LocationScreen from "../screens/LocationScreen";
import HomeTabs from "./HomeTabs";
import NotificationStack from "./NotificationStack";
import NotificationScreen from "../screens/NotificationScreen";
import HomeStack from "./HomeStack";
import OrderStack from "./OrderStack";
import ProfileStack from "./ProfileStack";
import ShopStack from "./ShopStack";
import SearchStack from "./SearchStack";

export type AppStackParamList = {
  Home: undefined;
  Location: undefined;
  NotificationStack: undefined;
  homeStack: undefined;
  OrderStack: undefined;
  ProfileStack: undefined;
  ShopStack: undefined;
  SearchStack: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

export default function AppStack() {
  const waiting = true;

  return (
    <Stack.Navigator initialRouteName={waiting ? "Home" : "Location"}>
      <Stack.Screen
        name="Location"
        component={LocationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotificationStack"
        component={NotificationStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="homeStack"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderStack"
        component={OrderStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShopStack"
        component={ShopStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchStack"
        component={SearchStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
