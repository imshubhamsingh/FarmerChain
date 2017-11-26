import { database } from '../firebase/firebase'
import {auth} from "../firebase/firebase";

export const SET_POOL_REQUEST = 'set_pool_request';
export const ADD_POOL_REQUEST = "add_pool_request";
export const REMOVE_POOL_REQUEST ="remove_pool_request";
export const EDIT_POOL_REQUEST = "edit_pool_request";


export function setPoolRequest(pool={}) {
    console.log("called SetPoolRequest")
    return dispatch => {
        var user = auth.currentUser;
        pool = {
            userId: user.uid,
            username: user.displayName,
            ...pool
        }
         database.ref('poolFarm').push(pool).then((ref)=>{
            dispatch({
                type: ADD_POOL_REQUEST,
                pool:{
                    id: ref.key,
                    userId: user.uid,
                    ...pool
                }

            })
        })
    }
}