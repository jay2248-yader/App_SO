import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Button({
  title,
  onPress,
  disabled,
  style,
  textStyle,
  iconName,
  iconColor = '#fff',
  iconSize = 22,
  icon, // ✅ รองรับ SVG หรือ JSX icon
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.button,
        style,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.content}>
        <Text style={[styles.text, textStyle]}>{title}</Text>

        {/* 🔵 ถ้าส่ง SVG icon มา → ใช้อันนี้ */}
        {icon && <View style={{ marginLeft: 6 }}>{icon}</View>}

        {/* 🟢 ถ้าไม่ส่ง SVG แต่มี iconName → ใช้ MaterialIcons */}
        {!icon && iconName && (
          <MaterialIcons name={iconName} size={iconSize} color={iconColor} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0072ff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  disabled: {
    backgroundColor: '#aaa',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'NotoSansLao-Bold',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
