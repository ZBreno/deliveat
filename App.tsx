import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Welcome from "./src/screens/WelcomeScreen";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  Button,
  Layout,
  Text,
} from "@ui-kitten/components";
import React, { useState } from "react";
export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Layout style={styles.container}>
        <StatusBar style="auto" />
        <Welcome />
        <Button onPress={() => alert("mindé papai")}>BUTAO</Button>
      </Layout>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
