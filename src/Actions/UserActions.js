import { auth } from '../firebase/firebase';
export const GET_USER = 'get_user';

export function getUser() {

    return dispatch => {
        return new Promise(function (resolve, reject) {
            auth.onAuthStateChanged(function (user) {
                if (user) {
                    dispatch({
                        type: GET_USER,
                        payload: {
                            loading: false,
                            user
                        }
                    });
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
    return dispatch => auth.createUserWithEmailAndPassword(email, password);
}