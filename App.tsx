import { StatusBar } from "expo-status-bar";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/navigators/RootStack";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { light as lightTheme } from "./custom-theme";
import { default as mapping } from './mapping.json';


export default function App() {

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={lightTheme} customMapping={mapping}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}
