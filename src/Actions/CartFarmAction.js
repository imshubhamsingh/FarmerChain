import { database } from '../firebase/firebase';
import {auth} from '../firebase/firebase';

export const UPDATE_PRODUCT_LIST = 'update_product_list';


export function setProductRequest(product={}) {
  return dispatch => {
    var user = auth.currentUser;
    product = {
      userId: user.uid,
      username: user.displayName,
      boughtBy: [],
      ...product
    };
    return database.ref('cartFarm').push(product);
  };
}


export function getUpdateProductList() {
  return dispatch => {
    database.ref('cartFarm').on('value',(snapshot)=>{
      if(snapshot.val()!==null){
        let updatedProduct = Object.keys(snapshot.val()).map(key => {
          let ar = snapshot.val()[key];
          ar.id = key;
          return ar;
        });
        dispatch({
          type: UPDATE_PRODUCT_LIST,
          updatedProduct
        });
      }

    });
  };
}

export function deleteProductRequest(product={}) {
  return dispatch => {
    database.ref(`cartFarm/${product.id}`).remove();
  };
}

export function acceptProductRequest(productId, user) {
  return dispatch => {
    database.ref(`cartFarm/${productId}/boughtBy`).push({
      bought:false,
      ...user
    });
  };
}

export function rejectProductRequest(productId, userkey) {
  return dispatch => {
    database.ref(`cartFarm/${productId}/boughtBy/${userkey}`).remove();
  };
}

export function boughtProduct(productId,account, userkey, user, price) {
  return dispatch => {
    database.ref(`cartFarm/${productId}/boughtBy/${userkey}`).update({
      bought:true,
      price: price,
      boughtAccount: account,
      ...user
    });
  };
}

export function payForProduct(product={}, user, buyer,result) {
  return dispatch => {
    database.ref('transactions').push({
      info:{
        ...product,
          id: result
      },
      type: 'product',
      time: Date.now(),
      from: user,
      to: buyer
    });
    database.ref(`users/${user.uid}/money`).transaction(money =>{
      return money - parseFloat(product.price);
    });
    database.ref(`users/${buyer.uid}/money`).transaction(money =>{
      return money + parseFloat(product.price);
    });
    database.ref(`cartFarm/${product.id}`).remove();
  };

}