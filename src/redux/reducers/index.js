import getloginreducer from './login_reducer'
import { combineReducers } from 'redux'



export default combineReducers(
    {
        userinfo: getloginreducer
    }
)