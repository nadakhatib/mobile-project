import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';

export default function PaymentScreen({ navigation }) {
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handlePayment = () => {
    if (!paymentMethod) {
      Alert.alert('خطأ', 'من فضلك اختر طريقة الدفع');
      return;
    }
    navigation.navigate('OrderSummary', { paymentMethod });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>اختر طريقة الدفع</Text>

      <TouchableOpacity
        style={[styles.option, paymentMethod === 'cash' && styles.selected]}
        onPress={() => setPaymentMethod('cash')}
      >
        <Text>كاش</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, paymentMethod === 'visa' && styles.selected]}
        onPress={() => setPaymentMethod('visa')}
      >
        <Text>فيزا</Text>
      </TouchableOpacity>

      <Button title="تأكيد الدفع" onPress={handlePayment} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  option: {
    borderWidth: 1, borderColor: '#ccc', padding: 15, marginBottom: 15, borderRadius: 8,
    alignItems: 'center',
  },
  selected: {
    borderColor: 'green', backgroundColor: '#e0ffe0',
  },
});
