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
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const firebase = firebaseHook();
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        // console.log(user, "user signed in");
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
  }, [students]);

  const searchInput = (e) => {
    setSearch(e);
  };

  // useEffect(() => {
  // console.log(search);
  // }, [search]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Header input={searchInput} />
        <Filters />
        <StudentTable students={students} search={search} />
      </div>
    </div>
  );
};

export default StudentDashboard;
