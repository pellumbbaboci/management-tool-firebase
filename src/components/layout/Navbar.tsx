import React, { useEffect } from 'react'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { Link } from 'react-router-dom'
import { auth, firebase } from '../../config/fbConfig'
import { useCurrentUserStore, useCurrentUserProfileStore } from '../../store'

function Navbar() {
  const setCurrentUser = useCurrentUserStore((state) => state.setCurrentUser)
  const currentUser = useCurrentUserStore((state) => state.currentUser)

  const setCurrentUserProfile = useCurrentUserProfileStore(
    (state) => state.setCurrentUserProfile
  )
  const currentUserProfile = useCurrentUserProfileStore(
    (state) => state.currentUserProfile
  )
  console.log(currentUserProfile)

  const setUserProfile = async (id: string) => {
    try {
      console.log(currentUser, 'curruser')
      const res = await firebase.firestore().collection('users').doc(id).get()

      if (res.exists) {
        res.data()
        console.log(res.data())
        setCurrentUserProfile({
          firstName: res.data()?.firstName,
          lastName: res.data()?.lastName,
          initials: res.data()?.initials,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser('login')
        setUserProfile(user.uid)
      } else {
        setCurrentUser('logout')
      }
    })
  }, [])

  console.log(currentUser, 'sdfsd')
  return (
    <header className='bg-gray-800 md:sticky top-0 z-10'>
      <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
        <Link
          to='/'
          className='ml-3 text-xl font-mono title-font font-medium text-white mb-4 md:mb-0'
        >
          Management Tool{' '}
        </Link>
        {currentUser === 'login' && currentUserProfile.initials !== '' ? (
          <SignedInLinks />
        ) : currentUser === 'logout' ? (
          <SignedOutLinks />
        ) : (
          <div></div>
        )}
      </div>
    </header>
  )
}

export default Navbar
