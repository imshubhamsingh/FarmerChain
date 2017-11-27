import { database } from '../firebase/firebase'
import {auth} from "../firebase/firebase";

export const UPDATE_PRODUCT_LIST = "update_product_list";


export function setProductRequest(product={}) {
    return dispatch => {
        var user = auth.currentUser;
        product = {
            userId: user.uid,
            username: user.displayName,
            boughtBy: [],
            ...product
        }
        return database.ref('cartFarm').push(product)
    }
}


export function getUpdateProductList() {
    return dispatch => {
        database.ref(`cartFarm`).on('value',(snapshot)=>{
            if(snapshot.val()!==null){
                let updatedProduct = Object.keys(snapshot.val()).map(key => {
                    let ar = snapshot.val()[key]
                    ar.id = key
                    return ar
                })
                dispatch({
                    type: UPDATE_PRODUCT_LIST,
                    updatedProduct
                })
            }

        })
    }
}

export function deleteProductRequest(product={}) {
    return dispatch => {
        database.ref(`cardFarm/${product.id}`).remove()
    }
}

export function acceptProductRequest(productId, userUid) {
    return dispatch => {
        database.ref(`poolFarm/${productId}/boughtBy`).push({
            userUid,
            bought:false
        })
    }
}

export function rejectProductRequest(productId, userkey) {
    return dispatch => {
        database.ref(`poolFarm/${productId}/acceptedBy/${userkey}`).remove()
    }
}

export function boughtProduct(productId, userkey) {
    return dispatch => {
        database.ref(`poolFarm/${productId}/boughtBy/${userkey}`).update({
            bought:true
        })
    }
}