import React, { useEffect, useState } from "react";
import { Search, HelpCircle, MessageSquare, Bell } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../../context/Firebase";

const Header = ({ input }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user.displayName);
      }
    });
  }, []);

  const handleSearch = (e) => {
    input(e.target.value);
  };
  return (
    <div className="p-4 border-b bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              onChange={handleSearch}
              placeholder="Search your course"
              className="w-full pl-10 pr-4 py-2 border rounded-md"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <HelpCircle className="h-6 w-6 text-gray-500" />
          <MessageSquare className="h-6 w-6 text-gray-500" />
          <img src="/filter.png" alt="" />
          <Bell className="h-6 w-6 text-gray-500" />
          <img src="/user.png" alt="Profile" className="w-8 h-8 rounded-full" />
          <span className="font-medium">{user}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
