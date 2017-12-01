import { auth, database } from '../firebase/firebase';

export const UPDATED_LOAN_LIST = 'loan_list';

export function setLoanRequest(loan={}) {
  return dispatch => {
    var user = auth.currentUser;
    loan = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      status: 'waiting',
      ...loan
    };
    return database.ref('farmerBank').push(loan);
  };
}


export function getUpdateLoanList() {
  return dispatch => {
    database.ref('farmerBank').on('value',(snapshot)=>{
      if(snapshot.val()!==null){
        let updatedLoanList = Object.keys(snapshot.val()).map(key => {
          let ar = snapshot.val()[key];
          ar.id = key;
          return ar;
        });
        dispatch({
          type: UPDATED_LOAN_LIST,
          updatedLoanList
        });
      }

    });
  };
}

export function deleteLoanRequest(loan={}) {
  return dispatch => {
    database.ref(`farmerBank/${loan.id}`).remove();
  };
}

export function payToPool(loan, admin, user) {
  return dispatch => {
    database.ref('transactions').push({
      info:{
        ...loan,
        status: 'pool'
      },
      type: 'loan',
      time: Date.now(),
      from: user,
      to: admin
    });
    database.ref(`users/${user.uid}/money`).transaction(money =>{
      return money - parseFloat(loan.amount);
    });
    database.ref(`users/${admin.uid}/money`).transaction(money =>{
      return money + parseFloat(loan.amount);
    });
  };
}

export function payLoanBack(loan, admin, user) {
  return dispatch => {
    database.ref(`farmerBank/${loan.id}`).update({
      ...loan,
      status: 'paid'
    });
    database.ref('transactions').push({
      info:{
        ...loan,
        status: 'paid'
      },
      type: 'loan',
      time: Date.now(),
      from: user,
      to: admin
    });
    database.ref(`users/${user.uid}/money`).transaction(money =>{
      return money - parseFloat(loan.amount);
    });
    database.ref(`users/${admin.uid}/money`).transaction(money =>{
      return money + parseFloat(loan.amount);
    });
  };
}

export function acceptLoanRequest(loan, user, admin) {
  return dispatch => {
    database.ref(`farmerBank/${loan.id}`).update({
      ...loan,
      status: 'granted'
    });
    database.ref('transactions').push({
      info:{
        ...loan,
        status: 'granted'
      },
      type: 'loan',
      time: Date.now(),
      from: user,
      to: admin
    });
    database.ref(`users/${user.uid}/money`).transaction(money =>{
      return money - parseFloat(loan.amount);
    });
    database.ref(`users/${admin.uid}/money`).transaction(money =>{
      return money + parseFloat(loan.amount);
    });
  };
}

export function rejectLoanRequest(loan) {
  return dispatch => {
    database.ref(`farmerBank/${loan.id}`).update({
      ...loan,
      status:'rejected',
    });
  };
}
