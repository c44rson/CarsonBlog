import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAj4uj1HxuPL48YcJ8GxSv40cIdSsKyHpc',
  authDomain: 'barebonesblog-c44rson.firebaseapp.com',
  projectId: 'barebonesblog-c44rson',
  storageBucket: 'barebonesblog-c44rson.appspot.com',
  messagingSenderId: '591688687568',
  appId: '1:591688687568:web:0f2bd915128c960607a3d5'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
