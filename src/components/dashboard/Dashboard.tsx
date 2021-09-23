import React from 'react';
import ProjectList from '../projects/ProjectList';
import Notifications from './Notifications';

function Dashboard() {
  return (
    <div className='mx-auto px-20'>
      <div className='grid grid-flow-col grid-cols-3 gap-4 mt-5'>
        <div className='col-span-2'>
          <ProjectList />
        </div>

        <div className='bg-gray-200 col-span-1'>
          <Notifications />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
