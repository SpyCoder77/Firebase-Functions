// This is for the extension "Translate with Firestore"  https://extensions.dev/extensions/firebase/firestore-translate-text
// Make sure to install it and configure it with the collection path being "translations", the input field being "input", the output field being "translated" and the languages field being whatever languages you want to have supported.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, doc, onSnapshot, setDoc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

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

async function translate(text, targetLanguage) {
  let docData = await addDoc(collection(db, "translations"), {
    input: text 
  });
  const unsub = onSnapshot(doc(db, "translations", docData.id), (doc) => {
    if (doc.data().translated) {
      let translated = doc.data().translated[targetLanguage];
      console.log(translated);
      return translated;
    }
  });
}
