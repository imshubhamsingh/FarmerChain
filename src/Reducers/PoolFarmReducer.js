import { ADD_POOL_REQUEST, SET_POOL_REQUEST, REMOVE_POOL_REQUEST, EDIT_POOL_REQUEST, UPDATE_POOL} from '../Actions/PoolFarmAction';


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
        case SET_POOL_REQUEST:
            return action.pool;
        case UPDATE_POOL:
            return [
                ...state,
                action.pool
            ]
        default:
            return state;
    }
}