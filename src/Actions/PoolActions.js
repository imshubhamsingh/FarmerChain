import {auth, database} from "../firebase/firebase";

export const GET_POOL_MONEY = 'get_pool_money';

export function getAdminMoney(){
    return dispatch => {
        database.ref(`users`).on('value',(snapshot)=>{
            if(snapshot.val()!==null){
                let PoolMoney = 0;
                 Object.keys(snapshot.val()).map(key => {
                    if(snapshot.val()[key].type === "admin"){
                        PoolMoney = snapshot.val()[key].money
                    }
                })
                dispatch({
                    type: GET_POOL_MONEY,
                    PoolMoney
                })
            }

        })
    }

}

