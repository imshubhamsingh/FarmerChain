import {auth, database} from "../firebase/firebase";

export const GET_USER = 'get_user';

export function getUser() {

    return dispatch => {
        return new Promise(function (resolve, reject) {
            auth.onAuthStateChanged(function (user) {
                if (user) {
                    const {uid} = auth.currentUser
                    database.ref(`users/${uid}`).on('value',(snapshot)=>{
                        if(snapshot.val()!==null){
                            let userBankMoney = snapshot.val()["money"]
                            dispatch({
                                type: GET_USER,
                                payload: {
                                    loading: false,
                                    user,
                                    money:userBankMoney
                                }
                            });
                        }
                    })

                } else {
                    dispatch({
                        type: GET_USER,
                        payload: {
                            loading: true
                        }
                    });
                }
            });
        });
    };
}

export function login(email, password) {
    return dispatch => auth.signInWithEmailAndPassword(email, password);

}

export function logout() {
    return dispatch => auth.signOut();
}

export function createAccount(email, password) {
    return dispatch => auth.createUserWithEmailAndPassword(email, password)
}

