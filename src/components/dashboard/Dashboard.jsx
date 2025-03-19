import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../context/Firebase";
import Header from "./components/Header";
import Filters from "./components/Filters";
import StudentTable from "./components/StudentTable";
import Sidebar from "./components/Sidebar";

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        console.log(user, "user signed in");
        setUser(user);
      } else {
        navigate("/signin");
        setUser(null);
      }
    });
  }, []);
  const students = [
    {
      name: "Anshuman Kashyap",
      cohort: "AY 2024-25",
      courses: ["CBSE 9 Science", "CBSE 9 Math"],
      dateJoined: "17. Nov. 2024",
      lastLogin: "17. Nov. 2024 4:16 PM",
      status: "active",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <Filters />
        <StudentTable students={students} />
      </div>
    </div>
  );
};

export default StudentDashboard;
