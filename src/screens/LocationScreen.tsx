import { View } from "react-native";
import React from "react";
import { Text } from "@ui-kitten/components";
import { useForm } from "react-hook-form";
import { InputField } from "../components/Form/FormFields";
import Icon from "../components/Icon";
export default function LocationScreen() {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      location: "",
    },
  });

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: "center",
      }}
    >
      <View style={{ gap: 16 }}>
        <Text style={{ textAlign: "center", fontSize: 16 }}>
          Em que local deseja receber seu pedido?
        </Text>
        <InputField
          name="location"
          control={control}
          placeholder="Endereço e número"
          size="large"
          accessoryLeft={() => (
            <Icon name="search" themeFillColor="color-primary-500" size={24} />
          )}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="pin-outline" size={32} />
            <View style={{ marginLeft: 4 }}>
              <Text category="label">Usar minha localização</Text>
              <Text category="c1">Ativar permissão</Text>
            </View>
          </View>
          <View>
            <Icon
              name="arrow-ios-forward-outline"
              size={24}
              themeFillColor="color-primary-500"
            />
          </View>
        </View>
      </View>
    </View>
  );
}
