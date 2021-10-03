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
    const res = db.collection('notifications')

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
    <div className='bg-gray-700 p-3 rounded-lg'>
      {data?.map((notification) => (
        <div
          className='relative p-4 rounded-md shadow-lg  z-1 mx-4 hover:shadow-2xl bg-white mb-5'
          key={notification.id}
        >
          {/* <h1 className='absolute -top-10 md:-left-10 md:-top-10 text-4xl text-white font-bold dark:text-gray-800'>
      {yearStart} - {yearEnd}
    </h1> */}
          <h1 className='font-serif text-black text-3xl mb-5'>
            {notification.content}
          </h1>

          <p className='text-gray-600 my-2'>{`Posted by ${notification.user}`}</p>

          <p className='text-gray-600 my-2 '>{`Created on ${notification.time}`}</p>
        </div>
      ))}
    </div>
  )
}

export default Notifications
