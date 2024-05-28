import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

firebase.initializeApp({
    apiKey: "AIzaSyCJq1Ji2blbRqFMHvoJWgr2_EmYYv4uIpQ",
    authDomain: "myblogsite-a7026.firebaseapp.com",
    projectId: "myblogsite-a7026",
    storageBucket: "myblogsite-a7026.appspot.com",
    messagingSenderId: "1003653671378",
    appId: "1:1003653671378:web:c3b7df106b9a5c0b3e400b",
    measurementId: "G-51KQBNDHNJ",
    // storageBucket: 'gs://myblogsite-a7026.appspot.com'
});

const fb = firebase;

export default fb;