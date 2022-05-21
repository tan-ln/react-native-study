import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'
import React from 'react'

export default function HomeSwiper() {
  return (
    <Swiper 
      height={200}
      showsButtons={true}
      autoplay={true}
      dotColor="#ccc"
      activeDotColor="#2E8B57"
      showsButtons={false}
    >
      <Image style={[styles.img]} source={require('../../assets/images/01.jpg')} />
      <Image style={[styles.img]} source={require('../../assets/images/02.jpg')} />
      <Image style={[styles.img]} source={require('../../assets/images/03.jpg')} />
    </Swiper>
  )
}

const styles = StyleSheet.create({
  img: {
    width: Dimensions.get('window').width,
    height: 200
  }
})