import { database } from '../firebase/firebase'
import {auth} from "../firebase/firebase";

export const SET_POOL_REQUEST = 'set_pool_request';
export const ADD_POOL_REQUEST = "add_pool_request";
export const REMOVE_POOL_REQUEST ="remove_pool_request";
export const EDIT_POOL_REQUEST = "edit_pool_request";
export const UPDATE_POOL = "update_pool";


export function setPoolRequest(pool={}) {
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

export function getPoolList() {
    return dispatch => {
        database.ref(`poolFarm`).once('value').then((snapshot) => {
            const pool = [];
            snapshot.forEach((childSnapshot) => {
                pool.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch({
                type: SET_POOL_REQUEST,
                pool
            })
        })
    }
}

export function getUpdatePoolList() {
    return dispatch => {
        database.ref(`poolFarm`).on('value',(snapshot)=>{
            dispatch({
                type: UPDATE_POOL,
                pool: snapshot.val()
            })
        })
    }
}
