import { GET_POOL_MONEY } from '../Actions/PoolActions';


const pool_money = 0;

export default function (state = 0, action) {
    switch (action.type) {
        case GET_POOL_MONEY:
            return action.PoolMoney
        default:
            return state;
    }
}