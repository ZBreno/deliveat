import { View, ScrollView } from "react-native";
import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { NotificationStackParamList } from "../navigators/NotificationStack";
import { Text, useTheme } from "@ui-kitten/components";
import HeaderNavigation from "../components/HeaderNavigation";
import ArrowBack from "../components/ArrowBack";
import Notification from "../components/Notification";

export type NotificationScreenProps = StackScreenProps<
  NotificationStackParamList,
  "Notification"
>;

export default function NotificationScreen() {
  const notifications = [
    {
      title: "Tem cupom novo na área...",
      description:
        "Não podemos deixar você fora dessa. Use o cupom Deliveat15 e ganhe 15% de desconto na hora.",
      code: "Deliveat15",
      time: "17/09/2023 ás 19:34",
    },
    {
      title: "Tem cupom novo na área...",
      description:
        "Não podemos deixar você fora dessa. Use o cupom Deliveat20 e ganhe 15% de desconto na hora.",
      code: "Deliveat20",
      time: "17/09/2023 ás 19:34",
    },
    {
      title: "Tem cupom novo na área...",
      description:
        "Não podemos deixar você fora dessa. Use o cupom Deliveat25 e ganhe 25% de desconto na hora.",
      code: "Deliveat25",
      time: "17/09/2023 ás 19:34",
    },
    {
      title: "Tem cupom novo na área...",
      description:
        "Não podemos deixar você fora dessa. Use o cupom Deliveat15 e ganhe 25% de desconto na hora.",
      code: "Deliveat15",
      time: "17/09/2023 ás 19:34",
    },
    {
      title: "Tem cupom novo na área...",
      description:
        "Não podemos deixar você fora dessa. Use o cupom Deliveat25 e ganhe 25% de desconto na hora.",
      code: "Deliveat25",
      time: "17/09/2023 ás 19:34",
    },
    {
      title: "Tem cupom novo na área...",
      description:
        "Não podemos deixar você fora dessa. Use o cupom Deliveat25 e ganhe 25% de desconto na hora.",
      code: "Deliveat25",
      time: "17/09/2023 ás 19:34",
    },
  ];
  const theme = useTheme();
  return (
    <ScrollView
      style={{
        paddingHorizontal: 16,
        flex: 1,
        backgroundColor: theme["white"],
      }}
    >
      <HeaderNavigation
        childrenLeft={<ArrowBack />}
        childrenCenter={
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            Notificações
          </Text>
        }
        childrenRight={<View />}
      />
      <View style={{ gap: 24, marginBottom: 32 }}>
        {notifications.map(({ code, description, time, title }, index) => (
          <Notification
            key={index}
            code={code}
            description={description}
            time={time}
            title={title}
          />
        ))}
      </View>
    </ScrollView>
  );
}
