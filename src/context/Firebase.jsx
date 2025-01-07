import { useContext, createContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "quyl-b0a8a.firebaseapp.com",
  projectId: "quyl-b0a8a",
  storageBucket: "quyl-b0a8a.firebasestorage.app",
  messagingSenderId: "163140440999",
  appId: "1:163140440999:web:432269d258b52a3087dc82",
  databaseURL: "https://quyl-b0a8a-default-rtdb.firebaseio.com/", // you can get this url from your firebase project/app you created in the realtime database tab
};
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDatabase = getDatabase(firebaseApp);

const FirebaseContext = createContext(null);

// creating custom hook
export const firebaseHook = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const signUpUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signinUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseApp, email, password);
  };

  const putdata = (key, data) => set(ref(firebaseDatabase, key), data);

  return (
    <FirebaseContext.Provider
      value={{
        signUpUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        putdata,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
