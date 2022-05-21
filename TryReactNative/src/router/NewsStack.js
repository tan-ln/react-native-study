import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsScreen from '../screens/News'

const Stack = createNativeStackNavigator();

export default function NewsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NewsScreen" component={NewsScreen}
        options={
          {
            title: '新闻',
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