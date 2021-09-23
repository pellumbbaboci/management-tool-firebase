import React from 'react';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className='bg-gray-800 md:sticky top-0 z-10'>
      <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
        <Link
          to='/'
          className='ml-3 text-xl font-mono title-font font-medium text-white mb-4 md:mb-0'
        >
          Management Tool{' '}
        </Link>
        <SignedInLinks />
        <SignedOutLinks />
      </div>
    </header>
  );
}

export default Navbar;
