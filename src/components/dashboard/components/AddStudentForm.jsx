import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const AddStudentForm = ({ set }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Data:", studentData);
    // Here you would typically send the data to an API
    // Reset form after submission
    setStudentData({
      name: "",
      courses: [],
      dateJoined: "",
      status: "active",
      cohort: "",
    });
  };

  return (
    <div className="relative max-w-lg text-sm  mx-auto p-6 bg-white rounded-lg shadow-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Student</h2>
      <RxCross2
        className="absolute right-5 top-5 font-bold text-xl cursor-pointer"
        onClick={set}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex w-full items-center px-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 w-1/4 text-left"
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
            className="mt-1 block rounded-md border border-black shadow-sm p-1 w-[67%]"
          />
        </div>
        <div className="flex flex-col w-full px-2">
          <div className="w-full flex items-center">
            <label className="block text-sm font-medium text-gray-700 w-1/4 text-left ">
              Courses
            </label>
            <div className="mt-1 flex gap-2 w-[67%]">
              <input
                type="text"
                value={courseInput}
                onChange={(e) => setCourseInput(e.target.value)}
                className="flex-1 rounded-md border border-black shadow-sm  p-1 "
                placeholder="course name"
              />
              <button
                type="button"
                onClick={handleCourseAdd}
                className="px-4 py-1 bg-sky-600 text-white rounded-md hover:bg-sky-700"
              >
                Add
              </button>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 justify-end">
            {studentData.courses.map((course, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm bg-white text-black border- border-black"
              >
                {course}
                <button
                  type="button"
                  onClick={() => removeCourse(index)}
                  className="ml-2 pt-[2px] text-base"
                >
                  <RxCross2 />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex w-full items-center px-2">
          <label
            htmlFor="dateJoined"
            className="block text-sm font-medium text-gray-700 w-1/4 text-left"
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
            className="mt-1 block w-[67%] rounded-md border border-black shadow-sm p-1"
          />
        </div>

        {/* Status */}
        <div className="flex w-full items-center px-2">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 w-1/4 text-left"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={studentData.status}
            onChange={handleInputChange}
            className="mt-1 block w-[67%] rounded-md border border-black shadow-sm p-1"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="graduated">Graduated</option>
          </select>
        </div>

        {/* Cohort */}
        <div className="flex w-full items-center px-2">
          <label
            htmlFor="cohort"
            className="block text-sm font-medium text-gray-700 w-1/4 text-left"
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
            className="mt-1 block w-[67%] rounded-md border border-black shadow-sm  p-1"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-1 bg-sky-500 text-white rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Add Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudentForm;
