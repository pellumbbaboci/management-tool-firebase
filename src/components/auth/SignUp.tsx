import React, { useEffect, useState } from 'react'

import { Link, useHistory } from 'react-router-dom'
import { register, auth } from '../../config/fbConfig'

function SignUp() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const history = useHistory()

  const currentUser = auth.currentUser

  const handleCreate = () => {
    register(firstName, lastName, email, password)
  }

  useEffect(() => {
    if (currentUser !== null) {
      history.replace('/')
    }
  }, [currentUser, history])

  return (
    <div className='bg-gray-400 min-h-screen flex flex-col'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Sign up</h1>
          <input
            type='text'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='firstname'
            placeholder='First Name'
            onChange={(e) => {
              setFirstName(e.target.value)
            }}
          />
          <input
            type='text'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='lastname'
            placeholder='Last Name'
            onChange={(e) => {
              setLastName(e.target.value)
            }}
          />

          <input
            type='text'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='email'
            placeholder='Email'
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />

          <input
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='password'
            placeholder='Password'
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />

          <button
            type='submit'
            className='w-full text-center py-3 rounded bg-green-500 hover:bg-green-700 text-white hover:bg-green-dark focus:outline-none my-1'
            onClick={handleCreate}
          >
            Create Account
          </button>
        </div>

        <div className='text-grey-dark mt-6'>
          Already have an account?
          <Link
            className='no-underline border-b border-blue text-blue-200 font-semibold ml-3 text-lg'
            to='/login'
          >
            Log in
          </Link>
          .
        </div>
      </div>
    </div>
  )
}

export default SignUp
