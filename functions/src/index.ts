import * as functions from 'firebase-functions'
import admin from 'firebase-admin'

// this means that now we will be able to use admin sdk in order to interact with different serveces
admin.initializeApp(functions.config().firebase)

type NotificationType = {
  content: string
  user: string
  time: FirebaseFirestore.FieldValue
}

const createNotification = async (notification: NotificationType) => {
  try {
    const docRef = await admin
      .firestore()
      .collection('notifications')
      .add(notification)
    console.log('Notification Created ', docRef)
  } catch (error) {
    console.log(error)
  }
}

export const projectCreated = functions.firestore
  .document('projects/{projectId}')
  .onCreate((doc) => {
    const project = doc.data()
    const notification = {
      content: 'Added a new Project',
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp(),
    }

    return createNotification(notification)
  })

const deleteUser = async (uId: string) => {
  try {
    await admin.firestore().collection('users').doc(uId).delete()
    console.log('User successfully deleted from users collection', uId)
  } catch (error) {
    console.log(error)
  }
}

export const userDeleted = functions.auth.user().onDelete((user) => {
  console.log('deleting user ...')
  return deleteUser(user.uid)
})

export const newUserSignUpCreateNotification = functions.auth
  .user()
  .onCreate((user) => {
    admin.firestore().collection('users').doc(user.uid).set({
      email: user.email,
      projectsLiked: [],
    })

    // const userId = user.uid
    const notification = {
      content: 'New User just sign up',
      user: `${user.email}`,
      time: admin.firestore.FieldValue.serverTimestamp(),
    }

    return createNotification(notification)
  })

const createUser = async (userId: string, userEmail: string) => {
  try {
    const docRef = await admin.firestore().collection('users').doc(userId).set({
      email: userEmail,
      projectsLiked: [],
    })
    console.log('Notification Created ', docRef)
  } catch (error) {
    console.log(error)
  }
}

export const newUserSignUpCreateUserCollection = functions.auth
  .user()
  .onCreate((user) => {
    return createUser(user.uid, user.email!)
  })

export const addProject = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'You are not Authorized to do this operation'
    )
  }

  if (data.title.length > 30) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'You must enter no more then 30 character for the title!'
    )
  }

  admin.firestore().collection('projects').add({
    title: data.title,
    body: data.body,
    authorFirstName: data.authorFirstName,
    authorLastName: data.authorLastName,
    likesCount: data.likesCount,
  })
  console.log('Project added Successfully')
})

export const likeProject = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'You are not Authorized to do this operation'
    )
  }

  const userDoc = admin.firestore().collection('users').doc(context.auth.uid)
  const projectDoc = admin.firestore().collection('projects').doc(data.id)

  try {
    const doc = await userDoc.get()
    if (
      doc.data()?.projectsLiked &&
      doc.data()?.projectsLiked.includes(data.id)
    ) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'You already liked this'
      )
    }

    await userDoc.update({
      projectsLiked: [...doc.data()?.projectsLiked, data.id],
    })

    projectDoc.update({
      likesCount: admin.firestore.FieldValue.increment(1),
    })
  } catch (error) {
    console.log(error)
  }
})
