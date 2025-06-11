import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const categories = [
  {
    id: '1',
    name: 'مأكولات بحرية',
    items: [
      {
        id: '11',
        name: 'جمبري مشوي',
        description: 'جمبري طازج مشوي',
        nutrition: 'بروتين عالي',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '12',
        name: 'سمك السلمون',
        description: 'سلمون مشوي مع التوابل',
        nutrition: 'أوميغا 3',
        image: 'https://images.unsplash.com/photo-1543352634-823e5fdf33f9?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: '2',
    name: 'ساندويشات',
    items: [
      {
        id: '21',
        name: 'ساندويش دجاج',
        description: 'دجاج مشوي مع الخضار',
        nutrition: 'بروتين',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '22',
        name: 'ساندويش لحم',
        description: 'لحم بقري مع صلصة خاصة',
        nutrition: 'بروتين عالي',
        image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: '3',
    name: 'حلويات',
    items: [
      {
        id: '31',
        name: 'كيك الشوكولاتة',
        description: 'كيك شوكولاتة لذيذ',
        nutrition: 'سكريات',
        image: 'https://images.unsplash.com/photo-1505253210343-03d98d3b607e?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '32',
        name: 'آيس كريم الفانيليا',
        description: 'آيس كريم ناعم وكريمي',
        nutrition: 'سكريات',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: '4',
    name: 'مشروبات',
    items: [
      {
        id: '41',
        name: 'عصير برتقال',
        description: 'عصير برتقال طبيعي',
        nutrition: 'فيتامين سي',
        image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '42',
        name: 'قهوة اسبريسو',
        description: 'قهوة مركزة وساخنة',
        nutrition: 'منبه',
        image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 10 }}
      renderItem={({ item }) => (
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{item.name}</Text>
          <FlatList
            data={item.items}
            keyExtractor={(food) => food.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: food }) => (
              <TouchableOpacity
                style={styles.foodItem}
                onPress={() => navigation.navigate('FoodDetails', { food })}
              >
                <Image source={{ uri: food.image }} style={styles.foodImage} />
                <Text style={styles.foodName}>{food.name}</Text>
                <Text style={styles.foodDesc}>{food.description}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  categoryContainer: { marginBottom: 20 },
  categoryTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#2c3e50' },
  foodItem: {
    backgroundColor: '#fefefe',
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    width: 180,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  foodImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  foodName: { fontSize: 18, fontWeight: 'bold', color: '#34495e' },
  foodDesc: { fontSize: 14, color: '#7f8c8d', marginTop: 3 },
});
