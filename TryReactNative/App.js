import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/router'

export default function App() {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  )
}