import axios from 'axios'
import {
    AUTH_SUCCESS,
    AUTH_FAILED,
    LOGOUT,
    AUTH_LOADING
} from './types'

export const register = (formData,navigation) => async (dispatch) =>{
    try {
        dispatch({type:AUTH_LOADING,payload:{loading:true}})
        axios.post(' https://messaging-app-api-987.herokuapp.com/api/auth/register',formData)
        .then(response=>{
            
            dispatch({type:AUTH_SUCCESS,payload:{user:response.data.user, token:response.data.token ,loading:false}})
            navigation.replace("Home")
        })
        .catch(err=>{
            dispatch({type:AUTH_FAILED,payload:{errors:err.response?.data ,loading:false}})
        })
        
    } catch (error) {
        console.log(error)
    }
}

export const login = (formData,navigation) => async (dispatch) =>{
    try {
        dispatch({type:AUTH_LOADING,payload:{loading:true}})
        const { data } = await axios.post(' https://messaging-app-api-987.herokuapp.com/api/auth/login',formData)
        console.log(data,"data")
        dispatch({type:AUTH_SUCCESS,payload:{user:data?.user, token:data?.token ,loading:false}})
        navigation.replace("Home")
        
    } catch (error) {
        dispatch({type:AUTH_FAILED,payload:{errors:error.response?.data ,loading:false}})
    }
}

export const logout = (navigation) => dispatch => {
    dispatch({type:LOGOUT,payload:{}})
    navigation.replace("Auth")
}