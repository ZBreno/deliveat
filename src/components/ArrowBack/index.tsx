import { Button } from "@ui-kitten/components";
import { View } from "react-native";
import Icon from "../Icon";

export default function ArrowBack({ navigation }) {
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
