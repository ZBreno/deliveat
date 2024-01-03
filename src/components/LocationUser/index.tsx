import { TouchableOpacity } from "react-native";
import React from "react";
import { Text } from "@ui-kitten/components";
import Icon from "../Icon";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../../navigators/AppStack";

export default function LocationUser() {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
      onPress={() => navigation.navigate("Location")}
    >
      <Text category="s1">Pau dos Ferros, RN</Text>
      <Icon
        name="chevron-down-outline"
        size={20}
        themeFillColor="color-primary-500"
      />
    </TouchableOpacity>
  );
}
