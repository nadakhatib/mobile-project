import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { useCart } from './CartContext'; // استيراد useCart من الكونتكست

function StarRating({ rating, onChange }) {
  const maxStars = 5;
  return (
    <View style={{ flexDirection: 'row' }}>
      {[...Array(maxStars)].map((_, i) => {
        const starNumber = i + 1;
        return (
          <TouchableOpacity key={i} onPress={() => onChange(starNumber)}>
            <Text style={{ color: starNumber <= rating ? '#f1c40f' : '#bdc3c7', fontSize: 30 }}>
              ★
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function getIngredients(foodName) {
  const ingredientsMap = {
    'جمبري مشوي': ['🦐 جمبري', '🧄 ثوم', '🍋 ليمون', '🫒 زيت زيتون', '🌶 فلفل أسود'],
    'سمك السلمون': ['🐟 سلمون', '🍋 ليمون', '🧂 ملح', '🌿 أعشاب'],
    'ساندويش دجاج': ['🍗 دجاج', '🥬 خس', '🍅 طماطم', '🥖 خبز', '🧂 بهارات'],
    'ساندويش لحم': ['🥩 لحم بقري', '🥒 خيار', '🍞 خبز', '🌶 صلصة', '🧅 بصل'],
    'كيك الشوكولاتة': ['🍫 شوكولاتة', '🥚 بيض', '🧈 زبدة', '🍚 سكر'],
    'آيس كريم الفانيليا': ['🥛 حليب', '🍦 فانيليا', '🍬 سكر', '🥄 كريمة'],
    'عصير برتقال': ['🍊 برتقال', '💧 ماء', '🍯 عسل'],
    'قهوة اسبريسو': ['☕ حبوب قهوة', '💧 ماء'],
  };
  return ingredientsMap[foodName] || ['🧾 مكونات غير متوفرة'];
}

function getNutrition(foodName) {
  const nutritionMap = {
    'جمبري مشوي': '• بروتين عالي\n• غني بأوميغا 3\n• فيتامين B12\n• 200 سعر حراري لكل 100 غرام',
    'سمك السلمون': '• أوميغا 3\n• يحسن صحة القلب\n• فيتامين D\n• 210 سعر حراري لكل 100 غرام',
    'ساندويش دجاج': '• بروتين عالي\n• فيتامين B6\n• قليل الدهون\n• 350 سعر حراري',
    'ساندويش لحم': '• بروتين عالي\n• فيتامين B12\n• معادن مهمة\n• 400 سعر حراري',
    'كيك الشوكولاتة': '• يحتوي على سكريات\n• يعطي طاقة\n• 450 سعر حراري',
    'آيس كريم الفانيليا': '• سكريات\n• غني بالكالسيوم\n• 300 سعر حراري',
    'عصير برتقال': '• فيتامين C\n• مضاد للأكسدة\n• 80 سعر حراري',
    'قهوة اسبريسو': '• منبه\n• يحتوي على مضادات أكسدة\n• 5 سعر حراري',
  };
  return nutritionMap[foodName] || 'معلومات غير متوفرة';
}

export default function FoodDetailsScreen({ route, navigation }) {
  const { food } = route.params;
  const { addToCart } = useCart();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const averageRating =
    comments.length > 0
      ? Math.round(comments.reduce((acc, c) => acc + Number(c.rating), 0) / comments.length)
      : 0;

  function addComment() {
    if (newComment.trim() === '' || newRating === 0) {
      alert('يرجى إدخال تعليق وتقييم النجوم.');
      return;
    }
    const commentObj = {
      id: Date.now().toString(),
      text: newComment.trim(),
      rating: newRating,
    };
    setComments([...comments, commentObj]);
    setNewComment('');
    setNewRating(0);
  }

  function addToCartHandler() {
    const prices = {
      'جمبري مشوي': 35,
      'سمك مقلي': 30,
      'ساندويش شاورما': 15,
      'كبسة': 40,
      'شوربة عدس': 12,
      'حمص': 10,
      'عصير برتقال': 8,
    };

    const itemWithPrice = {
      ...food,
      price: prices[food.name] || 0,
    };

    addToCart(itemWithPrice, quantity);
    navigation.navigate('Cart');
  }

  const ingredients = getIngredients(food.name);
  const nutrition = getNutrition(food.name);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Image source={{ uri: food.image }} style={styles.image} />
      <Text style={styles.title}>{food.name}</Text>
      <Text style={styles.description}>{food.description}</Text>

      <Text style={styles.sectionTitle}>المكونات:</Text>
      <View style={styles.ingredients}>
        {ingredients.map((ing, idx) => (
          <Text key={idx} style={styles.ingredientItem}>
            {ing}
          </Text>
        ))}
      </View>

      <Text style={styles.sectionTitle}>الفوائد والسعرات الحرارية:</Text>
      <Text style={styles.nutritionText}>{nutrition}</Text>

      <Text style={styles.sectionTitle}>متوسط التقييم:</Text>
      <StarRating rating={averageRating} onChange={() => {}} />

      <Text style={styles.sectionTitle}>التعليقات:</Text>
      {comments.length === 0 ? (
        <Text style={styles.noComments}>لا توجد تعليقات بعد.</Text>
      ) : (
        comments.map((c) => (
          <View key={c.id} style={styles.comment}>
            <StarRating rating={c.rating} onChange={() => {}} />
            <Text style={{ marginTop: 5 }}>{c.text}</Text>
          </View>
        ))
      )}

      <Text style={styles.sectionTitle}>أضف تعليق وتقييم بالنجوم:</Text>
      <StarRating rating={newRating} onChange={setNewRating} />
      <TextInput
        placeholder="اكتب تعليقك هنا"
        value={newComment}
        onChangeText={setNewComment}
        style={styles.input}
        multiline
      />

      <Text style={styles.sectionTitle}>اختر الكمية:</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
        >
          <Text style={styles.qtyBtnText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qtyText}>{quantity}</Text>
        <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity((q) => q + 1)}>
          <Text style={styles.qtyBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={addToCartHandler} style={styles.addButton}>
        <Text style={styles.addButtonText}>أضف إلى السلة</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={addComment}
        style={[styles.addButton, { backgroundColor: '#27ae60' }]}
      >
        <Text style={styles.addButtonText}>إضافة تعليق</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 15 },
  image: { width: '100%', height: 230, borderRadius: 15, marginBottom: 15 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2c3e50', marginBottom: 8, textAlign: 'center' },
  description: { fontSize: 16, color: '#7f8c8d', marginBottom: 15, textAlign: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10, color: '#34495e' },
  ingredients: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  ingredientItem: {
    backgroundColor: '#d1ecf1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    margin: 5,
    fontSize: 15,
    color: '#31708f',
  },
  nutritionText: { fontSize: 16, color: '#2c3e50', lineHeight: 24, textAlign: 'center' },
  noComments: { fontStyle: 'italic', color: '#95a5a6', textAlign: 'center', marginVertical: 10 },
  comment: {
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    padding: 10,
    marginVertical: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 12,
    textAlignVertical: 'top',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  qtyBtn: {
    backgroundColor: '#2980b9',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  qtyBtnText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  qtyText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  addButton: {
    backgroundColor: '#2980b9',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
