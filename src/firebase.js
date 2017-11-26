import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyB3XfEJnq67i_9cmrql0putRJRqFzLgNJI',
  authDomain: 'auth-3c3c5.firebaseapp.com',
  databaseURL: 'https://auth-3c3c5.firebaseio.com',
  projectId: 'auth-3c3c5',
  storageBucket: 'auth-3c3c5.appspot.com',
  messagingSenderId: '274682722702',
};

// the root app just in case we need it
export const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database(); // the real-time database
export const auth = firebaseApp.auth(); // the firebase auth namespace

export const storageKey = 'auth-3c3c5.appspot.com';
