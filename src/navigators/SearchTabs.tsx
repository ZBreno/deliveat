import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";

export type SearchStackParamlist = {
  Search: undefined;
};

const Stack = createStackNavigator<SearchStackParamlist>();

export default function SearchStack() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "tela de procurar por estabelecimentos",
        }}
      />
    </Stack.Navigator>
  );
}
