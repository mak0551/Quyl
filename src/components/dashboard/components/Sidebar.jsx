import React from "react";

const Sidebar = () => {
  const menuItems = [
    { icon: "/dashboard.png", label: "Dashboard" },
    { icon: "/student.png", label: "Students" },
    { icon: "/chapter.png", label: "Chapter" },
    { icon: "/help.png", label: "Help" },
    { icon: "/reports.png", label: "Reports" },
    { icon: "/setting.png", label: "Settings" },
  ];

  return (
    <div className="w-64 bg-white border-r min-h-[80vh] px-8">
      <div className="p-4">
        <img src="/Vector.png" alt="Quyl Logo" className="mb-6" />
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              <span className="text-sm font-medium flex gap-2">
                <img src={item.icon} className="h-5.5" alt="" />
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
