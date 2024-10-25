import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../../stores/authStore';
import { LineChart } from 'react-native-chart-kit';

export const DashboardScreen = () => {
  const { user, logout } = useAuthStore();

  const headcountData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      data: [20, 22, 25, 27, 30, 32]
    }]
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold">
            Welcome back, {user?.name}
          </Text>
          <TouchableOpacity 
            onPress={logout}
            className="bg-gray-200 px-4 py-2 rounded-lg"
          >
            <Text className="text-gray-700">Logout</Text>
          </TouchableOpacity>
        </View>

        {/* HR Analytics */}
        <View className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <Text className="text-lg font-semibold mb-4">Headcount Metrics</Text>
          <LineChart
            data={headcountData}
            width={300}
            height={200}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
            }}
            bezier
            style={{ borderRadius: 16 }}
          />
        </View>

        {/* Real-time Tracking */}
        <View className="flex-row flex-wrap justify-between">
          <View className="bg-white rounded-xl p-4 w-[48%] mb-4 shadow-sm">
            <Text className="font-semibold mb-2">Attendance Status</Text>
            <Text className="text-2xl text-success">32/35</Text>
            <Text className="text-gray-500">Present Today</Text>
          </View>

          <View className="bg-white rounded-xl p-4 w-[48%] mb-4 shadow-sm">
            <Text className="font-semibold mb-2">Leave Requests</Text>
            <Text className="text-2xl text-warning">5</Text>
            <Text className="text-gray-500">Pending</Text>
          </View>

          <View className="bg-white rounded-xl p-4 w-[48%] mb-4 shadow-sm">
            <Text className="font-semibold mb-2">Open Positions</Text>
            <Text className="text-2xl text-primary">8</Text>
            <Text className="text-gray-500">Active</Text>
          </View>

          <View className="bg-white rounded-xl p-4 w-[48%] mb-4 shadow-sm">
            <Text className="font-semibold mb-2">Free Days</Text>
            <Text className="text-2xl text-secondary">15</Text>
            <Text className="text-gray-500">Available</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="bg-white rounded-xl p-4 shadow-sm">
          <Text className="text-lg font-semibold mb-4">Quick Actions</Text>
          <View className="space-y-3">
            <TouchableOpacity className="bg-gray-100 p-3 rounded-lg">
              <Text className="text-primary">Request Leave</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-100 p-3 rounded-lg">
              <Text className="text-primary">Submit Time Sheet</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-100 p-3 rounded-lg">
              <Text className="text-primary">View Documents</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};