// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDOS64uS8jGUJlg0KNtuhZRAosC0Hc8D5w",
	authDomain: "react-first-project-baee4.firebaseapp.com",
	projectId: "react-first-project-baee4",
	storageBucket: "react-first-project-baee4.firebasestorage.app",
	messagingSenderId: "76823873688",
	appId: "1:76823873688:web:64af6803abf126c53b28ed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
