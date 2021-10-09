import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/functions'

import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
}

const firebaseApp = firebase.initializeApp(config)
const db = firebase.firestore(firebaseApp)
const auth = firebase.auth(firebaseApp)

// auth.onAuthStateChanged(user => {
//   console.log(user, 'auth')
// })

const register = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string
) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password)
    const userId = res.user?.uid
    console.log('auth user created', userId)

    if (res.user) {
      return await firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .set({
          firstName: firstname,
          lastName: lastname,
          initials: firstname[0] + lastname[0],
          email: email,
          projectsLiked: [],
        })

      // const docRef = await db.collection('users').doc(res.user.uid).set({
      //     email:res.user.email,
      //     firstname:firstname,
      //     lastname:lastname
      // })

      // console.log("Document user written with ", docRef);
    }
  } catch (error) {
    let errorMessage = 'Failed to do something exceptional'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    console.log(errorMessage)
  }
}

const signIn = async (email: string, password: string) => {
  try {
    const res = await auth.signInWithEmailAndPassword(email, password)
    console.log(res)
  } catch (error) {
    let errorMessage = 'Failed to do something exceptional'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    console.log(errorMessage)
  }
}

const logout = async () => {
  try {
    await auth.signOut()
  } catch (error) {
    let errorMessage = 'Failed to do something exceptional'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    console.log(errorMessage)
  }
}

export { firebase, db, auth, register, signIn, logout }
