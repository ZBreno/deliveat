import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import ProfileStoreScreen from "../screens/ProfileStoreScreen";

export type HomeStackParamlist = {
  Home: undefined;
  ProfileStore: { uuid: string };
};

const Stack = createStackNavigator<HomeStackParamlist>();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileStore"
        component={ProfileStoreScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
