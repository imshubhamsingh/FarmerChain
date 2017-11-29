import { auth, database } from '../firebase/firebase'

export const UPDATED_LOAN_LIST = "loan_list";

export function setLoanRequest(loan={}) {
    return dispatch => {
        var user = auth.currentUser;
        loan = {
            userId: user.uid,
            username: user.displayName,
            status: "waiting",
            ...loan
        }
        return database.ref('farmerBank').push(loan)
    }
}


export function getUpdateLoanList() {
    return dispatch => {
        database.ref(`farmerBank`).on('value',(snapshot)=>{
            if(snapshot.val()!==null){
                let updatedLoanList = Object.keys(snapshot.val()).map(key => {
                    let ar = snapshot.val()[key]
                    ar.id = key
                    return ar
                })
                dispatch({
                    type: UPDATED_LOAN_LIST,
                    updatedLoanList
                })
            }

        })
    }
}

export function deleteLoanRequest(loan={}) {
    return dispatch => {
        database.ref(`farmerBank/${loan.id}`).remove()
    }
}

export function acceptLoanRequest(loan, admin, user) {
    return dispatch => {
        database.ref(`farmerBank/${loan.id}`).update({
            status: "granted",
            ...loan
        }).then(()=>{
            transferMoney(loan, admin, user)
        })
    }
}

export function rejectLoanRequest(loan, user) {
    return dispatch => {
        database.ref(`farmerBank/${loan.id}`).update({
            status: "rejected",
            ...loan
        })
    }
}

export function transferMoney(loan={}, user, admin) {
    return dispatch => {
        database.ref(`transactions`).push({
            info:{
                ...loan
            },
            type: "loan",
            time: Date.now(),
            from: user,
            to: admin
        })
        database.ref(`users/${user.uid}/money`).transaction(money =>{
            return money - parseFloat(loan.amount)
        })
        database.ref(`users/${admin.uid}/money`).transaction(money =>{
            return money + parseFloat(loan.amount)
        })
    }
}