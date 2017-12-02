import { UPDATE_WEB3 } from '../Actions/Web3Action';
export default function (state = {}, action) {
    switch (action.type) {
        case UPDATE_WEB3:
            console.log(action.payload)
            return {...action.payload};
        default:
            return state;
    }
}