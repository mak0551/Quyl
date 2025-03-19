import React, { useEffect, useState } from "react";
import StudentDashboard from "./components/dashboard/Dashboard.jsx";
import Signup from "./pages/Signup.jsx";
import { Signin } from "./pages/Signin.jsx";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from "./context/Firebase.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   onAuthStateChanged(firebaseAuth, (user) => {
  //     if (user) {
  //       console.log(user, "user signed in");
  //       setUser(user);
  //     } else {
  //       navigate("/signin");
  //       setUser(null);
  //     }
  //   });
  // }, []);

  const signout = () => {
    localStorage.removeItem("user");
    signOut(firebaseAuth);
  };

  // if (user === null) {
  //   return (
  //     <div className="flex justify-center items-center flex-col gap-8">
  //       <Signup />
  //       <Signin />
  //     </div>
  //   );
  // }

  return (
    <div className="flex justify-center items-center flex-col gap-8">
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<StudentDashboard />} />
        </Routes>
      </Router>
      {/* <StudentDashboard /> */}
      {/* <h1>hello user.email</h1>
      <button onClick={signout}>logout</button> */}
    </div>
  );
}

export default App;
