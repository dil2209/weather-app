import axios from 'axios'

const api=({dispatch})=>(next)=>(action)=>{
    if(action.type !== 'api/apiCall'){
        next(action)
        return
    }
    next(action)
    const {url, method, data, onSuccess} = action.payload
    axios({
        baseURL:'https://api.open-meteo.com/v1/forecast',
        url,
        method,
        data
    }).then(res=>{
        dispatch({
              type:onSuccess,
              payload:res.data
            })
            // .catch(err=>{
            //     dispatch({
            //         type:onFail,
            //         payload:err.data
            //     })
            // })
        })

}

export default api;