import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home'
import TakePicture from '../screens/Home/TakePicture'

const Stack = createNativeStackNavigator();

export default function HomeStack({ navigation  }) {
  return (
    <Stack.Navigator
    screenOptions={
      { headerShadowVisible: false }    // 隐藏阴影
    }
    >
      <Stack.Screen name="HomeStack" component={HomeScreen}
        options={
          {
            title: '首页',
            headerStyle: { backgroundColor: '#2E8B57' },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('TakePicture')}>
                <Text style={{ fontSize: 18, color: '#fff' }}>拍照</Text>
              </TouchableOpacity>
            )
          }
        }
      />
      <Stack.Screen name='TakePicture' component={TakePicture} />
    </Stack.Navigator>
  )
}