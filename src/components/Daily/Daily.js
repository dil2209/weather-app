import React, { useEffect, useState } from 'react'
import {connect, useSelector} from 'react-redux'
import {getWeatherTashkent, getWeatherOslo, getWeatherMoscow} from '../../store/weather'

 function Daily({location, weatherOne, getWeatherMoscow, getWeatherOslo, getWeatherTashkent}) {
  const [weather, setWeather] = useState(weatherOne)
  const [date, setDate] = useState([])
  const [days] = useState([0, 1,2,3,4])
  const today = useSelector((state)=> state.dateReducer.value)
  
  
  function getThisDay(){
     const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
     let newArr = []
     for (const i of days){
       let data = today.getDate() + i;
       let month = months[today.getMonth()];
       console.log(today.getMonth())
       newArr.push(data + " " + month + " ")
      }
      setDate(newArr) 
}
  function doGet(){
    if(location === 'Oslo, Norway'){
       getWeatherOslo()
    }else if( location === 'Moscow, Russia'){
      getWeatherMoscow()
    }else{
      getWeatherTashkent()
    }
   }
useEffect(()=>{
  doGet();
  getThisDay();
}, [location])

useEffect(()=>{
  setWeather(weatherOne)
 }, [weatherOne])
return (
    <div>
     {weather.length!==0 ?
        <div className='row'>
          {date.length !==0 ?date.map((item, index)=>{
            return (
              <div className='col-md-2 daily m-2 ps-1' key={index}>
                <h6 className='mt-3'>{item}</h6>
                <p className='fs-5 text-danger fw-bolder '>{weather.daily.temperature_2m_min[index]} / {weather.daily.temperature_2m_max[index]}  &#176;</p>
                <p className='fs-5'>{weather.daily.windspeed_10m_max[index]} km/h</p>
                <p> {weather.daily.rain_sum[index]} mm  </p>
              </div>
            )
          }) :''} 
        </div>
      :''}  
       </div>
  )
}
const mapStateToProps=(state)=>{
  return {weatherOne : state.weatherOneReducer.weatherOne}
}
export default connect(mapStateToProps, {getWeatherMoscow, getWeatherOslo,getWeatherTashkent})(Daily);
