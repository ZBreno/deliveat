import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LocationScreen from "../screens/LocationScreen";
import HomeTabs from "./HomeTabs";

export type AppStackParamList = {
  Home: undefined;
  Location: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

export default function AppStack() {
  const waiting = true;

  return (
    <Stack.Navigator initialRouteName={waiting ? "Home" : "Location"}>
      <Stack.Screen
        name="Location"
        component={LocationScreen}
      />
      <Stack.Screen
        name="Home"
        component={HomeTabs}
        
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
