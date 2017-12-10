import { auth, database } from '../firebase/firebase';

export const GET_USER = 'get_user';

export function getUser() {
	return (dispatch) => {
		return new Promise(function(resolve, reject) {
			auth.onAuthStateChanged(function(user) {
				if (user) {
					const { uid } = auth.currentUser;
					database.ref(`users/${uid}`).on('value', (snapshot) => {
						if (snapshot.val() !== null) {
							const payload = {
								loading: false,
								user,
								...snapshot.val()
							};
							dispatch({
								type: GET_USER,
								payload
							});
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
	return (dispatch) => auth.signInWithEmailAndPassword(email, password);
}

export function logout() {
	return (dispatch) => auth.signOut();
}

export function createAccount(email, password, signUpDisplayName, account) {
	return (dispatch) =>
		auth.createUserWithEmailAndPassword(email, password).then((user) => {
			user.updateProfile({ displayName: signUpDisplayName });
			var newUser = auth.currentUser;
			var userDetails = {};
			if (user != null) {
				userDetails = {
					name: signUpDisplayName,
					email: newUser.email,
					uid: newUser.uid,
					money: 1000,
					poolAccepted: [],
					...account
				};
			}
			database.ref(`users/${userDetails.uid}`).set(userDetails);
		});
}
