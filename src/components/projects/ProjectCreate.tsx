import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ProjectCreate() {
  const [title, setTitle] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleCreate = () => {
    console.log(title, lastName, password, email);
  };
  return (
    <div className='container max-w-screen-md mx-auto flex-1 flex flex-col items-center justify-center px-2'>
      <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
        <h1 className='mb-8 text-3xl text-center'>Create New Project</h1>
        <input
          type='text'
          className='block border border-grey-light w-full p-3 rounded mb-4'
          name='title'
          placeholder='Title'
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          className='block border border-grey-light w-full p-3 rounded mb-4'
          name='lastname'
          placeholder='Enter Description'
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />

        <button
          type='submit'
          className='w-full text-center py-3 rounded bg-green-500 hover:bg-green-700 text-white hover:bg-green-dark focus:outline-none my-1'
          onClick={handleCreate}
        >
          Create Project
        </button>
      </div>
    </div>
  );
}

export default ProjectCreate;
