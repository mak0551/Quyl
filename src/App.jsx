import React, { useEffect, useState } from "react";
import StudentDashboard from "./components/Dashboard.jsx";
import Signup from "./pages/Signup.jsx";
import { Signin } from "./pages/Signin.jsx";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from "./context/Firebase.jsx";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        console.log(user, "user signed in");
        setUser(user);
      } else {
        console.log("not signed in");
        setUser(null);
      }
    });
  }, []);

  const signout = () => {
    return signOut(firebaseAuth);
  };

  if (user === null) {
    return (
      <div className="flex justify-center items-center flex-col gap-8">
        <Signup />
        <Signin />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-col gap-8">
      <StudentDashboard />
      <h1>hello {user.email}</h1>
      <button onClick={signout}>logout</button>
    </div>
  );
}

export default App;
