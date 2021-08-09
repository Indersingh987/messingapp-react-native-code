import axios from 'axios'
import {
    AUTH_SUCCESS,
    AUTH_FAILED,
    LOGOUT,
    AUTH_LOADING
} from './types'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const register = (formData,navigation) => async (dispatch) =>{
    try {
        dispatch({type:AUTH_LOADING,payload:{loading:true}})
        const { data } = await axios.post(' https://messaging-app-api-987.herokuapp.com/api/auth/register',formData)
        await AsyncStorage.setItem('user',JSON.stringify(data.user))
        await AsyncStorage.setItem('token',JSON.stringify(data.token))
        dispatch({type:AUTH_SUCCESS,payload:{user:data?.user, token:data?.token ,loading:false}})
        navigation.replace("Home")
        
    } catch (error) {
        dispatch({type:AUTH_FAILED,payload:{errors:error.response?.data ,loading:false}})
    }
}

export const login = (formData,navigation) => async (dispatch) =>{
    try {
        dispatch({type:AUTH_LOADING,payload:{loading:true}})
        const { data } = await axios.post(' https://messaging-app-api-987.herokuapp.com/api/auth/login',formData)
        await AsyncStorage.setItem('user',JSON.stringify(data.user))
        await AsyncStorage.setItem('token',JSON.stringify(data.token))
        dispatch({type:AUTH_SUCCESS,payload:{user:data?.user, token:data?.token ,loading:false}})
        navigation.replace("Home")
        
    } catch (error) {
        
        dispatch({type:AUTH_FAILED,payload:{errors:error.response?.data ,loading:false}})
    }
}

export const checkUser = (navigation) => async(dispatch) => {
    try {
        let u = await AsyncStorage.getItem('user')
        if(u){
            navigation.replace("Home")
        }else{
            navigation.replace("Auth")
        }
        
    } catch (error) {
        console.log(error)
    }
}

export const logout = (navigation) => async (dispatch) => {
    dispatch({type:LOGOUT,payload:{}})
    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('token')
    await AsyncStorage.clear()
    navigation.replace("Auth")
}

export const getUser = () => async (dispatch) => {
    return await AsyncStorage.getItem('user')
}