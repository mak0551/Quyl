import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth, firebaseHook } from "../../context/Firebase";
import Header from "./components/Header";
import Filters from "./components/Filters";
import StudentTable from "./components/StudentTable";
import Sidebar from "./components/Sidebar";

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const firebase = firebaseHook();
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

  useEffect(() => {
    const fetchData = async () => {
      const studentList = await firebase.readDoc();
      setStudents(studentList);
    };
    fetchData();
  }, []);

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
