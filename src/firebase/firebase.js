import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCNlEBXTBdIG5N31D2bl5FlFSzjT1DiBio",
    authDomain: "digitalocean-1a580.firebaseapp.com",
    databaseURL: "https://digitalocean-1a580.firebaseio.com",
    projectId: "digitalocean-1a580",
    storageBucket: "digitalocean-1a580.appspot.com",
    messagingSenderId: "104470064238"
};

export const firebaseApp = firebase.initializeApp(config);

