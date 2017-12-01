import UserReducer from './UserReducer';
import PoolFarmReducer from './PoolFarmReducer'
import CartFarmReducer from "./CartFarmReducer";
import TransactionReducer from "./TransactionReducer";
import FarmerBankReducer from "./FarmerBankReducer";
import PoolReducer from "./PoolReducer";
import { combineReducers } from 'redux'




export const reducer = combineReducers({
    user: UserReducer,
    pools: PoolFarmReducer,
    products: CartFarmReducer,
    transactions: TransactionReducer,
    loans: FarmerBankReducer,
    admin: PoolReducer
})


