import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../navigation/AppNavigator";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/smcLogo.png")}
        style={styles.banner}
        resizeMode="contain"
      />

      <Text style={styles.title}>Student Registration App</Text>

      <Button title="Register Student" onPress={() => navigation.navigate("StudentForm")}/>
      <View style={{ height: 15}} />

      <Button title="View Saved Student" onPress={() => navigation.navigate("StudentInfo")} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF4FF",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  banner: {
    width: 130,
    height: 130,
    marginBottom: 16,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginBottom: 10,
  },

});