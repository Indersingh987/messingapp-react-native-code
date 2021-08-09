import axios from 'axios'
import { REQUEST_LIST, REQUEST_LIST_LOADING,ACCEPT,ACCEPT_LOADING,REJECT_LOADING,REJECT } from './types'
import AsyncStorage from '@react-native-async-storage/async-storage'

const getRequestList = () => async (dispatch) =>{
    let token = await AsyncStorage.getItem('token')
    token = await JSON.stringify(token)
    const t = token.slice(3,token.length-3)

    try {
        dispatch({type:REQUEST_LIST_LOADING})
        const {data} = await axios.get(' https://messaging-app-api-987.herokuapp.com/api/request',{headers:{'Authorization':t}})
        dispatch({type:REQUEST_LIST,payload:data})
    } catch (error) {
        console.log('err in getRequestList',error)
    }
}

const acceptRequest = (id,index) => async (dispatch) => {
    let token = await AsyncStorage.getItem('token')
    token = await JSON.stringify(token)
    const t = token.slice(3,token.length-3)

    try {
        dispatch({type:ACCEPT_LOADING,payload:index})
        const {data} = await axios.post(' https://messaging-app-api-987.herokuapp.com/api/request/accept',{id},{headers:{'Authorization':t}})
        dispatch({type:ACCEPT,payload:index})
    } catch (error) {
        console.log('err in accepting request',error)
    }
}

const rejectRequest = (id,index) => async (dispatch) => {
    let token = await AsyncStorage.getItem('token')
    token = await JSON.stringify(token)
    const t = token.slice(3,token.length-3)

    try {
        dispatch({type:REJECT_LOADING,payload:index})
        const {data} = await axios.post(' https://messaging-app-api-987.herokuapp.com/api/request/reject',{id},{headers:{'Authorization':t}})
        dispatch({type:REJECT,payload:index})
    } catch (error) {
        console.log('err in rejecting request',error)
    }
}

export { getRequestList,acceptRequest,rejectRequest }