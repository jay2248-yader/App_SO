import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import EyeSharp from "../assets/Icon/eye-sharp.svg";
import EyeSlash from "../assets/Icon/eye-slash.svg";

export default function Input({
  label,
  labelStyle,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  colorScheme = "light",
  style,
  iconName,
  iconColor,
  iconSize = 22,
  iconPosition = "left",
  onSubmit,
  placeholderTextColor,
  editable = true,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isLight = colorScheme === "light";
  const color = isLight ? "#fff" : "#000";
  const finalIconColor = iconColor || color;

  const paddingLeft = iconName && iconPosition === "left" ? 40 : 10;
  const paddingRight =
    secureTextEntry || (iconName && iconPosition === "right") ? 40 : 10;

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color }, labelStyle]}>{label}</Text>
      )}

      <View style={styles.inputWrapper}>
        {/* ไอคอนซ้าย */}
        {iconName && iconPosition === "left" && (
          <View style={styles.leftIcon}>
            <Ionicons name={iconName} size={iconSize} color={finalIconColor} />
          </View>
        )}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={secureTextEntry && !showPassword}
          style={[
            styles.input,
            { borderColor: color, color, paddingLeft, paddingRight },
            style,
          ]}
          autoCapitalize="none"
          returnKeyType="done"
          onSubmitEditing={onSubmit}
          editable={editable}
        />

        {/* ไอคอนขวา */}
        {iconName && iconPosition === "right" && !secureTextEntry && (
          <View style={styles.rightIcon}>
            <Ionicons name={iconName} size={iconSize} color={finalIconColor} />
          </View>
        )}

        {/* แสดง/ซ่อนรหัสผ่านด้วย SVG */}
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeSlash width={22} height={22} fill={color} />
            ) : (
              <EyeSharp width={22} height={22} fill={color} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    fontFamily: "NotoSansLao-Regular",
  },
  inputWrapper: {
    position: "relative",
    width: "100%",
    alignItems: "stretch",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    height: 45,
    fontSize: 16,
    backgroundColor: "transparent",
    fontFamily: "NotoSansLao-Regular",
  },
  leftIcon: {
    position: "absolute",
    left: 12,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  rightIcon: {
    position: "absolute",
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
});
