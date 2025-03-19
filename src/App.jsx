import React, { useEffect, useState } from "react";
import StudentDashboard from "./components/dashboard/Dashboard.jsx";
import Signup from "./pages/Signup.jsx";
import { Signin } from "./pages/Signin.jsx";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "./context/Firebase.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const signout = () => {
    localStorage.removeItem("user");
    signOut(firebaseAuth);
  };

  return (
    <div className="flex justify-center items-center flex-col gap-8">
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<StudentDashboard />} />
        </Routes>
      </Router>

      {/* <button onClick={signout}>logout</button>  */}
    </div>
  );
}

export default App;
