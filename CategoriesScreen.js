import React from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from './Colors';

const categories = [
  { id: 'seafood', name: 'مأكولات بحرية' },
  { id: 'sandwiches', name: 'ساندويشات' },
  { id: 'main', name: 'أطباق رئيسية' },
  { id: 'soups', name: 'شوربات' },
  { id: 'appetizers', name: 'مقبلات' },
  { id: 'drinks', name: 'مشروبات' },
];

export default function CategoriesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => navigation.navigate('Items', { categoryId: item.id, categoryName: item.name })}
          >
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: Colors.background },
  categoryBtn: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  categoryText: {
    fontSize: 20,
    color: Colors.buttonText,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
