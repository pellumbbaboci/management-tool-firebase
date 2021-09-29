import * as functions from "firebase-functions";
import admin from 'firebase-admin'

// this means that now we will be able to use admin sdk in order to interact with different serveces
admin.initializeApp(functions.config().firebase)

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

type NotificationType = {
    content:string,
    user:string,
    time:FirebaseFirestore.FieldValue
}

const createNotification = async (notification:NotificationType) => {
    
    try {
       const docRef = await admin.firestore().collection('notifications').add(notification)
       console.log('Document Created ',docRef)
    } catch (error) {
        console.log(error)
    }
}

export const projectCreated = functions.firestore
.document('projects/{projectId}')
.onCreate(doc => {
    const project = doc.data()
    const notification = {
        content: 'Added a new Project',
        user: `${project.authorFirstName} ${project.authorLastName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification)
})
