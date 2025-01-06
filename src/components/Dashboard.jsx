import React from "react";
import { Search, HelpCircle, MessageSquare, Bell } from "lucide-react";

const StudentDashboard = () => {
  const students = [
    {
      name: "Anshuman Kashyap",
      cohort: "AY 2024-25",
      courses: ["CBSE 9 Science", "CBSE 9 Math"],
      dateJoined: "17. Nov. 2024",
      lastLogin: "17. Nov. 2024 4:16 PM",
      status: "active",
    },
    // Add more student data as needed
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-4">
          <img src="/public/Vector.png" alt="Quyl Logo" className="mb-6" />

          <div className="space-y-2">
            <div className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <span className="text-sm font-medium flex gap-2">
                <img src="/public/dashboard.png" className="h-5.5" alt="" />
                Dashboard
              </span>
            </div>
            <div className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <span className="text-sm font-medium flex gap-2">
                <img src="/public/student.png" className="h-5.5" alt="" />
                Students
              </span>
            </div>
            <div className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <span className="text-sm font-medium flex gap-2">
                <img src="/public/chapter.png" className="h-5.5" alt="" />
                Chapter
              </span>
            </div>
            <div className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <span className="text-sm font-medium flex gap-2">
                <img src="/public/help.png" className="h-5.5" alt="" />
                Help
              </span>
            </div>
            <div className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <span className="text-sm font-medium flex gap-2">
                <img src="/public/reports.png" className="h-5.5" alt="" />
                Reports
              </span>
            </div>
            <div className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <span className="text-sm font-medium flex gap-2">
                <img src="/public/setting.png" className="h-5.5" alt="" />
                Settings
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="p-4 border-b bg-white">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your course"
                  className="w-full pl-10 pr-4 py-2 border rounded-md"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <HelpCircle className="h-6 w-6 text-gray-500" />
              <MessageSquare className="h-6 w-6 text-gray-500" />
              <img src="/public/filter.png" alt="" />
              <Bell className="h-6 w-6 text-gray-500" />
              <img
                src="/public/user.png"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">Adeline H. Dancy</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <select className="border rounded-md px-3 py-1">
              <option>AY 2024-25</option>
            </select>
            <select className="border rounded-md px-3 py-1">
              <option>CBSE 9</option>
            </select>
          </div>
          <div>
            <button className="border rounded-md px-3 py-1 bg-zinc-200">
              <span className="font-black">+</span> Add New Student
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="p-4">
          <div className="bg-white rounded-lg shadow">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Student Name</th>
                  <th className="text-left p-4">Cohort</th>
                  <th className="text-left p-4">Courses</th>
                  <th className="text-left p-4">Date Joined</th>
                  <th className="text-left p-4">Last Login</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
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
                    <td className="p-4">{student.lastLogin}</td>
                    <td className="p-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          student.status === "active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
