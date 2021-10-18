import React, { useEffect, useState } from 'react'
import { db } from '../../config/fbConfig'

type notificationType = {
  id: string
  content: string
  time: string
  user: string
}[]

function Notifications() {
  const [data, setData] = useState<notificationType>([])

  const readData = async () => {
    const res = db.collection('notifications').orderBy('time', 'desc')

    res.onSnapshot((querySnapshot) => {
      const saveNotification: notificationType = []
      querySnapshot.forEach((notification) => {
        saveNotification.push({
          id: notification.id,
          content: notification.data().content,
          time: notification.data().time.toDate().toString().split('GMT')[0],
          user: notification.data().user,
        })
      })

      setData(saveNotification)
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
    <div className='rounded-lg bg-gray-50 px-10'>
      {data?.map((notification) => (
        <div
          className='mx-auto  border-b-2 mb-2 hover:shadow-lg p-4'
          key={notification.id}
        >
          {/* <h1 className='absolute -top-10 md:-left-10 md:-top-10 text-4xl text-white font-bold dark:text-gray-800'>
      {yearStart} - {yearEnd}
    </h1> */}
          <h1 className='font-serif text-red-500 text-3xl mb-5'>
            {notification.content}
          </h1>

          <p className='text-gray-600 my-2'>{`Posted by ${notification.user}`}</p>

          <p className='text-gray-600 my-2'>{`Created on ${notification.time}`}</p>
        </div>
      ))}
    </div>
  )
}

export default Notifications
