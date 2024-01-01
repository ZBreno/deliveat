import { Image, ScrollView, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Button, Text, useTheme } from "@ui-kitten/components";

import HeaderNavigation from "../components/HeaderNavigation";
import ArrowBack from "../components/ArrowBack";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../navigators/RootStack";
import { useForm } from "react-hook-form";
import { InputField } from "../components/Form/FormFields";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Icon from "../components/Icon";
import { useAuth } from "../hooks/useAuth";

export type LoginScreenProps = StackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const theme = useTheme();

  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Insira um e-mail válido")
      .required("Esse campo é obrigatório"),
    password: Yup.string().required("Esse campo é obrigatório"),
  });

  const { control, handleSubmit, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const { loginMutation } = useAuth();

  const handleLogin = (values) => {
    loginMutation.mutate(values, {
      onSuccess: () => {},
      onError: () => {
        alert("Senha ou email incorreto!");
      },
    });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <HeaderNavigation childrenLeft={<ArrowBack />} />
        <Text style={{ textAlign: "center" }} category="h6">
          Bem-vindo de volta!
        </Text>
        <View style={{ marginTop: 32, alignItems: "center" }}>
          <Image source={require("../assets/login-dinner.png")} />
        </View>
        <View style={{ marginTop: 24, gap: 16 }}>
          <InputField
            label="E-mail ou Telefone*"
            placeholder="Digite o seu e-mail ou celular"
            control={control}
            name="email"
          />
          <InputField
            label="Senha*"
            placeholder="Digite o seu e-mail ou celular"
            control={control}
            name="password"
            secureTextEntry={hidePassword}
            accessoryRight={() => (
              <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                <Icon
                  themeFillColor="color-primary-500"
                  name={hidePassword ? "eye-outline" : "eye-off-outline"}
                />
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={{ alignItems: "flex-end", marginTop: 8 }}>
          <TouchableOpacity onPress={() => console.log("esqueceu ne safado")}>
            <Text status="primary">Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        <Button
          size="small"
          style={{ marginTop: 16, borderRadius: 8 }}
          onPress={handleSubmit(handleLogin)}
        >
          {() => (
            <Text category="s2" style={{ color: theme["white"] }}>
              Entrar
            </Text>
          )}
        </Button>

        <View style={{ flex: 1 }}>
          <Text style={{ textAlign: "center", marginTop: 24, fontSize: 14 }}>
            Não tem uma conta?
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
            onPress={() => navigation.navigate("SignUp")}
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
                Crie aqui
              </Text>
            )}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
