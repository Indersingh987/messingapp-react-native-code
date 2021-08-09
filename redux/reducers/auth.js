import { AUTH_FAILED, AUTH_LOADING, AUTH_SUCCESS, LOGOUT } from '../actions/types'

const initialState = {}

const reducer = ( state=initialState, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return action.payload
        case AUTH_FAILED:
            return action.payload
        case AUTH_LOADING:
            return action.payload
        case LOGOUT:
            return action.payload
        default:
            return state
    }
}

export default reducer
