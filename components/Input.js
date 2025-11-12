import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  colorScheme = 'light',
  style,
  iconName, // ชื่อไอคอนจาก Ionicons
  iconColor,
  iconSize = 22,
  iconPosition = 'left', // 'left' หรือ 'right'
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isLight = colorScheme === 'light';
  const color = isLight ? '#fff' : '#000';
  const finalIconColor = iconColor || color;

  // คำนวณ padding ตามตำแหน่งไอคอน
  const paddingLeft = iconName && iconPosition === 'left' ? 40 : 10;
  const paddingRight = secureTextEntry || (iconName && iconPosition === 'right') ? 40 : 10;

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color }]}>{label}</Text>}
      <View style={styles.inputWrapper}>
        {/* ไอคอนด้านซ้าย */}
        {iconName && iconPosition === 'left' && (
          <View style={styles.leftIcon}>
            <Ionicons name={iconName} size={iconSize} color={finalIconColor} />
          </View>
        )}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={color}
          secureTextEntry={secureTextEntry && !showPassword}
          style={[
            styles.input,
            { 
              borderColor: color, 
              color: color,
              paddingLeft,
              paddingRight,
            },
            style,
          ]}
          autoCapitalize="none"
        />

        {/* ไอคอนด้านขวา (ถ้าไม่ใช่ secureTextEntry) */}
        {iconName && iconPosition === 'right' && !secureTextEntry && (
          <View style={styles.rightIcon}>
            <Ionicons name={iconName} size={iconSize} color={finalIconColor} />
          </View>
        )}

        {/* ปุ่มแสดง/ซ่อนรหัสผ่าน */}
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={color}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    width: '100%',
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    fontFamily: 'NotoSansLao-Regular',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
    alignItems: 'stretch',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    height: 45,
    fontSize: 16,
    backgroundColor: 'transparent',
    fontFamily: 'NotoSansLao-Regular',
  },
  leftIcon: {
    position: 'absolute',
    left: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    zIndex: 1,
  },
});