import React from 'react';

function SignIn() {
  return (
    <div className='bg-gray-400 min-h-screen flex flex-col'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <div className='mb-4'>
            <label className='block text-grey-darker text-sm font-bold mb-2'>
              Username
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
              id='username'
              type='text'
              placeholder='Username'
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
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-auto'
              type='button'
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
