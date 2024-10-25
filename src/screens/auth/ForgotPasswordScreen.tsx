import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../../stores/authStore';

export const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const { resetPassword, isLoading, error } = useAuthStore();

  const handleResetPassword = async () => {
    await resetPassword(email);
    navigation.navigate('Login');
  };

  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <Text className="text-2xl font-bold text-center mb-8 text-primary">
        Reset Password
      </Text>

      {error && (
        <Text className="text-danger text-center mb-4">{error}</Text>
      )}

      <TextInput
        className="bg-gray-100 rounded-lg px-4 py-3 mb-6"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TouchableOpacity
        className="bg-primary rounded-lg py-4 mb-4"
        onPress={handleResetPassword}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-semibold">
            Send Reset Link
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text className="text-primary text-center">Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};