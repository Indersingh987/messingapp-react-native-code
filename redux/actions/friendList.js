import {FRIEND_LIST_LOADING,FRIEND_LIST} from './types'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getFriendList = () => async (dispatch) => {
    let token = await AsyncStorage.getItem('token')
    token = await JSON.stringify(token)
    const t = token.slice(3,token.length-3)

    try {
        dispatch({type:FRIEND_LIST_LOADING})
        const {data} = await axios.get(' https://messaging-app-api-987.herokuapp.com/api/friend',{headers:{'Authorization':t}})
        dispatch({type:FRIEND_LIST,payload:data})
    } catch (error) {
        console.log('err in fething friend list',error)
    }
}

export const friend = (id,navigator) => {
    navigator.push(`/room/${id}`)
}