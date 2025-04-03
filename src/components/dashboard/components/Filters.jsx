import React, { useState } from "react";
import AddStudentForm from "./AddStudentForm";
import { FaSortAmountDown } from "react-icons/fa";

const Filters = ({ setSortOption }) => {
  const [show, setShow] = useState(false);
  const handleclose = () => setShow(false);
  return (
    <div className="p-4 flex justify-between items-center">
      <div className="flex items-center gap-2 ">
        <FaSortAmountDown />
        <select
          className="border rounded-md px-3 py-1"
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="name">Student Name</option>
          <option value="dateJoined">Date Joined</option>
        </select>
      </div>
      <div>
        <button
          className="rounded-md px-3 py-1 bg-sky-500 text-white"
          onClick={() => setShow(!show)}
        >
          <span className="font-black">+</span> Add New Student
        </button>
        <div
          className={`${
            show ? "inline" : "hidden"
          } absolute inset-0 items-center justify-center bg-zinc-50 bg-opacity-65`}
        >
          <AddStudentForm set={handleclose} />
        </div>
      </div>
    </div>
  );
};

export default Filters;
