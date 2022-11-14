import { createSlice } from "@reduxjs/toolkit";



export const dateSlice = createSlice({
    name:'date',
    initialState:{
        value: new Date(new Date().toLocaleString('uz',{
            timeZone:'Asia/Tashkent'
          }))
    },
    reducers:{
        changeDateToOslo: (state)=>{
           state.value =  new Date(new Date().toLocaleString('en',{
            timeZone:'Europe/Oslo'}))
        },
        changeDateToMoscow: (state)=>{
            state.value = new Date(new Date().toLocaleString('en',{
                timeZone:'Europe/Moscow'
              }))
        },
        setDate:(state)=>{
          state.value = new Date(new Date().toLocaleString('uz',{
            timeZone:'Asia/Tashkent'
          })) 
        }
    },
})
export const {setDate, changeDateToMoscow, changeDateToOslo} = dateSlice.actions;
export default dateSlice.reducer;