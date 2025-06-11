import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (email && password) {
      Alert.alert('تم التسجيل', 'يمكنك الآن تسجيل الدخول');
      navigation.goBack();
    } else {
      Alert.alert('خطأ', 'يرجى تعبئة جميع الحقول');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>تسجيل الاشتراك</Text>
      <TextInput
        placeholder="البريد الإلكتروني"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="كلمة المرور"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="تسجيل" onPress={handleSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10,
    marginBottom: 15,
  },
});
