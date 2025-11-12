// src/screens/QuotationList.jsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function QuotationList() {
  const data = [
    { id: 1, code: 'CSU469', date: '20-11-2025', note: 'ໝາຍເຫດ' },
    { id: 2, code: 'CSU469', date: '20-11-2025', note: 'ໝາຍເຫດ' },
    { id: 3, code: 'CSU469', date: '20-11-2025', note: 'ໝາຍເຫດ' },
    { id: 4, code: 'CSU469', date: '20-11-2025', note: 'ໝາຍເຫດ' },
    { id: 5, code: 'CSU469', date: '20-11-2025', note: 'ໝາຍເຫດ' },
    
  ];

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.center]}>{item.id}</Text>
      <Text style={[styles.cell]}>{item.code}</Text>
      <Text style={[styles.cell]}>{item.date}</Text>
      <Text style={[styles.cell]}>{item.note}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.cell, styles.center, styles.headerText]}>ລຳດັບ</Text>
        <Text style={[styles.cell, styles.headerText]}>ເລກທີເອກະສານ</Text>
        <Text style={[styles.cell, styles.headerText]}>ວັນທີເອກະສານ</Text>
        <Text style={[styles.cell, styles.headerText]}>ໝາຍເຫດ</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderWidth: 1,
    borderColor: '#294aa5',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#294aa5',
  },
  header: {
    backgroundColor: '#294aa5',
  },
  headerText: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'NotoSansLao-Bold',
  },
  cell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 14,
    fontFamily: 'NotoSansLao-Regular',
  },
  center: {
    textAlign: 'center',
  },
});
