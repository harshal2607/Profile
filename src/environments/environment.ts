import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiInitial: 'https://identitytoolkit.googleapis.com/v1/accounts:',
  apiKey: 'AIzaSyCUIM_PzUu_9s4gGqW7D_EkdXdWyDDC8hQ',
  authDomain: 'angulartask-54360.firebaseapp.com',
  databaseURL: 'https://angulartask-54360-default-rtdb.firebaseio.com',
  projectId: 'angulartask-54360',
  storageBucket: 'angulartask-54360.appspot.com',
  messagingSenderId: '666553546509',
  appId: '1:666553546509:web:1d6d7f2a8130785e87e244',
  measurementId: 'G-PVK73CZ1DK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
