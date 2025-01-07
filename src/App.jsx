import React from "react";
import StudentDashboard from "./components/Dashboard.jsx";
import Signup from "./pages/Signup.jsx";

// import { app } from "../firebase.js"; // importing the app from firebase.js
// import { getDatabase, ref, set } from "firebase/database"; // to setdata into the database
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // for auth
// import { Signin } from "./pages/Signin.jsx";

// const db = getDatabase(app); // creating database instance
// const auth = getAuth(app); // creating auth instance

function App() {
  // const putData = ()=>{  // function for setdata into the database
  //   set(ref(db, "user/afroz"),{
  //     id: 1,
  //     name: "afroz khan",
  //     age: 24,
  //   });
  // };

  // const signupUser = () => {
  //   // function to signup/ register user
  //   // this funciton will create a user with this email id and password, this function will return promise
  //   createUserWithEmailAndPassword(auth, "iamawesome0551@gmail.com", "123456")
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

  return (
    <div className="flex justify-center items-center flex-col gap-8">
      <StudentDashboard />
      {/* <button className="border border-red-500" onClick={putData}>dabaaao</button> */}
      {/* when you click the above button you can see user data is created in realtime database tab*/}

      {/* <button className="border border-red-500" onClick={signupUser}>
        create user
      </button> */}
      {/*when you click the above buttom in firebase authentication tab then in user tab you can see the user is created*/}

      <Signup />
      {/* <Signin/> */}
    </div>
  );
}

export default App;
