import { database } from '../firebase/firebase'
import {auth} from "../firebase/firebase";

export const UPDATE_POOL = "update_pool";


export function setPoolRequest(pool={}) {
    return dispatch => {
        var user = auth.currentUser;
        pool = {
            userId: user.uid,
            username: user.displayName,
            acceptedBy: [],
            ...pool
        }
        return database.ref('poolFarm').push(pool)
    }
}


export function getUpdatePoolList() {
    return dispatch => {
        database.ref(`poolFarm`).on('value',(snapshot)=>{
            if(snapshot.val()!==null){
                let updatedPool = Object.keys(snapshot.val()).map(key => {
                    let ar = snapshot.val()[key]
                    ar.id = key
                    return ar
                })
                dispatch({
                    type: UPDATE_POOL,
                    updatedPool
                })
            }

        })
    }
}

export function deletePoolRequest(pool={}) {
    return dispatch => {
        database.ref(`poolFarm/${pool.id}`).remove()
    }
}

export function acceptPoolRequest(poolId, user) {
    return dispatch => {
        database.ref(`poolFarm/${poolId}/acceptedBy`).push({
            ...user
        })
    }
}

export function rejectPoolRequest(poolId, userkey) {
    return dispatch => {
        database.ref(`poolFarm/${poolId}/acceptedBy/${userkey}`).remove()
    }
}