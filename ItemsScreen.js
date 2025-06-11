import React from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from './Colors';

// قائمة الأطعمة مع إضافة السعر لكل منتج
const foodItems = {
  seafood: [
    {
      id: 'f1',
      name: 'جمبري مشوي',
      description: 'جمبري طازج مشوي على الفحم',
      price: 35,
      nutrition: 'بروتين عالي',
      comments: [],
      rating: 4.5,
    },
    {
      id: 'f2',
      name: 'سمك مقلي',
      description: 'سمك مقلي مع صلصة الليمون',
      price: 28,
      nutrition: 'دهون منخفضة',
      comments: [],
      rating: 4,
    },
  ],
  sandwiches: [
    {
      id: 'f3',
      name: 'ساندويش شاورما',
      description: 'شاورما دجاج مع خبز عربي',
      price: 18,
      nutrition: 'سعرات معتدلة',
      comments: [],
      rating: 4.2,
    },
  ],
  main: [
    {
      id: 'f4',
      name: 'كبسة',
      description: 'كبسة لحم مع أرز بهارات',
      price: 40,
      nutrition: 'سعرات عالية',
      comments: [],
      rating: 4.7,
    },
  ],
  soups: [
    {
      id: 'f5',
      name: 'شوربة عدس',
      description: 'شوربة عدس ساخنة',
      price: 12,
      nutrition: 'غنية بالحديد',
      comments: [],
      rating: 4.3,
    },
  ],
  appetizers: [
    {
      id: 'f6',
      name: 'حمص',
      description: 'حمص بالطحينة',
      price: 10,
      nutrition: 'غني بالبروتين النباتي',
      comments: [],
      rating: 4.1,
    },
  ],
  drinks: [
    {
      id: 'f7',
      name: 'عصير برتقال',
      description: 'عصير برتقال طبيعي',
      price: 8,
      nutrition: 'فيتامين سي عالي',
      comments: [],
      rating: 4.8,
    },
  ],
};

export default function ItemsScreen({ route, navigation }) {
  const { categoryId } = route.params;
  const items = foodItems[categoryId] || [];

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemBtn}
            onPress={() => navigation.navigate('FoodDetails', { item })}
          >
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDesc}>{item.description}</Text>
            <Text style={styles.price}>السعر: {item.price ?? 10} ريال</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: Colors.background },
  itemBtn: {
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  itemDesc: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    color: Colors.textPrimary,
    marginTop: 8,
    fontWeight: 'bold',
  },
});
