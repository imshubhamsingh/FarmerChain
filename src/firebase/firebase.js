import * as firebase from 'firebase';

const config = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
};

export const firebaseApp = firebase.initializeApp(config);

export const LoginCheckModule = (fn) => firebaseApp.auth().onAuthStateChanged((user) => fn(user));

export const auth = firebaseApp.auth();

export const database = firebaseApp.database();
