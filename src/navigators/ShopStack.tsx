import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SearchScreen from "../screens/SearchScreen";
import ShopScreen from "../screens/ShopScreen";

export type ShopStackParamlist = {
  Shop: undefined;
};

const Stack = createStackNavigator<ShopStackParamlist>();

export default function ShopStack() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          title: "tela da sacola",
        }}
      />
    </Stack.Navigator>
  );
}
