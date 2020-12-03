import weatherReducer from './weatherReducer';
import settingsReducer from './settingsReducer';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    weatherReducer,
    settingsReducer
})

export default rootReducer;