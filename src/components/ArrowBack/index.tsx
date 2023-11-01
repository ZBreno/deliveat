import { Button } from "@ui-kitten/components";
import { View } from "react-native";
import Icon from "../Icon";
import { useNavigation } from "@react-navigation/native";
import type { WelcomeScreenProps } from "../../screens/WelcomeScreen";
import { LoginScreenProps } from "../../screens/LoginScreen";
import { LocationScreenProps } from "../../screens/LocationScreen";
import { SignUpScreenProps } from "../../screens/SignUp";
import { NotificationScreenProps } from "../../screens/NotificationScreen";

type WelcomeScreenNavigationProp = WelcomeScreenProps["navigation"];
type LoginScreenNavigationProp = LoginScreenProps["navigation"];
type LocationScreenNavigationProp = LocationScreenProps["navigation"];
type SignUpScreenNavigationProp = SignUpScreenProps["navigation"];
type NotificationScreenNavigationProp = NotificationScreenProps["navigation"];

type AnyNavigationProp =
  | WelcomeScreenNavigationProp
  | LoginScreenNavigationProp
  | LocationScreenNavigationProp
  | SignUpScreenNavigationProp
  | NotificationScreenNavigationProp;

export default function ArrowBack() {
  const navigation = useNavigation<AnyNavigationProp>();

  return (
    <Button
      appearance="ghost"
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 0,
        paddingVertical: 0,
        backgroundColor: "transparent",
      }}
      onPress={() => navigation.goBack()}
    >
      {() => (
        <View style={{ marginLeft: -8 }}>
          <Icon
            name="chevron-left-outline"
            themeFillColor="color-primary-500"
            size={32}
          />
        </View>
      )}
    </Button>
  );
}
