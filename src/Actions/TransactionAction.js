import { database } from '../firebase/firebase';

export const UPDATE_TRANSACTION_LIST = 'update_transaction_list';

export function getUpdateTransactiontList() {
  return dispatch => {
    database.ref('transactions').on('value',(snapshot)=>{
      if(snapshot.val()!==null){
        let updatedTransactions = Object.keys(snapshot.val()).map(key => {
          let ar = snapshot.val()[key];
          ar.id = key;
          return ar;
        });
        dispatch({
          type: UPDATE_TRANSACTION_LIST,
          updatedTransactions
        });
      }

    });
  };
}