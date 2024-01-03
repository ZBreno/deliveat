import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Text, useTheme } from "@ui-kitten/components";
import { useGetStore } from "../../hooks/user";
import LoadingContainer from "../LoadingContainer";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../../navigators/AppStack";

type OrderProps = {
  store_id: string;
  code: string;
  status: string;
  id: string;
};

export default function Order({ store_id, code, status, id }: OrderProps) {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  const { isPending: isPendingStore, data: store } = useGetStore(store_id);

  if (isPendingStore) {
    return <LoadingContainer />;
  }

  return (
    <View
      style={{
        backgroundColor: theme["color-bg-stroke"],
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 16,
        }}
      >
        <View>
          <Image
            source={{
              uri: `${process.env.EXPO_PUBLIC_API_URL_DELIVERY}${store.profile_picture}`,
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              resizeMode: "cover",
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              flex: 1,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins-Medium",
                  marginBottom: 8,
                }}
              >
                {store.name}
              </Text>
              <View
                style={{ gap: 8, flexDirection: "row", alignItems: "center" }}
              >
                <Text style={{ fontSize: 12, fontFamily: "Poppins-Medium" }}>
                  código do pedido:
                </Text>
                <Text
                  style={{ fontSize: 10, fontFamily: "Poppins-Medium" }}
                  numberOfLines={3}
                >
                  #{code}
                </Text>
              </View>
              <View
                style={{ gap: 2, flexDirection: "row", alignItems: "center" }}
              >
                <Text style={{ fontSize: 12, fontFamily: "Poppins-Medium" }}>
                  status do pedido:
                </Text>
                <Text
                  style={{ fontSize: 10, fontFamily: "Poppins-Medium" }}
                  numberOfLines={3}
                >
                  {status}
                </Text>
              </View>
            </View>
            <View style={{ alignItems: "flex-end", flex: 1 }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("RateScreen", { orderUUID: id })
                }
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: theme["color-primary-500"],
                    fontSize: 12,
                    fontFamily: "Poppins-Medium",
                    minWidth: 43,
                    maxHeight: 20,
                  }}
                >
                  Avaliar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
        <TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              marginTop: 8,
              color: theme["color-primary-500"],
              fontFamily: "Poppins-Medium",
              fontSize: 12,
            }}
          >
            Ver detalhes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              marginTop: 8,
              color: theme["color-primary-500"],
              fontFamily: "Poppins-Medium",
              fontSize: 12,
            }}
          >
            Comprar novamente
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
