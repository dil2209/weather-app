import React, {useEffect, useState} from 'react'
import './index.css'
import Hourly from '../Hourly/Hourly'
import Daily from '../Daily/Daily'
import cloudySunny from '../../images/cloudySunnyIcon.png'
import  cloudy from '../../images/cloudiIcon.png'
import sunny from '../../images/sunnyIcon.png'
import rainy from '../../images/rainyIcon.png'
import snowy from '../../images/snowyIcon.png'
 import { getWeatherOslo, getWeatherMoscow, getWeatherTashkent } from '../../store/weather'
 import {connect, useSelector, useDispatch} from 'react-redux'
import {setDate, changeDateToMoscow, changeDateToOslo} from '../Daily/dateSlice'


function WeatherMain({weatherOne, getWeatherMoscow, getWeatherOslo, getWeatherTashkent}) {
const [hourly, setHourly] = useState(true)
const [daily, setDaily] = useState(false)
const [weatherImg, setWeatherImg] = useState(cloudySunny)
const [location, setLocation] = useState('Tashkent, Uzbekistan')
const [today, setToday] = useState('')
const [months] = useState(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])
const [hour, setHour] = useState(0)
const [title, setTitle] = useState('')
const [locationClass, setLocationClass] = useState('Tashkent')
const date = useSelector((state) => state.dateReducer.value)
const dispatch = useDispatch()



   function changeHourly(){
     setHourly(true);
     setDaily(false);
  }
   function changeDaily(){
    setHourly(false);
    setDaily(true);
  }
   function chooseLocation(e){
    let a = e.target.value
    if(a === 'Oslo, Norway'){
      setLocation(a)
      setLocationClass('Oslo')
      getWeatherOslo()
      dispatch(changeDateToOslo())
      setToday(date.getDate() + " " + months[date.getMonth()] + " , " + date.getFullYear())
      setHour(date.getHours())
      console.log(weatherOne)
   }else if(a === 'Moscow, Russia'){
      setLocation(a)
      setLocationClass('Moscow')
      getWeatherMoscow()
      dispatch(changeDateToMoscow())
      setToday(date.getDate() + " " + months[date.getMonth()] + " , " + date.getFullYear())
       setHour(date.getHours())
       console.log(weatherOne)  
    }else{
      setLocation('Tashkent, Uzbekistan')
      setLocationClass('Tashkent')
      doGet();
      console.log(weatherOne)
   }
  }
  function doGet(){
      getWeatherTashkent()
      dispatch(setDate())
      setToday(date.getDate() + " " + months[date.getMonth()] + " , " + date.getFullYear())
       setHour(date.getHours())
     console.log(weatherOne)
  }
  function setImage(){
   if( weatherOne.daily.snowfall_sum[0] > 10){
    setWeatherImg(snowy)
    setTitle('Snowy')
    console.log("snowy")
   }else if( weatherOne.daily.rain_sum[0] > 10){
    setWeatherImg(rainy)
    console.log(weatherOne.daily.rain_sum[0] )
    setTitle('Rainy')
    console.log("rainy")
   }else if( weatherOne.hourly.cloudcover_low[hour] >10) {
     setWeatherImg(cloudy)
     setTitle('Cloudy')
     console.log("cloudyy")
   }else{
    setWeatherImg(sunny)
    setTitle('Sunny')
    console.log("sunnyy")
  }
  }
  useEffect(()=>{
    doGet();
  }, [])

  useEffect(()=>{
    if(weatherOne.length !== 0){
      setImage()
    }
  }, [weatherOne])
 return (
    <div className={"weatherMain container w-75 " + locationClass} >
      <div className='row'>
        <div className='col-md-10 offset-1'>
        <select className='form-control w-75 border rounded ms-5 mb-3 text-muted' onChange={(e)=>chooseLocation(e)}>
        <option>Select a city!</option>
        <option value="Tashkent, Uzbekistan"> Tashkent, Uzbekistan</option>
        <option value="Moscow, Russia"> Moscow, Russia</option>
        <option value="Oslo, Norway"> Oslo, Norway</option>
     </select>
        </div>
      </div>
     
      <div className='row'>
    <div className='col-md-5 offset-1'>
     <h2 className='text-light'>{location}</h2>
     <h4 className='text-light'>{today}</h4>
      <img src={weatherImg} alt='weatherImg' className='mainImage'></img>
     <p className='fw-bold text-light fs-3'>{title}</p>
    </div>
    <div className='col-md-5 text-end'>
        <span className='big-font'>
          {weatherOne.length !==0? weatherOne.hourly.temperature_2m[hour] : ''} &#8451;
        </span> 
    </div>
</div>
<div className='row'>
    <div className='col-md-2 offset-1'>
      <p className='change-details' onClick={changeHourly}>Hourly</p>
      {hourly? <span className='line'></span> :''}
    </div>
    <div className='col-md-2 '>
      <p className='change-details' onClick={changeDaily}>Daily</p>
      {daily? <span className='line'></span> : ''}
    </div>
  </div>
  <div className='row'>
    <div className="col-md-10 offset-1">
       <span className='big-line my-2'></span>
    </div>
    <div className='row mt-3'>
      <div className='col-md-10 offset-1'>
        {hourly? <Hourly location={location}/> :''}
        {daily? <Daily location={location}/> : ''}
      </div>
    </div>
   </div>
</div>
  )
}
const mapStateToProps=(state)=>{
  return {weatherOne : state.weatherOneReducer.weatherOne}
}
// const mapDispatchToProps=(dispatch)=>{
//   return {
//      delItem: (id)=>dispatch(delDaraja(id))
//   }
// }

export default connect(mapStateToProps, {getWeatherMoscow, getWeatherOslo,getWeatherTashkent})(WeatherMain);


