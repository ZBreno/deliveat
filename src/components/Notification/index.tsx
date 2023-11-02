import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Text, useTheme } from "@ui-kitten/components";
import Icon from "../Icon";
import { NotificationScreenProps } from "../../screens/NotificationScreen";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../../navigators/AppStack";


export default function NotificationTicket() {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", flex: 1, position: "relative" }}
      onPress={() => navigation.navigate('NotificationStack')}
    >
      <View
        style={{
          backgroundColor: theme["color-primary-500"],
          width: 12,
          height: 12,
          borderRadius: 6,
          marginLeft: 2,
          position: "absolute",
          zIndex: 1,
          left: -1,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 12,
            position: "absolute",
            color: theme["white"],
            alignItems: "center",
            justifyContent: "center",
            left: 2,
            top: -3,
          }}
        >
          5
        </Text>
      </View>
      <Icon name="bell-outline" themeFillColor="color-primary-500" size={28} />
    </TouchableOpacity>
  );
}
