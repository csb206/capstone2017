import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDAnI5H_UMm6fihDUIFbKieaXW59jZKaNM",
    authDomain: "healthnuts-cea10.firebaseapp.com",
    databaseURL: "https://healthnuts-cea10.firebaseio.com",
    projectId: "healthnuts-cea10",
    storageBucket: "healthnuts-cea10.appspot.com",
    messagingSenderId: "1051328253497"
};
firebase.initializeApp(config);

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth