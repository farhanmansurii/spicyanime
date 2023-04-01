import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import firebaseConfig from './firebaseConfig'
const firebase = initializeApp(firebaseConfig)
const db = getFirestore(firebase)
export { db }
