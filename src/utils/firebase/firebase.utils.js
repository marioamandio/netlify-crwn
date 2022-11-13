import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkx78Cpvhy9a2QuMANTQ8UNCfqZkrQ-c4",
  authDomain: "crwn-clothing-db-ed8a0.firebaseapp.com",
  projectId: "crwn-clothing-db-ed8a0",
  storageBucket: "crwn-clothing-db-ed8a0.appspot.com",
  messagingSenderId: "59045825470",
  appId: "1:59045825470:web:392d40fce43c11dfc6c7ef",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  console.log(userSnapshot);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (err) {
      console.log(err);
    }
  }

  return userDocRef()

  // if user data exists
  // return user Doc

  // if not user
};
