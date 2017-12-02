import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCHfvinZCTzaHbUedTf68YaRBWOBEufs3w",
    authDomain: "reactjsfin.firebaseapp.com",
    databaseURL: "https://reactjsfin.firebaseio.com",
    projectId: "reactjsfin",
    storageBucket: "reactjsfin.appspot.com",
    messagingSenderId: "435192790797"
};

export const firebaseApp = firebase.initializeApp(config);

export const LoginCheckModule = (fn)=> firebaseApp.auth().onAuthStateChanged(user=> fn(user))

export const auth = firebaseApp.auth();

export const database = firebaseApp.database();

