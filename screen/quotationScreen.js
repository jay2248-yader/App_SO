import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

import Input from '../components/Input';
import Button from '../components/Button';

export default function QuotationScreen() {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // ฟังก์ชันสำหรับค้นหา
    console.log('Searching for:', searchText);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>ລາຍການໃບສະເໜີລາຄາ</Text>
      </View>

      {/* Search Container */}
      <View style={styles.searchContainer}>
        <View style={styles.inputWrapper}>
          <Input
            placeholder="ຄົ້ນຫາໃບສະເໜີລາຄາ..."
            value={searchText}
            onChangeText={setSearchText}
            colorScheme="dark"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="ຄົ້ນຫາ"
            onPress={handleSearch}
        
          />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.text}>quotationScreen</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerText: {
    color: '#000',
    fontSize: 30,
    fontWeight: '700',
    fontFamily: 'NotoSansLao-Bold',
  },
  searchContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
  },
  buttonWrapper: {
    minWidth: 100,
    backgroundColor: '000',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
});