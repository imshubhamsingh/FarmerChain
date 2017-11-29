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

export function acceptLoanRequest(loan, userId, adminId) {
    return dispatch => {
        database.ref(`farmerBank/${loan.id}`).update({
            ...loan,
            status: "granted"
        })
        console.log({
            loan,
            adminId,
            userId
        })
        database.ref(`transactions`).push({
            info:{
                ...loan
            },
            type: "loan",
            time: Date.now(),
            from: userId,
            to: adminId
        })
        database.ref(`users/${userId}/money`).transaction(money =>{
            return money - parseFloat(loan.amount)
        })
        database.ref(`users/${adminId}/money`).transaction(money =>{
            return money + parseFloat(loan.amount)
        })
    }
}

export function rejectLoanRequest(loan) {
    return dispatch => {
        database.ref(`farmerBank/${loan.id}`).update({
            ...loan,
            status:"rejected",
        })
    }
}

function transferMoney(loan={}, userId, adminId) {
    console.log({
        from: userId,
        to: userId,
        ...adminId
    })
    return dispatch => {

    }
}