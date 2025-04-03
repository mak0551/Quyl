import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { firebaseHook } from "../../../context/Firebase";
import { toast } from "react-toastify";

const AddStudentForm = ({ set }) => {
  const firebase = firebaseHook();
  const [studentData, setStudentData] = useState({
    name: "",
    courses: [],
    dateJoined: "",
    status: "active",
    cohort: "",
  });
  const [courseInput, setCourseInput] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCourseAdd = (e) => {
    e.preventDefault();
    if (courseInput.trim()) {
      setStudentData((prev) => ({
        ...prev,
        courses: [...prev.courses, courseInput.trim()],
      }));
      setCourseInput("");
    }
  };

  const removeCourse = (index) => {
    setStudentData((prev) => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.addStudent(studentData);
      setStudentData({
        name: "",
        courses: [],
        dateJoined: "",
        status: "active",
        cohort: "",
      });
      set(false);
      toast.success("student added successfully");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-2xl mt-6 sm:mt-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 text-center sm:text-left">
        Add New Student
      </h2>
      <RxCross2
        className="absolute right-3 top-3 sm:right-5 sm:top-5 text-lg sm:text-xl cursor-pointer"
        onClick={set}
      />

      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div className="flex flex-col sm:flex-row sm:items-center px-2 gap-2 sm:gap-0">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 sm:w-1/4 text-left"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={studentData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            required
            className="mt-1 block w-full sm:w-[67%] rounded-md border border-black shadow-sm p-1 "
          />
        </div>

        <div className="flex flex-col px-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
            <label className="block text-sm font-medium text-gray-700 sm:w-1/4 text-left">
              Courses
            </label>
            <div className="mt-1 flex flex-col sm:flex-row gap-2 w-full sm:w-[67%]">
              <input
                type="text"
                value={courseInput}
                onChange={(e) => setCourseInput(e.target.value)}
                className="flex-1 rounded-md border border-black shadow-sm p-1 "
                placeholder="course name"
              />
              <button
                type="button"
                onClick={handleCourseAdd}
                className="px-3 py-1 sm:px-4 sm:py-1 bg-sky-600 text-white rounded-md hover:bg-sky-700 whitespace-nowrap"
              >
                Add
              </button>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 justify-start sm:justify-end">
            {studentData.courses.map((course, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs sm:text-sm bg-white text-black border border-black"
              >
                {course}
                <button
                  type="button"
                  onClick={() => removeCourse(index)}
                  className="ml-1 sm:ml-2 pt-[1px] sm:pt-[2px] text-sm sm:text-base"
                >
                  <RxCross2 />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center px-2 gap-2 sm:gap-0">
          <label
            htmlFor="dateJoined"
            className="block text-sm font-medium text-gray-700 sm:w-1/4 text-left"
          >
            Date Joined
          </label>
          <input
            type="date"
            id="dateJoined"
            name="dateJoined"
            value={studentData.dateJoined}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full sm:w-[67%] rounded-md border border-black shadow-sm p-1 "
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center px-2 gap-2 sm:gap-0">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 sm:w-1/4 text-left"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={studentData.status}
            onChange={handleInputChange}
            className="mt-1 block w-full sm:w-[67%] rounded-md border border-black shadow-sm p-1 "
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="graduated">Graduated</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center px-2 gap-2 sm:gap-0">
          <label
            htmlFor="cohort"
            className="block text-sm font-medium text-gray-700 sm:w-1/4 text-left"
          >
            Cohort
          </label>
          <input
            type="text"
            id="cohort"
            name="cohort"
            value={studentData.cohort}
            onChange={handleInputChange}
            placeholder="cohort"
            required
            className="mt-1 block w-full sm:w-[67%] rounded-md border border-black shadow-sm p-1 "
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-1 bg-sky-500 text-white rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Add Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudentForm;
