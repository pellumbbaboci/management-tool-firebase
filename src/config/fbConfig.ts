import firebase from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import 'firebase/auth';

import dotenv from 'dotenv'

dotenv.config()     

const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};

const firebaseApp = firebase.initializeApp(config);

const db = getFirestore(firebaseApp);

export default db 

