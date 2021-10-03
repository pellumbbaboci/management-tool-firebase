import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SignedOutLinks() {
  return (
    <div className='md:ml-auto'>
      <NavLink to='/signin' className='text-white hover:bg-gray-500 p-3'>
        Log In
      </NavLink>
      <NavLink to='/signup' className='text-white ml-4 hover:bg-gray-500 p-3'>
        Sign up
      </NavLink>
    </div>
  )
}
