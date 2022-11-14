import React, {useState, useEffect} from 'react';
import { getWeatherTashkent, getWeatherMoscow, getWeatherOslo } from '../../store/weather';
import {connect, useSelector} from 'react-redux';
import { ColorRing } from  'react-loader-spinner'


function Hourly({location, weatherOne, getWeatherMoscow, getWeatherOslo, getWeatherTashkent}) {
  const [weather, setWeather] = useState(weatherOne)
  const [time, setTime] = useState([])
  const [number] = useState([1, 2, 3 , 4 ,5])
  const [thisTime] = useState(new Date().getHours() + 1)
  const [day, setDay] = useState('')
  const date = useSelector((state) => state.dateReducer.value)
   
  function getThisTime(){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let newArr = []
    setDay(date.getDate() + " " + months[date.getMonth()] );
        for (const i of number){
          let hour = date.getHours() + i;
          newArr.push(hour +  " : 00")
        }
        setTime(newArr) 
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
    doGet()
    getThisTime()
    setWeather(weatherOne)
  }, [])
  useEffect(()=>{
    setWeather(weatherOne)
  },[weatherOne])

useEffect(()=>{
  doGet()
  getThisTime()
}, [location])

  return (
    <div>
       {weather.length !==0 ?
        <div className='row'>
          {time.length !==0 ? time.map((item, index)=>{
            return (
              <div className='col-md-2 m-2 ps-1 one-hour' key={index}>
               <h6 className='mt-2'> {day}</h6>
                <h5>{item} </h5>
                <p className='fs-3 text-danger fw-bold'>{weather.hourly.temperature_2m[index + thisTime]} &#xb0;</p>
                <p>Cloud: {weather.hourly.cloudcover_low[index + thisTime]} % </p>
              </div>
            )
          }) :''} 
        </div>
      :<ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />}  
    </div>
  )
}
const mapStateToProps=(state)=>{
  return {weatherOne : state.weatherOneReducer.weatherOne}
}

export default connect(mapStateToProps, {getWeatherMoscow, getWeatherOslo,getWeatherTashkent})(Hourly);
