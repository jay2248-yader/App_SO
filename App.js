import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// ✅ นำเข้า Routes ที่เราสร้าง
import AppRoutes from "./routes/appRoutes";

// ✅ ถ้ามี global font ให้ใช้ตรงนี้เลย
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "NotoSansLao-Regular": require("./assets/fonts/NotoSansLao/NotoSansLao-Regular.ttf"),
    "NotoSansLao-Bold": require("./assets/fonts/NotoSansLao/NotoSansLao-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* ✅ ใช้ Routes แทน LoginScreen */}
      <AppRoutes />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
