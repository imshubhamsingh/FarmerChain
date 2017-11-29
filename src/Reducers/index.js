import UserReducer from './UserReducer';
import PoolFarmReducer from './PoolFarmReducer'
import CartFarmReducer from "./CartFarmReducer";
import TransactionReducer from "./TransactionReducer";
import FarmerBankReducer from "./FarmerBankReducer";


import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'

const config = {
    key: 'root',
    storage,
}

export const reducer = persistCombineReducers(config, {
    user: UserReducer,
    pools: PoolFarmReducer,
    products: CartFarmReducer,
    transactions: TransactionReducer,
    loans: FarmerBankReducer
})


