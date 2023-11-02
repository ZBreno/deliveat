import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import OrderScreen from "../screens/OrderScreen";

export type OrderStackParamlist = {
  Order: undefined;
};

const Stack = createStackNavigator<OrderStackParamlist>();

export default function OrderStack() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Order"
        component={OrderScreen}
        options={{
         headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
