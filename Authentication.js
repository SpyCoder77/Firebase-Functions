//Google Auth
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

//Functions 
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  let googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      if (user.email) {
        const userInfo = {
            uid: user.uid,
            email: user.email,
            photo: user.photoURL,
            display: user.displayName
          };
        setCookie("user", JSON.stringify(userInfo), 7)
      } else {
        console.error("User email is undefined");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData?.email;
      console.error(email);
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  }