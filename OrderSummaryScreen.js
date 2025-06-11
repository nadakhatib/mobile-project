import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function OrderSummaryScreen({ route, navigation }) {
  const { paymentMethod } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ملخص الطلب</Text>
      <Text style={styles.text}>طريقة الدفع: {paymentMethod === 'cash' ? 'كاش' : 'فيزا'}</Text>
      <Text style={styles.text}>شكراً لطلبك! سيتم تجهيز طلبك قريباً.</Text>

      <Button title="العودة للرئيسية" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  text: { fontSize: 18, marginBottom: 15 },
});
