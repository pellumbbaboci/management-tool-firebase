import React, { useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { auth, logout } from '../../config/fbConfig'
import { useCurrentUserProfileStore } from '../../store'

function SignedInLinks() {
  const currentUserProfile = useCurrentUserProfileStore(
    (state) => state.currentUserProfile
  )
  const currUser = auth.currentUser
  console.log(currUser)
  console.log(currentUserProfile)

  // const readUserProfile = async () => {
  //   const res = await db.collection('projects').doc(currUser?.uid).get()

  //   if (res.exists) {
  //     res.data()
  //     console.log(res.data())
  //     setCurrentUserProfile({
  //       firstName: res.data()?.firstName,
  //       lastName: res.data()?.lastName,
  //       initials: res.data()?.initials,
  //     })
  //   }
  // }

  const history = useHistory()

  const handleSignOut = () => {
    logout()
    history.push('/')
  }

  useEffect(() => {
    history.replace('/')
  }, [currUser, history])
  return (
    <div className='md:ml-auto'>
      <NavLink
        to='/create'
        className='text-white hover:bg-gray-500 p-3 rounded-md'
      >
        New Project
      </NavLink>
      <button
        className='text-white hover:bg-gray-500 p-3 rounded-md'
        onClick={handleSignOut}
      >
        Log Out
      </button>

      <NavLink
        to='/'
        className='rounded-full h-8 w-8 items-center justify-center bg-gray-400 ml-4 p-2'
      >
        {/* {`${currUser?.displayName
          ?.split(' ')[0]
          .slice(0, 1)}${currUser?.displayName?.split(' ')[1].slice(0, 1)}`} */}
        {currentUserProfile.initials}
      </NavLink>
    </div>
  )
}

export default SignedInLinks
