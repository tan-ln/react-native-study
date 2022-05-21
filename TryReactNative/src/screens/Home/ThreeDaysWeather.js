import { View, Text, StyleSheet, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react'

export default function ThreeDaysWeather({ threeDays }) {
  return (
    <View style={styles.dailyContainer}>
      {
        threeDays.map((item, idx) => {
          return (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#ddd', '#333']}
              key={'weather' + idx}
              style={styles.dailyItem}
            >
              <Text style={styles.dailyItemTitle}>{ item.fxDate }</Text>
              <View style={styles.dailyItemContent}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Ionicons name="rainy-outline" size={40} color='#00BFFF' style={styles.weatherIcon} />
                  <Text>{ item.textDay } { item.tempMax }°</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Text>{ item.tempMin }° { item.textNight }</Text>
                  <Ionicons name="sunny-outline" size={40} color='#FFA54F' style={styles.weatherIcon} />
                </View>
              </View>
            </LinearGradient>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  dailyContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginHorizontal: 10
  },
  dailyItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    width: Dimensions.get('window').width - 20,
    marginTop: 10
  },
  dailyItemTitle: {
    fontSize: 18,
    color: '#eee',
    marginTop: 10
  },
  dailyItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width - 40,
    alignItems: 'center',
    marginBottom: 10
  },
  weatherIcon: {
    marginHorizontal: 10
  }
})
