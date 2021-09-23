import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignIn() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignin = () => {
    console.log(password, email);
  };
  return (
    <div className='bg-gray-400 min-h-screen flex flex-col'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <div className='mb-4'>
            <label className='block text-grey-darker text-sm font-bold mb-2'>
              Email
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
              id='email'
              type='text'
              placeholder='Email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className='mb-6'>
            <label className='block text-grey-darker text-sm font-bold mb-2'>
              Password
            </label>
            <input
              className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3'
              id='password'
              type='password'
              placeholder='******************'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full'
              type='button'
              onClick={handleSignin}
            >
              Sign In
            </button>
          </div>
        </div>
        <div className='text-grey-dark mt-6'>
          Don't have an account?
          <Link
            className='no-underline border-b border-blue text-blue-200 font-semibold ml-3 text-lg'
            to='/login'
          >
            Sign up
          </Link>
          .
        </div>
      </div>
    </div>
  );
}

export default SignIn;
