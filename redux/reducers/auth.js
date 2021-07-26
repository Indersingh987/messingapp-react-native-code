import { AUTH_FAILED, AUTH_LOADING, AUTH_SUCCESS, LOGOUT } from '../actions/types'
// import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {}

const reducer = ( state=initialState, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            // await AsyncStorage.setItem('user',JSON.stringify(action.payload.user))
            // await AsyncStorage.setItem('token',JSON.stringify(action.payload.token))
            return action.payload
        case AUTH_FAILED:
            return action.payload
        case AUTH_LOADING:
            return action.payload
        case LOGOUT:
            // await AsyncStorage.removeItem('user')
            // await AsyncStorage.removeItem('token')
            // await AsyncStorage.clear()
            return null
        default:
            return state
    }
}

export default reducer
