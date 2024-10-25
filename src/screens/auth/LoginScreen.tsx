import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../../stores/authStore';

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginWithBiometrics, isLoading, error } = useAuthStore();

  const handleLogin = async () => {
    await login(email, password);
  };

  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <Text className="text-3xl font-bold text-center mb-8 text-primary">HR Portal</Text>

      {error && (
        <Text className="text-danger text-center mb-4">{error}</Text>
      )}

      <TextInput
        className="bg-gray-100 rounded-lg px-4 py-3 mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        className="bg-gray-100 rounded-lg px-4 py-3 mb-6"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className="bg-primary rounded-lg py-4 mb-4"
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-semibold">Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-secondary rounded-lg py-4 mb-4"
        onPress={loginWithBiometrics}
      >
        <Text className="text-white text-center font-semibold">
          Login with Biometrics
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text className="text-primary text-center">Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};