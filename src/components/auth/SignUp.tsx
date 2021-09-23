import React from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
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
          />
          <input
            type='text'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='lastname'
            placeholder='Last Name'
          />

          <input
            type='text'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='email'
            placeholder='Email'
          />

          <input
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='password'
            placeholder='Password'
          />

          <button
            type='submit'
            className='w-full text-center py-3 rounded bg-green-500 hover:bg-green-700 text-white hover:bg-green-dark focus:outline-none my-1'
          >
            Create Account
          </button>
        </div>

        <div className='text-grey-dark mt-6'>
          Already have an account?
          <Link
            className='no-underline border-b border-blue text-blue-500 ml-3 text-lg'
            to='/login'
          >
            Log in
          </Link>
          .
        </div>
      </div>
    </div>
  );
}

export default SignUp;
