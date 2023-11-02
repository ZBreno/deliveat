import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProfileScreen from "../screens/ProfileScreen";

export type ProfileStackParamlist = {
  Profile: undefined;
};

const Stack = createStackNavigator<ProfileStackParamlist>();

export default function ProfileStack() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
