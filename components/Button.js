import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // ✅ ใช้สำหรับแสดงไอคอน

export default function Button({
  title,
  onPress,
  disabled,
  style,
  textStyle,
  iconName, // ✅ ชื่อ icon ที่จะใช้
  iconColor = '#fff',
  iconSize = 22,
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

        {/* ✅ แสดงไอคอนถ้ามี (อยู่ต่อท้าย text) */}
        {iconName && (
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
    fontSize: 18,
    fontFamily: 'NotoSansLao-Bold',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // ✅ ระยะห่างระหว่าง text กับ icon
  },
});
