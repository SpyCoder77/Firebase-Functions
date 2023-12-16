import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
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