import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from './CartContext';

export default function CartScreen({ navigation }) {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>السلة فارغة</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}  // تأكد من وجود id لكل منتج
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text>الكمية: {item.quantity}</Text>
            <View style={styles.qtyButtons}>
              <TouchableOpacity
                onPress={() => updateQuantity(item.id, item.quantity - 1)}
                style={styles.qtyBtn}
              >
                <Text style={styles.qtyBtnText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => updateQuantity(item.id, item.quantity + 1)}
                style={styles.qtyBtn}
              >
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => removeFromCart(item.id)}
                style={styles.removeBtn}
              >
                <Text style={styles.removeBtnText}>حذف</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Text style={styles.total}>المجموع الكلي: {getTotalPrice().toFixed(2)} ريال</Text>

      <TouchableOpacity
        style={styles.checkoutBtn}
        onPress={() => navigation.navigate('Payment')}
      >
        <Text style={styles.checkoutBtnText}>ادفع الآن</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  itemName: { fontSize: 18, fontWeight: 'bold' },
  qtyButtons: { flexDirection: 'row', marginTop: 8, alignItems: 'center' },
  qtyBtn: {
    backgroundColor: '#3498db',
    padding: 8,
    marginHorizontal: 5,
    borderRadius: 4,
    minWidth: 30,
    alignItems: 'center',
  },
  qtyBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeBtn: {
    backgroundColor: '#e74c3c',
    padding: 8,
    marginLeft: 12,
    borderRadius: 4,
  },
  removeBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  total: { fontSize: 20, fontWeight: 'bold', marginVertical: 12, textAlign: 'center' },
  checkoutBtn: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

