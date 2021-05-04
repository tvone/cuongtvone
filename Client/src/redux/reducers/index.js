import {combineReducers} from 'redux'
import authReducer from './authReducer'
import tokenReducer from './tokenReducer'
import userReducer from './userReducer'
const rootReducer = combineReducers({
    authReducer,
    tokenReducer,
    userReducer
})

export default rootReducer