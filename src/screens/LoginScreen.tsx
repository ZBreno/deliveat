import { Image, ScrollView, View, StyleSheet } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Button, Text, useTheme } from "@ui-kitten/components";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

export default function LoginScreen() {
  const [hideOverlay, setHideOverlay] = useState<boolean>(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["20%", "20%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setHideOverlay(true);
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
    setHideOverlay(false);
  }, []);

  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 16,
        justifyContent: "center",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Image source={require("../assets/deliveat-login.png")} />

        <Text style={{ marginTop: 32 }} category="h5">
          Bem vindo ao Deliveat
        </Text>

        <Text style={{ marginTop: 8, textAlign: "center" }} category="p1">
          Explore um mundo de sabores à sua porta com Deliveat e transforme cada
          refeição em uma experiência extraordinária.
        </Text>
        <Text style={{ marginTop: 56, textAlign: "center" }} category="p1">
          Como deseja continuar?
        </Text>
      </View>
      <View style={{ marginTop: 8, gap: 16 }}>
        <Button
          accessoryLeft={() => (
            <Image source={require("../assets/google-logo.png")} />
          )}
          onPress={() => alert("calma meu fi")}
        >
          {(evaProps) => (
            <Text
              {...evaProps}
              style={{
                color: theme["white"],
                width: "95%",
                textAlign: "center",
                marginLeft: -28,
              }}
              category="s2"
            >
              Continuar com o google
            </Text>
          )}
        </Button>
        <Button
          appearance="outline"
          onPress={() => handlePresentModalPress()}
          status="basic"
        >
          {(evaProps) => (
            <Text
              {...evaProps}
              category="s2"
              style={{ color: theme["color-text"] }}
            >
              Outras opções
            </Text>
          )}
        </Button>

        <Button appearance="ghost" style={{ marginTop: 8 }}>
          {(evaProps) => (
            <Text {...evaProps} style={{ textAlign: "center" }} category="s1">
              Continuar como convidado
            </Text>
          )}
        </Button>
      </View>

      {hideOverlay && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        />
      )}

      <BottomSheetModalProvider>
        <View>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onDismiss={() => handleCloseModalPress()}
          >
            <View style={{ paddingHorizontal: 16 }}>
              <Text
                category="h6"
                style={{ textAlign: "center", marginBottom: 16, marginTop: 8 }}
              >
                Como deseja continuar?
              </Text>
              <View style={{ flexDirection: "row", gap: 16 }}>
                <Button
                  style={{ flex: 1 }} // Defina o flex para 1 para ocupar o espaço restante
                  onPress={() => handleCloseModalPress()}
                  appearance="outline"
                  status="basic"
                >
                  {(evaProps) => (
                    <Text
                      {...evaProps}
                      category="s2"
                      style={{ color: theme["color-text"] }}
                    >
                      Telefone
                    </Text>
                  )}
                </Button>
                <Button
                  style={{ flex: 1 }} // Defina o flex para 1 para ocupar o espaço restante
                  onPress={() => handleCloseModalPress()}
                  appearance="outline"
                  status="basic"
                >
                  {(evaProps) => (
                    <Text
                      {...evaProps}
                      category="s2"
                      style={{ color: theme["color-text"] }}
                    >
                      E-mail
                    </Text>
                  )}
                </Button>
              </View>
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </View>
  );
}
