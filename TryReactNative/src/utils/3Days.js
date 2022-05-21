import { key } from '../assets/api'

export const get3Days = async (location) => {
  if (typeof location === 'object') {
    const { longitude, latitude } = location
    location = `${longitude},${latitude}`
  }
  const url = `https://devapi.qweather.com/v7/weather/3d?location=${location}&key=${key}`
  try {
    const resp = await (await fetch(url)).json()
    if (resp.code === '200') {
      return resp.daily
    } else {
      return []
    }
  } catch (err) {
    console.log('Fetch Error: ', err);
  }
}