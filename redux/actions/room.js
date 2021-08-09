import axios from 'axios'
import {ROOM,ROOM_LOADING,CREATE_MESSAGE} from './types'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getList = (id) => async(dispatch) => {
    let token = await AsyncStorage.getItem('token')
    token = await JSON.stringify(token)
    const t = token.slice(3,token.length-3)

    try {
        dispatch({type:ROOM_LOADING})
        const {data} = await axios.post(' https://messaging-app-api-987.herokuapp.com/api/message',{id},{headers:{'Authorization':t}})
        dispatch({type:ROOM,payload:{list:data.list,friend:data.friend}})
    } catch (error) {
        console.log('err in messages',error.message)
    }
}

export const create = (id,text,time) => async (dispatch) => {
    let token = await AsyncStorage.getItem('token')
    token = await JSON.stringify(token)
    const t = token.slice(3,token.length-3)

    try {
        // dispatch({type:ROOM_LOADING})
        const {data} = await axios.post(' https://messaging-app-api-987.herokuapp.com/api/message/new',{id,text,time},{headers:{'Authorization':t}})
        // dispatch({type:ROOM,payload:{list:data.list,friend:data.friend}})
    } catch (error) {
        console.log('err in creating message',error)
    }
}