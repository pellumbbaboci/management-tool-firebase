import React from 'react';
import { Link } from 'react-router-dom';

function ProjectList() {
  return (
    <div className=''>
      <Link to='/project/'>
        <ProjectCard
          author='Pellumb'
          title='Bla bla'
          createdAt='september 12'
        />
      </Link>
    </div>
  );
}

type ProjectCardType = {
  title: string;
  author: string;
  createdAt: string;
};

const ProjectCard = ({ title, author, createdAt }: ProjectCardType) => {
  return (
    <div className='relative p-4 rounded-md shadow-lg  z-1 mx-4 hover:shadow-2xl'>
      {/* <h1 className='absolute -top-10 md:-left-10 md:-top-10 text-4xl text-white font-bold dark:text-gray-800'>
        {yearStart} - {yearEnd}
      </h1> */}
      <h1 className='font-serif text-black text-3xl mb-5'>{title}</h1>

      <p className='text-gray-600 my-2'>{`Posted by ${author}`}</p>

      <p className='text-gray-600 my-2 '>{`Created at ${createdAt}`}</p>
    </div>
  );
};

export default ProjectList;
