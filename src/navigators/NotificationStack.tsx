import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import NotificationScreen from "../screens/NotificationScreen";
import { useNavigation } from "@react-navigation/native";

export type NotificationStackParamList = {
  Notification: undefined;
};

const Stack = createStackNavigator<NotificationStackParamList>();

export default function NotificationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
