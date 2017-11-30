import {database} from "../firebase/firebase";

export const GET_POOL_MONEY = 'get_pool_money';

export function getAdminMoney(){
    return dispatch => {
        database.ref(`users`).on('value',(snapshot)=>{
            if(snapshot.val()!==null){
                let PoolMoney = 0;
                let adminDetails = {}
                 Object.keys(snapshot.val()).map(key => {
                    if(snapshot.val()[key].type === "admin"){
                            PoolMoney=snapshot.val()[key].money
                            adminDetails={
                                displayName: snapshot.val()[key].name,
                                uid: snapshot.val()[key].uid,
                                email: snapshot.val()[key].email
                            }
                    }
                    return null
                })
                dispatch({
                    type: GET_POOL_MONEY,
                    PoolMoney,
                    adminDetails
                })
            }

        })
    }

}

