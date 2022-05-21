import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeStack from './HomeStack'
import NewsStack from './NewsStack'
import UserStack from './UserStack'

const Tab = createBottomTabNavigator();

export default function Router() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = focused
                ? 'home'
                : 'home-outline';
              break;
            case 'News':
              iconName = focused
                ? 'newspaper'
                : 'newspaper-outline';
              break;
            case 'User':
              iconName = focused
                ? 'person'
                : 'person-outline';
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2E8B57',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="News" component={NewsStack} />
      <Tab.Screen name="User" component={UserStack} />
    </Tab.Navigator>
  );
}
