import axios from 'react-native-axios'
import { key } from '../assets/api'

const getLifeIndex = async function (location) {
  if (typeof location === 'object') {
    const { longitude, latitude } = location
    location = `${longitude},${latitude}`
  }
  let url = `https://devapi.qweather.com/v7/indices/1d?type=0&location=${location}&key=${key}`,
      method: 'GET';

  return await axios.get(url)
    .then(res => {
      // console.log(res.data);
      if (res.data.code === '200') {
        return res.data.daily
      }
    }).catch(err => {
      console.log(err);
    })
}

export { getLifeIndex }