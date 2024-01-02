import { View, Image, TouchableOpacity, ToastAndroid } from "react-native";
import React from "react";
import { Text, useTheme } from "@ui-kitten/components";
import Icon from "../components/Icon";
import { useAuth } from "../hooks/useAuth";

export default function ProfileScreen() {
  const theme = useTheme();
  const { logoutMutation, user } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate(null, {
      onSuccess: async () => {
        ToastAndroid.show("Deslogado!", ToastAndroid.SHORT);
      },
    });
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ marginBottom: 32, alignItems: "center" }}>
        <Image
          source={{
            uri: `${process.env.EXPO_PUBLIC_API_URL_DELIVERY}${user.profile_picture}`,
          }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 75, // Metade da largura ou altura
            resizeMode: "cover",
          }}
        />
        <Text category="h6" style={{ color: theme["color-text"] }}>
          {user.name}
        </Text>
        <Text
          style={{
            color: theme["disabled"],
            fontFamily: "Poppins-Medium",
            marginTop: -8,
          }}
        >
          {user.email}
        </Text>
      </View>
      <View style={{ gap: 24 }}>
        <TouchableOpacity style={{ flexDirection: "row", gap: 24 }}>
          <Icon name="edit-2-outline" size={24} />
          <Text>Editar perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: "row", gap: 24 }}>
          <Icon name="shield-outline" size={24} />
          <Text>Política de privacidade</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: "row", gap: 24 }}>
          <Icon name="file-text-outline" size={24} />
          <Text>Termos e condições</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: "row", gap: 24 }}>
          <Icon name="pin-outline" size={24} />
          <Text>Meus endereços</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogout}
          style={{ flexDirection: "row", gap: 24 }}
        >
          <Icon
            name="log-out-outline"
            themeFillColor="color-danger-900"
            size={24}
          />
          <Text style={{ color: theme["color-danger-900"] }}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
