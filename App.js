import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// ✅ นำเข้า Routes ที่เราสร้าง
import AppRoutes from "./routes/appRoutes";

// ป้องกัน splash screen หายไปก่อนโหลด fonts เสร็จ
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "NotoSansLao-Regular": require("./assets/fonts/NotoSansLao/NotoSansLao-Regular.ttf"),
    "NotoSansLao-Bold": require("./assets/fonts/NotoSansLao/NotoSansLao-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        if (fontsLoaded || fontError) {
          await SplashScreen.hideAsync();
        }
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, [fontsLoaded, fontError]);

  // แสดง app แม้ว่า fonts จะโหลดไม่สำเร็จ
  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (fontError) {
    console.error("Font loading error:", fontError);
  }

  return (
    <View style={styles.container}>
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
