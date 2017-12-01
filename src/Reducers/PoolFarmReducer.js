import { UPDATE_POOL} from '../Actions/PoolFarmAction';


const pool = [];

export default function (state = pool, action) {
    switch (action.type) {
        case UPDATE_POOL:
            return [
                ...action.updatedPool
                ]
        default:
            return state;
    }
}