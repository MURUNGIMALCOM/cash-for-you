import { initializeApp } from "firebase/app"

import {
  getAuth
} from "firebase/auth"

import {
  getFirestore
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDLl40I0w6niv_Zlyi45psdbtUTRI5fDLY",
  authDomain: "cash-for-you-fde9b.firebaseapp.com",
  projectId: "cash-for-you-fde9b",
  storageBucket: "cash-for-you-fde9b.firebasestorage.app",
  messagingSenderId: "1001476070608",
  appId: "1:1001476070608:web:deb18035b35f96549212d5"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const db = getFirestore(app)