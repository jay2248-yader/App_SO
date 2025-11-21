import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import CreateQuotation from '../components/createQuotation';

export default function ReportScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <CreateQuotation />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F6FA', 
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 30,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 10,

    // เงา (iOS + Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
});
