import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import React from "react";
import { Button, Text, useTheme } from "@ui-kitten/components";
import { useForm } from "react-hook-form";
import { InputField } from "../components/Form/FormFields";
import Icon from "../components/Icon";
import HeaderNavigation from "../components/HeaderNavigation";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../navigators/RootStack";
import ArrowBack from "../components/ArrowBack";

export type LocationScreenProps = StackScreenProps<RootStackParamList, "Location">;

export default function LocationScreen({ navigation }: LocationScreenProps) {
  const theme = useTheme();

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      location: "",
    },
  });

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: "white",
      }}
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <HeaderNavigation
          childrenLeft={<ArrowBack />}
        />

        <Text style={{ textAlign: "center", fontSize: 16, marginBottom: 16 }}>
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
        <Button
          appearance="ghost"
          onPress={() => {
            alert("calmo pae");
          }}
          style={{
            justifyContent: "flex-start",
            paddingHorizontal: 0,
            paddingVertical: 8,
            marginTop: 8,
            backgroundColor: "transparent",
          }}
          accessoryRight={() => (
            <View style={{ marginRight: -8 }}>
              <Icon
                name="chevron-right-outline"
                size={26}
                themeFillColor="color-primary-500"
              />
            </View>
          )}
        >
          {() => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
                marginLeft: -4,
              }}
            >
              <Icon name="pin-outline" size={32} />
              <View style={{ marginLeft: 4 }}>
                <Text category="label">Usar minha localização</Text>
                <Text category="c1">Ativar permissão</Text>
              </View>
            </View>
          )}
        </Button>

        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Image source={require("../assets/location-dinner.png")} />
        </View>
        
        <View style={{ flex: 1  }}>
          <Text style={{ textAlign: "center", marginTop: 24, fontSize: 14}}>
            Já tem uma conta?
          </Text>
          <Button
            appearance="ghost"
            size="small"
            style={{
              paddingHorizontal: 0,
              paddingVertical: 0,
              marginTop: -8,
              backgroundColor: "transparent",
            }}
            onPress={() => navigation.navigate("Login")}
          >
            {(evaprops) => (
              <Text
                {...evaprops}
                category="label"
                style={{
                  fontSize: 13,
                  color: theme["color-primary-500"],
                  
                }}
              >
                Entre aqui
              </Text>
            )}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
