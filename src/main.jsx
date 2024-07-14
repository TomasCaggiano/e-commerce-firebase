import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbNjRAyE0SbdIOkGgw8h7tdf40vnJBwzI",
  authDomain: "e-commerce-firebase-b1a04.firebaseapp.com",
  projectId: "e-commerce-firebase-b1a04",
  storageBucket: "e-commerce-firebase-b1a04.appspot.com",
  messagingSenderId: "824714768081",
  appId: "1:824714768081:web:c1a8f274933d57c8b81ff0",
  measurementId: "G-Y7W2MLGLE1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
