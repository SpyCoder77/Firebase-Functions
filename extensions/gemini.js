// This is for the extension "Chatbot with Gemini". https://extensions.dev/extensions/firebase/firestore-send-email
// Make sure to install it and configure it with the collection being "gemini", prompt field being "prompt", and response field being "response"
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

async function askGemini(prompt) {
  let docData = await addDoc(collection(db, "gemini"), {
    prompt: prompt,
  });
  const unsub = onSnapshot(doc(db, "gemini", docData.id), (doc) => {
    if (doc.data().response) {
      return doc.data().response;
    }
  });
}
