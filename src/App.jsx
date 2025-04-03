import React, { useEffect, useState } from "react";
import StudentDashboard from "./components/dashboard/Dashboard.jsx";
import Signup from "./pages/Signup.jsx";
import { Signin } from "./pages/Signin.jsx";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "./context/Firebase.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const signout = () => {
    localStorage.removeItem("user");
    signOut(firebaseAuth);
  };

  return (
    <div className="flex justify-start items-center flex-col min-h-screen">
      <Router basename="/">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<StudentDashboard />} />
        </Routes>
      </Router>
      <ToastContainer position="top-center" autoClose={1000} />
      {/* <button onClick={signout}>logout</button>  */}
    </div>
  );
}

export default App;
