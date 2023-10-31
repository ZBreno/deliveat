import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import AppStack, { AppStackParamList } from "./AppStack";
import LoginScreen from "../screens/LoginScreen";
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import WelcomeScreen from "../screens/WelcomeScreen";
import LocationScreen from "../screens/LocationScreen";

export type RootStackParamList = {
  Login: undefined;
  Welcome: undefined;
  Location: undefined;
  App: NavigatorScreenParams<AppStackParamList>;
};



const Stack = createStackNavigator<RootStackParamList>();

SplashScreen.preventAutoHideAsync();
export default function RootStack() {

  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  let customFonts = {
    'Poppins-Black': require('../../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../../assets/fonts/Poppins-Thin.ttf'),
  };

  useEffect(() => {
    async function loadFontsAsync() {
      await Font.loadAsync(customFonts);
      setFontsLoaded(true);
    }

    loadFontsAsync();
  }, []);

  const user = true;

  const onLayoutRootView = useCallback(async () => {
    if (user) {
      await SplashScreen.hideAsync();
    }
  }, [user, fontsLoaded]);

  if (!fontsLoaded || user === null) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>

      <Stack.Navigator>
        {user === true ? (
          <>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Location"
              component={LocationScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="App"
              component={AppStack}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </View>
  );
}
