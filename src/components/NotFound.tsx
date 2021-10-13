import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className='shadow-xl rounded-xl px-3 py-3 m-5 mx-auto '>
      <h1 className='text-center font-semibold'>Sorry</h1>
      <p className='text-center mt-3'>That page can not be found</p>
      <Link to='/'>
        <button className='mt-5 m-auto w-full bg-red-700 text-white p-2 rounded-md hover:bg-red-500'>
          Go Home
        </button>
      </Link>
    </div>
  )
}
