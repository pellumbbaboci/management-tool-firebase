import React from 'react';
import { NavLink } from 'react-router-dom';

function SignedInLinks() {
  return (
    <div className='md:ml-auto'>
      <NavLink to='/' className='text-white hover:bg-gray-500 p-3 rounded-md'>
        New Project
      </NavLink>
      <NavLink to='/' className='text-white hover:bg-gray-500 p-3 rounded-md'>
        Log Out
      </NavLink>
      <NavLink
        to='/'
        className='rounded-full h-8 w-8 items-center justify-center bg-gray-400 ml-4 p-2'
      >
        PB
      </NavLink>
    </div>
  );
}

export default SignedInLinks;
