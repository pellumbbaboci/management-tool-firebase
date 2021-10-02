import React, { useState } from 'react'
import { auth } from '../../config/fbConfig'
import { firebase } from '../../config/fbConfig'
import { useHistory } from 'react-router-dom'

function ProjectCreate() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState('')
  const history = useHistory()
  const userFirstName = auth.currentUser?.displayName?.split(' ')[0]
  const userLastName = auth.currentUser?.displayName?.split(' ')[1]

  const handleCreate = async () => {
    const addingProject = firebase.functions().httpsCallable('addProject')
    try {
      await addingProject({
        title: title,
        body: body,
        authorFirstName: userFirstName!,
        authorLastName: userLastName!,
      })
      setError('')
      setBody('')
      setTitle('')
      history.replace('/')
    } catch (err) {
      let errorMessage = 'Failed to do something exceptional'
      if (err instanceof Error) {
        errorMessage = err.message
      }
      setError(errorMessage)
    }
  }

  return (
    <div className='bg-gray-400 min-h-screen flex flex-col'>
      <div className='container max-w-screen-md mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
          <h1 className='mb-8 text-3xl text-center'>Create New Project</h1>
          <input
            type='text'
            required
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='title'
            placeholder='Title'
            onChange={(e) => {
              setTitle(e.target.value)
            }}
          />
          {error && (
            <p className='bg-red-600 rounded-md text-white text-center mb-6'>
              Error : {error}
            </p>
          )}
          <textarea
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='lastname'
            required
            placeholder='Enter Description'
            onChange={(e) => {
              setBody(e.target.value)
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
    </div>
  )
}

export default ProjectCreate
