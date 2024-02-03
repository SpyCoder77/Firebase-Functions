// This is for the extension "Trigger email with firestore". https://extensions.dev/extensions/firebase/firestore-send-email
// Make sure to install it and configure it with the mailing collection being "mail"
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, doc, onSnapshot, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: YOUR_API_KEY,
  authDomain: YOUR_AUTH_DOMAIN,
  projectId: YOUR_PROJECT_ID,
  storageBucket: YOUR_STORAGE_BUCKET,
  messagingSenderId: YOUR_MESSAGING_SENDER_ID,
  appId: YOUR_APP_ID,
};

//Initialize app (Required)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function sendEmail(recipients, subject, message, html) {
    let docData = await addDoc(collection(db, "mail", docId), {
        to: recipients,
        message: {
            subject: subject,
            text: message,
            html: html
        },
    });
    const unsub = onSnapshot(doc(db, "mail", docData.id), (doc) => {
        if (doc.data().delivery.info.state == "SUCCESS") {
            console.log("Email Successfully sent!");
        }
    });
}
