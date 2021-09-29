import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { auth, logout } from '../../config/fbConfig';

function SignedInLinks() {
  const currUser = auth.currentUser;
  console.log(currUser?.displayName);

  const history = useHistory();

  const handleSignOut = () => {
    logout();
  };

  useEffect(() => {
    history.replace('/');
  }, [currUser, history]);
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
        {`${currUser?.displayName
          ?.split(' ')[0]
          .slice(0, 1)}${currUser?.displayName?.split(' ')[1].slice(0, 1)}`}
      </NavLink>
    </div>
  );
}

export default SignedInLinks;
