import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db, firebase } from '../../config/fbConfig'

type projectType = {
  id: string
  title: string
  body: string
  authorFirstName: string
  authorLastName: string
  likesCount: number
}[]

function ProjectList() {
  const [data, setData] = useState<projectType>([])
  const [errorLike, setErrorLike] = useState('')
  console.log(errorLike)

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
          likesCount: proj.data().likesCount,
        })
      })

      setData(saveProject)
    })
    console.log(data)
  }

  const handleLike = async (id: string) => {
    const likeProject = firebase.functions().httpsCallable('likeProject')
    try {
      await likeProject({
        id: id,
        // likesCount: firebase.firestore.FieldValue.increment(1),
      })
      setErrorLike('')
    } catch (err) {
      let errorMessage = 'Failed to do something exceptional'
      if (err instanceof Error) {
        errorMessage = err.message
        setErrorLike(errorMessage)
      }
    }
    console.log(id)
  }

  useEffect(() => {
    readData()
    return () => {
      setData([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {data?.map((doc) => (
        <ProjectCard
          id={doc.id}
          key={doc.id}
          author={`${doc.authorFirstName} ${doc.authorLastName}`}
          title={doc.title}
          createdAt='september 12'
          handleLike={handleLike}
          likeCount={doc.likesCount}
        />
      ))}
    </div>
  )
}

type ProjectCardType = {
  id: string
  title: string
  author: string
  createdAt: string
  handleLike: (id: string) => void
  likeCount: number
}

const ProjectCard = ({
  id,
  title,
  author,
  createdAt,
  handleLike,
  likeCount,
}: ProjectCardType) => {
  return (
    <div className='relative p-4 rounded-md shadow-lg  z-1 mx-4 hover:shadow-2xl bg-white mb-5'>
      {/* <h1 className='absolute -top-10 md:-left-10 md:-top-10 text-4xl text-white font-bold dark:text-gray-800'>
        {yearStart} - {yearEnd}
      </h1> */}
      <Link to='/project/'>
        <h1 className='font-serif text-black text-3xl mb-5'>{title}</h1>

        <p className='text-gray-600 my-2'>{`Posted by ${author}`}</p>

        <p className='text-gray-600 my-2 '>{`Created at ${createdAt}`}</p>
      </Link>
      <button
        className=' absolute right-5 bottom-5 text-2xl bg-gray-400 rounded-md p-4'
        onClick={() => handleLike(id)}
      >
        <p className='inline-block mr-2'>{likeCount}</p>

        <svg
          className='w-6 h-6 inline-block'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5'
          ></path>
        </svg>
      </button>
    </div>
  )
}

export default ProjectList
