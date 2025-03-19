import React, { useState } from "react";
import AddStudentForm from "./AddStudentForm";

const Filters = () => {
  const [show, setShow] = useState(false);
  const handleclose = () => setShow(false);
  return (
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
        <button className="border rounded-md px-3 py-1 bg-sky-500 text-white">
          <button onClick={() => setShow(!show)}>
            <span className="font-black">+</span> Add New Student
          </button>
          <div
            className={`${
              show ? "" : "hidden"
            } absolute inset-0 items-center justify-center bg-zinc-50 bg-opacity-65`}
          >
            <AddStudentForm set={handleclose} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Filters;
