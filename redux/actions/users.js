import axios from 'axios'
import { GET_ALL_USERS, SEARCH_USER,CANCLE,CANCLE_LOADING,REQUEST,REQUEST_LOADING,GET_ALL_USERS_LOADING,SEARCH_USER_LOADING } from './types'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getAllUsers = () => async (dispatch) =>{
    dispatch({type:GET_ALL_USERS_LOADING,payload:[]})
    let token = await AsyncStorage.getItem('token')
    token = await JSON.stringify(token)
    const t = token.slice(3,token.length-3)
    
    try {
        const {data} = await  axios.get(' https://messaging-app-api-987.herokuapp.com/api/users',{headers:{'Authorization': t}})
        dispatch({type:GET_ALL_USERS,payload:data})
    } catch (error) {
        console.log('in user action err function',error.message)
        dispatch({type:GET_ALL_USERS,payload:[]})
    }
}

export const search = (searchQuery) => async (dispatch) => {
    let token = await AsyncStorage.getItem('token')
    token = await JSON.stringify(token)
    const t = token.slice(3,token.length-3)

    try {
        dispatch({type:SEARCH_USER_LOADING,payload:[]})
        const {data} = await axios.post(' https://messaging-app-api-987.herokuapp.com/api/users/search',{ searchQuery },{headers:{'Authorization':t}});
        dispatch({type:SEARCH_USER,payload:data})
    } catch (error) {
        console.log('err in fetching search query ',error.message)
    }
}

export const cancle = (id,index) => async (dispatch) => {
    let token = await AsyncStorage.getItem('token')
    token = await JSON.stringify(token)
    const t = token.slice(3,token.length-3)

    try {
        dispatch({type:CANCLE_LOADING,payload:index})
        const {data} = await axios.post(' https://messaging-app-api-987.herokuapp.com/api/request/cancle',{ id },{headers:{'Authorization':t}});
        dispatch({type:CANCLE,payload:index})
    } catch (error) {
        console.log('err in sending request ',error.message)
    }
}

export const request = (id,index) => async (dispatch) => {
    let token = await AsyncStorage.getItem('token')
    token = await JSON.stringify(token)
    const t = token.slice(3,token.length-3)

    try {
        dispatch({type:REQUEST_LOADING,payload:index})
        const {data} = await axios.post(' https://messaging-app-api-987.herokuapp.com/api/request/send',{ id },{headers:{'Authorization':t}});
        dispatch({type:REQUEST,payload:index})
    } catch (error) {
        console.log('err in sending reqquest ',error.message)
    }
}