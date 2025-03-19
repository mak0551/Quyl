import React from "react";

const Filters = () => {
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
        <button className="border rounded-md px-3 py-1 bg-zinc-200">
          <span className="font-black">+</span> Add New Student
        </button>
      </div>
    </div>
  );
};

export default Filters;