import React from "react";
import StudentDashboard from "./components/Dashboard.jsx";
import Signup from "./pages/Signup.jsx";
import { Signin } from "./pages/Signin.jsx";

function App() {
  return (
    <div className="flex justify-center items-center flex-col gap-8">
      <StudentDashboard />
      <Signup />
      <Signin />
    </div>
  );
}

export default App;
