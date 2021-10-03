import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../config/fbConfig'

type projectType = {
  id: string
  title: string
  body: string
  authorFirstName: string
  authorLastName: string
}[]

function ProjectList() {
  const [data, setData] = useState<projectType>([])

  const readData = async () => {
    const res = db.collection('projects')

    res.onSnapshot((querySnapshot) => {
      const saveProject: projectType = []
      querySnapshot.forEach((proj) => {
        saveProject.push({
          id: proj.id,
          title: proj.data().title,
          body: proj.data().body,
          authorFirstName: proj.data().authorFirstName,
          authorLastName: proj.data().authorLastName,
        })
      })

      setData(saveProject)
    })
    console.log(data)
  }

  useEffect(() => {
    readData()
    return () => {
      setData([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Link to='/project/'>
      {data?.map((doc) => (
        <ProjectCard
          key={doc.id}
          author={`${doc.authorFirstName} ${doc.authorLastName}`}
          title={doc.title}
          createdAt='september 12'
        />
      ))}
    </Link>
  )
}

type ProjectCardType = {
  title: string
  author: string
  createdAt: string
}

const ProjectCard = ({ title, author, createdAt }: ProjectCardType) => {
  return (
    <div className='relative p-4 rounded-md shadow-lg  z-1 mx-4 hover:shadow-2xl bg-white mb-5'>
      {/* <h1 className='absolute -top-10 md:-left-10 md:-top-10 text-4xl text-white font-bold dark:text-gray-800'>
        {yearStart} - {yearEnd}
      </h1> */}
      <h1 className='font-serif text-black text-3xl mb-5'>{title}</h1>

      <p className='text-gray-600 my-2'>{`Posted by ${author}`}</p>

      <p className='text-gray-600 my-2 '>{`Created at ${createdAt}`}</p>
    </div>
  )
}

export default ProjectList
