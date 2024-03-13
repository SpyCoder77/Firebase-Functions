//Google Auth
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut, updateEmail, sendEmailVerification, sendPasswordResetEmail, updateProfile, deleteUser } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const user = auth.currentUser;

//Functions 
  

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
          display: user.displayName,
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log("User info", userInfo);
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

  //This function should be run whenever you use google sign in. It signs the user in if they are not already, and gets the user data if they are signed in.
  function getUser() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userInfo = {
          email: user.info,
          uid: user.uid,
          photo: user.photoURL,
          display: user.displayName
        };
      } else {
        googleSignIn();
      }
    });
  }

  //This function HAS to be run after getUser (Reccommended) OR googleSignIn. Otherwise, it will result in an error.
  function getUserData(value) {
    let obj = userInfo;
    if(obj.email) {
    if(value == "email") {
      return obj.email;
    } else if(value == "uid") {
      return obj.uid;
    } else if(value == "display") {
      return obj.display;
    } else if(value == "photo") {
      return obj.photo;
    } else {
      throw new Error('Invalid Request!');
    }
  } else {
    throw new Error('No user is signed in!');
  }
}

  function signOutUser() {
    signOut(auth).then(() => {
      console.log("Successfully signed out!");
    }).catch((error) => {
      throw new Error(`${error} occured!`);
    });
  }

  function changeEmail(email) {
    updateEmail(auth.currentUser, email).then(() => {
      console.log(`Email of ${getUserData("display")} has been changed to ${getUserData("email")}!`);
    }).catch((error) => {
      throw new Error(`${error} has occured when trying to change email!`);
    });
  }

  function changePassword(password) {
    updatePassword(user, password).then(() => {
      console.log(`Password of ${getUserData("email")} changed to ${password}!`);
    }).catch((error) => {
      throw new Error(error);
    });
  }

  function sendVerificationEmail() {
    sendEmailVerification(auth.currentUser)
    .then(() => {
      console.log(`Verification email sent to ${getUserData("email")}!`);
    });
  }

  function resetPassword() {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log(`Password reset email sent to ${getUserData("email")}!`);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw new Error(`${errorCode} - ${errorMessage}`);
    });
  }

  function setUserData(key, value) {
    if(key == "display") {
      updateProfile(auth.currentUser, {
        displayName: value, photoURL: getUserData("photo")
      }).then(() => {
        console.log(`Display name of ${getUserData("email")} changed to ${value}`);
      }).catch((error) => {
        throw new Error(error);
      });
    } else if(key == "photo") {
      updateProfile(auth.currentUser, {
        displayName: getUserData("display"), photoURL: value
      }).then(() => {
        console.log(`Profile picture of ${getUserData("email")} changed to ${value}`);
      }).catch((error) => {
        throw new Error(error);
      });
    }
  }

  function deleteCurrentUser() {
    deleteUser(user).then(() => {
      console.log(`Successfully deleted user`)
    })
  }
