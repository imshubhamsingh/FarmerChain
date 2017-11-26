import UserReducer from './UserReducer';

import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage' // dfault: localStorage if web, AsyncStorage if react-native

const config = {
    key: 'root',
    storage,
}

export const reducer = persistCombineReducers(config, {
    user: UserReducer
})


