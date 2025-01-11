import { useContext, createContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "quyl-b0a8a.firebaseapp.com",
  projectId: "quyl-b0a8a",
  storageBucket: "quyl-b0a8a.firebasestorage.app",
  messagingSenderId: "163140440999",
  appId: "1:163140440999:web:432269d258b52a3087dc82",
  databaseURL: "https://quyl-b0a8a-default-rtdb.firebaseio.com/", // you can get this url from your firebase project/app you created in the realtime database tab
};

const FirebaseContext = createContext(null);

const firebaseApp = initializeApp(firebaseConfig); // creating firebase instance
export const firebaseAuth = getAuth(firebaseApp); // creating firebase auth instance
const firebaseDatabase = getDatabase(firebaseApp); // creating firebase database instance
const googleProvider = new GoogleAuthProvider(); // creating firebase googleAuth instance
const firestore = getFirestore(firebaseApp); // creating firestore instance

// creating custom hook
export const firebaseHook = () => useContext(FirebaseContext);

// firebase provider function to wrap App.jsx in this
export const FirebaseProvider = (props) => {
  // function for signup
  const signUpUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  // function for signin
  const signinUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  // function for sign in with google
  const signinwithgoogle = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      const user = result.user;
      console.log("Google Sign-In successful:", user);
    } catch (error) {
      console.error("Google Sign-In error:", error);
    }
  };

  // function for put data
  const putdata = (key, data) => set(ref(firebaseDatabase, key), data);

  // function for creating collection
  const writeData = async () => {
    const result = addDoc(collection(firestore, "cities"), {
      name: "hyderabad",
      pincode: 500008,
      lat: 123,
      long: 1234,
    })
      .then((e) => console.log(e, "response"))
      .catch((err) => console.log(err, "error")); // creating document using addDoc method in 1st argument giving the collection name and in second argument giving the actual data and it returns promise so make sure to use .then and .catch , this collection structure goes like collection > document > fields
    console.log("result", result);
  };

  return (
    <FirebaseContext.Provider
      value={{
        signUpUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signinwithgoogle,
        putdata,
        writeData,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
