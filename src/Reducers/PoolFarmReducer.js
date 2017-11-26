import { ADD_POOL_REQUEST, GET_POOL_REQUEST, REMOVE_POOL_REQUEST, EDIT_POOL_REQUEST } from '../Actions/PoolFarmAction';


const pool = [];

export default function (state = pool, action) {
    switch (action.type) {
        case ADD_POOL_REQUEST:
            return [
                ...state,
                action.pool
            ];
        case REMOVE_POOL_REQUEST:
            return state.filter(({ id }) => id !== action.id);
        case EDIT_POOL_REQUEST:
            return state.map((pool) => {
                if (pool.id === action.id) {
                    return {
                        ...pool,
                        ...action.updates
                    };
                } else {
                    return pool;
                }
            });
        case 'GET_POOL_REQUEST':
            return action.pool;
        default:
            return state;
    }
}