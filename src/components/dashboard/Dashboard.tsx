import React from 'react'
import ProjectList from '../projects/ProjectList'
import Notifications from './Notifications'

function Dashboard() {
  return (
    <div className='mx-auto px-20 bg-gray-400 min-h-screen flex flex-col'>
      <div className='grid grid-flow-col grid-cols-3 gap-5 mt-5'>
        <div className='col-span-2'>
          <h2 className='text-4xl px-5 mt-5 font-extrabold mb-4'>Projects</h2>
          <ProjectList />
        </div>

        <div className='col-span-1'>
          <h2 className='text-4xl px-5 mt-5 font-extrabold mb-4'>
            Notifications
          </h2>
          <Notifications />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
