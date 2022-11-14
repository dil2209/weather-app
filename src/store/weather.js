import {createSlice} from '@reduxjs/toolkit'
import {apiCall} from './api'


const weatherOneSlice = createSlice({
  name:'weatherOne',
  initialState: {weatherOne:[]},
  reducers:{
    getFromResponseTashkent:(state, action)=>{
      state.weatherOne = action.payload

    },
    getFromResponseOslo:(state, action)=>{
      state.weatherOne = action.payload

    },
    getFromResponseMoscow:(state, action)=>{
      state.weatherOne = action.payload

    }
  }
})

export const getWeatherTashkent=()=>apiCall({
  url:'?latitude=41.32&longitude=69.35&hourly=temperature_2m,cloudcover_low&daily=temperature_2m_max,temperature_2m_min,rain_sum,snowfall_sum,windspeed_10m_max&timezone=auto',
  method:'get',
  onSuccess:weatherOneSlice.actions.getFromResponseTashkent.type
})
export const getWeatherOslo=()=>apiCall({
  url:'?latitude=59.9138&longitude=10.7387&hourly=temperature_2m,cloudcover_low&daily=temperature_2m_max,temperature_2m_min,rain_sum,snowfall_sum,windspeed_10m_max&current_weather=true&timezone=Europe%2FBerlin',
  method:'get',
  onSuccess:weatherOneSlice.actions.getFromResponseOslo.type
})
export const getWeatherMoscow=()=>apiCall({
  url:'?latitude=55.7558&longitude=37.6176&hourly=temperature_2m,cloudcover_low&daily=temperature_2m_max,temperature_2m_min,rain_sum,snowfall_sum,windspeed_10m_max&current_weather=true&timezone=Europe%2FMoscow',
  method:'get',
  onSuccess:weatherOneSlice.actions.getFromResponseMoscow.type
})

export default weatherOneSlice.reducer 