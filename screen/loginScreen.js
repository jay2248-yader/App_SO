import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// components
import Input from "../components/Input";
import Button from "../components/Button";

// hooks
import useLogin from "../hook/useLogin";

// logo
import LogoCsc from "../assets/Logo/logoCsc.png";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, loading } = useLogin();

  return (
    <LinearGradient
      colors={["#1449d9ff", "#1449d9ff"]}
      style={styles.gradient}
      start={{ x: 1, y: 1 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.loginCard}>
          <View style={styles.header}>
            <Image source={LogoCsc} style={styles.logo} resizeMode="contain"  />
            <Text style={styles.title}>ລະບົບຂາຍ CSC</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>ລະຫັດພະນັກງານ</Text>
              <Input
                placeholder="ກະລຸນາໃສ່ລະຫັດພະນັກງານ"
                placeholderTextColor={"#fff"}
                value={username}
                onChangeText={setUsername}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>ລະຫັດຜ່ານ</Text>
              <Input
                placeholder="ກະລຸນາໃສ່ລະຫັດຜ່ານ"
                placeholderTextColor={"#fff"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title={loading ? "ກຳລັງເຂົ້າ..." : "ເຂົ້າສູ່ລະບົບ"}
                onPress={() => handleLogin(username, password)}
                disabled={loading}
                 style={{ 
                  backgroundColor: "#fff",
                  }}
                textStyle={{ color: "#1449d9ff" }} 
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: -50,
  },
  loginCard: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "transparent",
    borderRadius: 24,
    padding: 32,
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 5,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontFamily: "NotoSansLao-Bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontFamily: "NotoSansLao-Regular",
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 6,
    marginLeft: 4,
    fontFamily: "NotoSansLao-Regular",
  },
  buttonContainer: {
    marginTop: 12,
 
  },
});
