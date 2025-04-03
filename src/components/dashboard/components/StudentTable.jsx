import React, { useState } from "react";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { firebaseHook } from "../../../context/Firebase";
import { toast } from "react-toastify";

const StudentTable = ({ students, search, sortOption }) => {
  const firebase = firebaseHook();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    cohort: "",
    courses: [],
    dateJoined: "",
    status: "active",
  });

  let filterStudents =
    search.trim() === ""
      ? students
      : students.filter((student) =>
          student.name.toLowerCase().includes(search.toLowerCase())
        );

  filterStudents = [...filterStudents].sort((a, b) => {
    if (sortOption === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "dateJoined") {
      return new Date(a.dateJoined) - new Date(b.dateJoined);
    }
    return 0;
  });

  const handledelete = async (id) => {
    try {
      await firebase.deleteit(id);
      toast.success("deleted successfully ");
    } catch (error) {
      toast.error("Error deleting student:");
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name || "",
      cohort: student.cohort || "",
      courses: student.courses || "",
      dateJoined: student.dateJoined || "",
      status: student.status || "",
    });
    setIsEditModalOpen(true);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      await firebase.update(selectedStudent.id, formData);
      toast.success("Student updated successfully");
      setIsEditModalOpen(false);
      setSelectedStudent(null);
    } catch (error) {
      toast.error("Error updating student: " + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow">
        <table className="w-fit">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4">Student Name</th>
              <th className="text-left p-4">Cohort</th>
              <th className="text-left p-4">Courses</th>
              <th className="text-left p-4">Date Joined</th>
              {/* <th className="text-left p-4">Last Login</th> */}
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterStudents.length > 0 ? (
              filterStudents.map((student, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4">{student.name}</td>
                  <td className="p-4">{student.cohort}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      {student.courses.map((course, i) => (
                        <span key={i} className="flex items-center">
                          <span className="w-4 h-4 bg-red-100 rounded-full mr-1"></span>
                          {course}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">{student.dateJoined}</td>
                  {/* <td className="p-4">{student.lastLogin}</td> */}
                  <td className="p-4">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        student.status === "active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                  </td>
                  <td className="p-4 flex gap-2 justify-center">
                    <MdOutlineModeEdit
                      className="text-sky-600 cursor-pointer"
                      onClick={() => handleEdit(student)}
                    />
                    <MdDeleteOutline
                      className="text-rose-600 cursor-pointer"
                      onClick={() => handledelete(student.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isEditModalOpen && (
        <div className="absolute inset-0 items-center justify-center bg-zinc-50 bg-opacity-65">
          <div className="max-w-lg text-sm  mx-auto p-6 bg-white rounded-lg shadow-2xl mt-10">
            <h2 className="text-xl font-bold mb-4">Edit Student</h2>
            <form onSubmit={handleSubmitEdit}>
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Cohort</label>
                <input
                  type="text"
                  name="cohort"
                  value={formData.cohort}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
