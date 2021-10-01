import React, { useEffect } from 'react'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { Link } from 'react-router-dom'
import { auth } from '../../config/fbConfig'
import { useCurrentUserStore } from '../../store'

function Navbar() {
  const setCurrentUser = useCurrentUserStore((state) => state.setCurrentUser)
  const currentUser = useCurrentUserStore((state) => state.currentUser)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser('login')
      } else {
        setCurrentUser('logout')
      }
    })
  })

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
        {currentUser === 'login' ? (
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
