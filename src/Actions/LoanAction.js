import { database } from '../firebase/firebase'

export const UPDATED_LOAN_LIST = "loan_list";

export function getUpdateLoanList() {
    return dispatch => {
        database.ref(`loans`).on('value',(snapshot)=>{
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