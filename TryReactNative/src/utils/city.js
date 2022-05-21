import axios from 'react-native-axios'
import { key } from '../assets/api'

const getCity = async function (location) {
  if (typeof location === 'object') {
    const { longitude, latitude } = location
    location = `${longitude},${latitude}`
  }
  let url = `https://geoapi.qweather.com/v2/city/lookup?location=${location}&key=${key}`,
      method: 'GET';

  // return await fetch(url, { method })
  //   .then(res => res.json()).then(data => {
  //     return data.location
  //   }).catch(err => {
  //     console.log(err);
  //   })

  return await axios.get(url)
    .then(res => {
      // console.log(res.data);
      if (res.data.code === '200') {
        return res.data.location
      }
    }).catch(err => {
      console.log(err);
    })
}

export { getCity }