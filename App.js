import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';
import FoodDetailsScreen from './FoodDetailsScreen';
import CartScreen from './CartScreen';
import PaymentScreen from './PaymentScreen';
import OrderSummaryScreen from './OrderSummaryScreen';

import { CartProvider } from './CartContext';  // استيراد الـ Context

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider> {/* لف التطبيق بالكارت بروڤايدر */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: true}}>
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'تسجيل الدخول' }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'تسجيل الاشتراك' }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'الرئيسية' }} />
          <Stack.Screen name="FoodDetails" component={FoodDetailsScreen} options={{ title: 'تفاصيل الصنف' }} />
          <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'السلة' }} />
          <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'الدفع' }} />
          <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} options={{ title: 'ملخص الطلب' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
