// src/routes/AppRoutes.js
import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthStore } from "../store/authStore";

// ซ่อน warning ที่ไม่จำเป็นใน development
LogBox.ignoreLogs([
  'The action',
  'was not handled by any navigator',
]);

// screens
import LoginScreen from "../screen/loginScreen";
import HomeScreen from "../screen/homeScreen";


const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  const { token } = useAuthStore();

  return (
    <NavigationContainer
      onStateChange={(state) => {
        // Suppress navigation warnings in development
        if (__DEV__) {
          console.log('Navigation state changed');
        }
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          // ✅ ถ้ามี token -> เข้าสู่ระบบแล้ว
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          // ❌ ถ้ายังไม่มี token -> แสดงหน้า Login
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
