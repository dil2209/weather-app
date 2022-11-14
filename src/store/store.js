import { configureStore } from '@reduxjs/toolkit';
import weatherOneReducer from './weather';
import dateReducer from '../components/Daily/dateSlice'

import api from './middleware/api'

export const store = configureStore({
    reducer: {
      weatherOneReducer,
      dateReducer:dateReducer
     
},
    middleware:[api]
  })