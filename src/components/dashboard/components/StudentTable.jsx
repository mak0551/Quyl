import React, { useEffect } from "react";

const StudentTable = ({ students, search }) => {
  const filterStudents =
    search.trim() === ""
      ? students
      : students.filter((student) =>
          student.name.toLowerCase().includes(search.toLowerCase())
        );
  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
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
                          <span className="w-6 h-6 bg-red-100 rounded-full mr-1"></span>
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
                  <td className="px-4 pb-2 text-lg text-center">...</td>
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
    </div>
  );
};

export default StudentTable;
