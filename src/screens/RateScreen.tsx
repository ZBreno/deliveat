import {
  View,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  ScrollView,
} from "react-native";
import React from "react";
import HeaderNavigation from "../components/HeaderNavigation";
import LocationUser from "../components/LocationUser";
import NotificationTicket from "../components/NotificationIcon";
import { InputField } from "../components/Form/FormFields";
import { useForm } from "react-hook-form";
import Icon from "../components/Icon";
import { Button, Text } from "@ui-kitten/components";
import Category from "../components/Category";
import { useGetCategories } from "../hooks/categories";
import * as Yup from "yup";
import { useCreateRating } from "../hooks/rating";
import { useAuth } from "../hooks/useAuth";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../navigators/AppStack";
import { StackScreenProps } from "@react-navigation/stack";
import ArrowBack from "../components/ArrowBack";
import { yupResolver } from "@hookform/resolvers/yup";
export type RateScreenProps = StackScreenProps<AppStackParamList, "RateScreen">;
export default function RateScreen({ navigation, route }) {
  const createRatingMutation = useCreateRating();

  const schema = Yup.object().shape({
    rating: Yup.number()
      .transform((value) => (Number.isNaN(value) ? 0 : value))
      .min(0, "O valor deve ser no mínimo 0")
      .max(5, "O valor deve ser no máximo 5")
      .positive("O valor deve ser um número positivo")
      .nullable(),
    description: Yup.string().nullable(),
  });
  const { control, handleSubmit, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      rating: "",
      description: "",
    },
    resolver: yupResolver(schema),
  });
  const { user } = useAuth();
  const onSubmit = (data) => {
    createRatingMutation.mutate(
      {
        user_id: user.id,
        order_id: route.params.orderUUID,
        ...data,
      },
      {
        onSuccess: () => {
          ToastAndroid.show("Avaliação enviada!", ToastAndroid.SHORT);
          navigation.navigate("Home");
        },
        onError: () => {
          ToastAndroid.show(
            "Não foi possivel enviar a avaliação!",
            ToastAndroid.SHORT
          );
        },
      }
    );
  };

  return (
    <ScrollView
      style={{ paddingHorizontal: 16, flex: 1, backgroundColor: "white" }}
    >
      <HeaderNavigation
        childrenLeft={<ArrowBack />}
        childrenCenter={
          <Text style={{ textAlign: "center", fontSize: 16 }}>Avaliar</Text>
        }
        childrenRight={
          <Button
            size="small"
            style={{ borderRadius: 32 }}
            onPress={handleSubmit(onSubmit)}
          >
            Enviar
          </Button>
        }
      />
      <View style={{ gap: 16 }}>
        <InputField
          control={control}
          name="rating"
          placeholder="Digite aqui"
          label="Avaliação"
          keyboardType="numeric"
        />
        <InputField
          control={control}
          placeholder="Digite aqui"
          name="description"
          label="Comentário"
        />
      </View>
    </ScrollView>
  );
}
