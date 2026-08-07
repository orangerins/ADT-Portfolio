import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import HomeScreen from "../screens/home";
import StudentFormScreen from "../screens/StudentForm";
import StudentInfoScreen from "../screens/StudentInfo";

export type RootStackParamList = {
  Home: undefined;
  StudentForm: undefined;
  StudentInfo: undefined;
  About: undefined;
  Contact: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Student Portal" }}
        />
        <Stack.Screen name="StudentForm" component={StudentFormScreen}
            options={{title: "Student Registration"}}
        />
        <Stack.Screen name="StudentInfo" component={StudentInfoScreen}
            options={{title: "Saved Student Information"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}