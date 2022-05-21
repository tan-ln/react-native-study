import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Alert, FlatList } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeSwiper from './HomeSwiper'
import React, { Component, useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThreeDaysWeather from './ThreeDaysWeather'
import getData from '../../utils/storage'
import { getCity } from '../../utils/city'
import { getLifeIndex } from '../../utils/life';
import { get3Days } from '../../utils/3Days';

export default class HomeScreen extends Component {
  constructor () {
    super()
    this.state = {
      city: {},
      indices: [],
      threeDays: []
    }
  }
  getLocation = async () => {
    Geolocation.getCurrentPosition(
      info => {
        if (info) {
          // const { latitude, longitude } = info.coords
          const longitude = 114.39
          const latitude = 27.79
          // storage
          AsyncStorage.setItem('coords', JSON.stringify({ longitude, latitude }))
          // AsyncStorage.setItem('coords', JSON.stringify(info.coords))
        }
      },
      err => {
        console.log(err)
        Alert.alert('Error: ', JSON.stringify(err))
      },
      {
        timeout: 6000
      }
    )
  }
  async componentDidMount () {
    let coords = await getData('coords')
    let cityStorage = await getData('city')
    if (!coords) {
      this.getLocation()
      coords = await getData('coords')
    }
    // get city
    if (!cityStorage) {
      const cityInfo = await getCity(coords)
      this.setState({
        city: cityInfo[0]
      })
      AsyncStorage.setItem('city', JSON.stringify(cityInfo[0]))
    } else {
      this.setState({
        city: cityStorage
      })
    }
    // life index / daily
    await getLifeIndex(coords).then(res => {
      this.setState({
        indices: res
      })
    })
    // 3 days weather
    await get3Days(coords).then(res => {
      this.setState({
        threeDays: res
      })
    })
  }

  indicesItem = ({idx, item}) => {
    return (
      <TouchableOpacity
        key={'index' + item.type}
        onPress={() => alert(item.type)}
      >
        <View style={[styles.indexItem]}>
          <Text style={[styles.indexName]}>{ item.name }</Text>
          <Text style={[styles.indexCategory]}>{ item.category }</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ScrollView>
          {/* btns */}
          <View style={[styles.container]}>
            <TouchableOpacity onPress={() => alert('扫一扫')}>
              <View style={[styles.itemBase]}>
                <Ionicons name="scan-outline" size={40} color={'#fff'} />
                <Text style={[styles.fontBase]}> 扫一扫 </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={[styles.itemBase]}>
                <Ionicons name="qr-code-outline" size={40} color={'#fff'} />
                <Text style={[styles.fontBase]}> 付款码 </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={[styles.itemBase]}>
                <Ionicons name="trail-sign-outline" size={40} color={'#fff'} />
                <Text style={[styles.fontBase]}> 出行 </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={[styles.itemBase]}>
                <Ionicons name="card-outline" size={40} color={'#fff'} />
                <Text style={[styles.fontBase]}> 卡包 </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* swiper */}
          <HomeSwiper />
          {/* city info */}
          <View style={styles.city}>
            <Text style={[styles.cityText]}>
              { this.state.city.country } { this.state.city.adm1 } { this.state.city.adm2 }
            </Text>
          </View>
          {/* daily life index */}
          <View style={[styles.indexContainer]}>
            <FlatList
              data={this.state.indices}
              renderItem={this.indicesItem}
              keyExtractor={item => item.type}
              horizontal={true}
            />
          </View>
          {/* 3 days weather */}
          <ThreeDaysWeather threeDays={this.state.threeDays} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2E8B57',
  },
  itemBase: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E8B57',
    height: 90,
    width: Dimensions.get('window').width / 4
  },
  fontBase: {
    color: '#fff',
    fontSize: 14
  },
  city: {
    marginTop: 10,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  cityText: {
    fontSize: 20,
  },
  indexContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginLeft: 10
  },
  indexItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#deb',
    width: Dimensions.get('window').width / 3 - 10,
    height: 80,
    marginTop: 10,
    marginRight: 10,
  },
  indexName: {
    color: '#222',
    fontSize: 14
  },
  indexCategory: {
    color: '#00b38a',
    fontSize: 15,
    marginTop: 10
  }
})