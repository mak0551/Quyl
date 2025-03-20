import { useContext, createContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";

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
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getuser = JSON.parse(localStorage.getItem("user"));
    setUser(getuser);
  }, []);

  // function for signup
  const signUpUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  // function for signin
  const signinUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  // function for sign in with google
  const signinwithgoogle = async (onSuccess) => {
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      const user = result.user;
      localStorage.setItem("user", JSON.stringify(user));
      if (onSuccess) {
        // this represents the callback whatever we are sending to signinwithgoogle from createuser function in signup/signin page
        onSuccess();
      }
    } catch (error) {
      console.error("Google Sign-In error:", error);
    }
  };

  //create student
  const addStudent = async (studentData) => {
    try {
      const docRef = await addDoc(
        collection(firestore, "students"),
        studentData
      );
      return docRef;
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // function for put data
  const putdata = (key, data) => set(ref(firebaseDatabase, key), data);
  // <button
  //   onClick={() => putdata("user/" + "mak", { email, password })}
  // >
  //   add user data
  // </button>;

  // function for creating collection
  const writeData = async (userId, email, name) => {
    try {
      // Store user data in Firestore under "users" collection
      await setDoc(doc(firestore, "users", userId), {
        email: email,
        name: name, // Replace with actual user input
        createdAt: new Date(),
      });

      console.log("User data stored successfully!");
    } catch (error) {
      console.error("Error writing user data:", error.message);
    }

    // const result = addDoc(collection(firestore, "cities"), {
    //   // here addDOc is a keyword to add document and collection is used to give reference of the colllection
    //   name: "hyderabad bolte",
    //   pincode: 500008,
    //   lat: 123,
    //   long: 1234,
    // })
    //   .then((e) => console.log(e, "response"))
    //   .catch((err) => console.log(err, "error")); // creating document using addDoc method in 1st argument giving the collection name and in second argument giving the actual data and it returns promise so make sure to use .then and .catch , this collection structure goes like collection > document > fields
    // console.log("result", result);
  };

  // function for creating sub collection
  const writeSubData = () => {
    const result = addDoc(
      collection(firestore, "cities/0maoowA7msajdH1z9G04/places"),
      {
        name: "charminar",
        desc: "awesome description",
      }
    )
      .then((e) => console.log(e, "response"))
      .catch((err) => console.log(err, "error"));
    console.log("result", result);
  };

  // function to read doc
  const readDoc = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "students"));
      const students = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return students;
      // this is for fetching single document
      // const ref = doc(firestore, "students", "4jFbXIoUQzr49yyUXpxs");
      // const docSnap = await getDoc(ref);
      // if (docSnap.exists()) {
      //   console.log(docSnap.data(), "this is doc");
      // } else {
      //   console.log("No such document!");
      // }
    } catch (err) {
      console.error("Error reading document:", err);
    }
  };

  // query
  const readDocWithQuery = async () => {
    // here in this first we have to define the refernce means the collection name then a query for that collection then call the document, the result of the document could be more than one so we are doing forEach here
    const ref = collection(firestore, "users");
    const q = query(ref, where("male", "==", true));
    await getDocs(q)
      .then((e) => {
        e.forEach((doc) => {
          console.log(doc.data(), "fetched");
        });
      })
      .catch((err) => console.log(err));
  };

  // update
  const update = async () => {
    // here we are first creating reference then by using that reference updating the doc
    const docRef = doc(firestore, "cities", "RcAhCi3BNrwQ2OkquRyp");
    await updateDoc(docRef, { name: "delhi" });
  };

  // delete
  const deleteit = async () => {
    const docRef = doc(firestore, "cities", "RcAhCi3BNrwQ2OkquRyp");
    await deleteDoc(docRef);
  };

  return (
    <FirebaseContext.Provider
      value={{
        signUpUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signinwithgoogle,
        putdata,
        writeData,
        writeSubData,
        readDoc,
        readDocWithQuery,
        update,
        deleteit,
        user,
        addStudent,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
