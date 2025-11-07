import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Input({ label, value, onChangeText, placeholder, secureTextEntry }) {

  //State show password
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
           placeholderTextColor="#fff"
          secureTextEntry={secureTextEntry && !showPassword}
          style={styles.input}
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
              color="#fff"
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
    color: 'white',
    fontFamily: "NotoSansLao-Regular",
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
     color: 'white', 
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingRight: 45, 
    fontSize: 16,
    backgroundColor: 'transparent',
    fontFamily: "NotoSansLao-Regular",
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