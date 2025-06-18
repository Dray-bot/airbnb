// lib/firebase.js
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBN9xFgUd2eOzZlVQdGMcEpVTYNCju0eYA',
  authDomain: 'airbnb-clone-762a9.firebaseapp.com',
  projectId: 'airbnb-clone-762a9',
  storageBucket: 'airbnb-clone-762a9.appspot.com', // ✅ FIXED HERE
  messagingSenderId: '684613726594',
  appId: '1:684613726594:web:ab9ca50b716ad231ab1f9b',
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)

const db = getFirestore(app)
const storage = getStorage(app)

export { app, db, storage }
