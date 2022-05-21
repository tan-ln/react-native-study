import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserScreen from '../screens/User'

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserScreen" component={UserScreen}
        options={
          {
            title: '我的',
            headerStyle: { backgroundColor: '#2E8B57' },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }
        }
      />
    </Stack.Navigator>
  )
}