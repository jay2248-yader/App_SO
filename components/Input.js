import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  colorScheme = 'light', // 👉 'light' = สีขาว, 'dark' = สีดำ
}) {
  const [showPassword, setShowPassword] = useState(false);

  // 🎨 เปลี่ยนสีตามธีม
  const isLight = colorScheme === 'light';
  const color = isLight ? '#fff' : '#000';

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color }]}>{label}</Text>}
      <View style={styles.inputWrapper}>
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
            },
          ]}
          autoCapitalize="none"
        />
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
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingRight: 45,
    fontSize: 16,
    backgroundColor: 'transparent',
    fontFamily: 'NotoSansLao-Regular',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
});
