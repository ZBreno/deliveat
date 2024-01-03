import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SearchScreen from "../screens/SearchScreen";
import ShopScreen from "../screens/ShopScreen";
import ShopFinish from "../screens/ShopFinish";

export type ShopStackParamlist = {
  Shop: undefined;
  ShopFinish: {
    total: number;
    ticket: number;
    totalFinal: number;
    delivery_cost: number;
  };
};

const Stack = createStackNavigator<ShopStackParamlist>();

export default function ShopStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ShopFinish"
        component={ShopFinish}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
