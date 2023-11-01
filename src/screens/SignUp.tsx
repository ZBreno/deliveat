import { View, ScrollView } from "react-native";
import React from "react";
import { Button, Text, useTheme } from "@ui-kitten/components";
import HeaderNavigation from "../components/HeaderNavigation";
import ArrowBack from "../components/ArrowBack";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../navigators/RootStack";
import { DatePickerField, InputField, InputMaskField } from "../components/Form/FormFields";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { validateCPF } from "../utils/validateDocument";
import { Masks } from "react-native-mask-input";
import { dateYearsFromNow } from "../utils/dateUtils";

export type SignUpScreenProps = StackScreenProps<RootStackParamList, "SignUp">;

export default function SignUp({ navigation }: SignUpScreenProps) {
  const theme = useTheme();

  const schema = Yup.object().shape({
    name: Yup.string().required("Esse campo é obrigatório"),
    birthdate: Yup.date().required("Esse campo é obrigatório"),
    cpf: Yup.string()
      .max(14, "CPF inválido")
      .test("valid-cpf", "CPF inválido", (value) => {
        // Chame sua função de validação de CPF aqui
        return validateCPF(value);
      })
      .required("Esse campo é obrigatório"),
    email: Yup.string()
      .email("Insira um e-mail válido")
      .required("Esse campo é obrigatório"),
    phone: Yup.string()
      .required("Campo obrigatório")
      .matches(/^\d{11}$/, "Telefone inválido"),
    password: Yup.string()
      .required("A senha é obrigatória")
      .min(8, "A senha deve conter pelo menos 8 caracteres"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "As senhas não coincidem")
      .required("Confirmação de senha é obrigatória"),
  });

  const { control, handleSubmit, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => alert(JSON.stringify(data, null, 2));

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: 16 }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <HeaderNavigation
          childrenLeft={<ArrowBack />}
        />
        <Text category="h6" style={{ marginBottom: 16 }}>
          Meus dados
        </Text>

        <View style={{ gap: 16, marginBottom: 32 }}>
          <InputField
            control={control}
            name="name"
            label="Nome*"
            placeholder="Digite seu nome"
          />
          <DatePickerField
            control={control}
            name="birthdate"
            label="Data de nascimento*"
            placeholder="Selecione uma data"
            max={dateYearsFromNow(18)}
          />
          <InputMaskField
            control={control}
            name="cpf"
            label="CPF*"
            placeholder="Digite seu CPF"
            mask={Masks.BRL_CPF}
          />
          <InputField
            control={control}
            name="email"
            label="E-mail*"
            placeholder="Digite seu e-mail"
          />
          <InputMaskField
            control={control}
            name="phone"
            label="Telefone*"
            placeholder="Digite seu telefone"
            mask={Masks.BRL_PHONE}
          />
          <InputField
            control={control}
            name="password"
            label="Senha*"
            placeholder="Digite sua senha"
          />
          <InputField
            control={control}
            name="confirmPassword"
            label="Confirme sua senha*"
            placeholder="Digite seu senha novamente"
          />

          <Button
            size="small"
            style={{ marginTop: 16, borderRadius: 8 }}
            onPress={handleSubmit(onSubmit)}
          >
            {() => (
              <Text category="s2" style={{ color: theme["white"] }}>
                Criar conta
              </Text>
            )}
          </Button>

          <View>
            <Text style={{ textAlign: "center", fontSize: 14 }}>
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
        </View>
      </ScrollView>
    </View>
  );
}
