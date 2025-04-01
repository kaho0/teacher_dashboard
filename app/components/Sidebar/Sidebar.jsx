"use client";
import React from "react";
import {
  ArrowLeft,
  Menu,
  BookOpen,
  Users,
  TrendingUp,
  Calendar,
  PieChart,
  User,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({
  isSidebarOpen,
  isSmallScreen,
  toggleSidebar,
  isBatchExpanded,
  setIsBatchExpanded,
}) => {
  return (
    <>
     {isSidebarOpen && isSmallScreen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
          onClick={toggleSidebar}
        />
      )}

<aside
        className={`
          fixed top-[73px] mt-2 bottom-0 left-0 z-40
          ${isSmallScreen ? (isSidebarOpen ? "translate-x-0" : "-translate-x-full") : ""}
          ${!isSmallScreen ? (isSidebarOpen ? "w-64" : "w-20") : "w-72"}
          bg-white border-r border-blue-100 transition-all duration-300 ease-in-out
          shadow-[0_0_40px_-15px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-white/90
          overflow-y-auto
        `}
      >
        <div className="p-6 bg-gradient-to-br from-blue-50 to-white">
          <div className="flex items-center gap-4">
            <button
              className="bg-blue-600 rounded-xl text-white py-2 px-1.5 hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20 transform hover:scale-105"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? (
                <ArrowLeft size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>
            <span
              className={`font-bold text-blue-700 transition-all duration-300 ${
                isSidebarOpen ? "opacity-100" : "opacity-0 md:hidden"
              }`}
            >
              Teach Portal
            </span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 text-gray-600 overflow-y-auto">
          <a
            href="#"
            className={`flex items-center gap-3 py-3 hover:bg-blue-50 rounded-xl px-4 transition-all duration-300 group hover:shadow-md ${
              !isSidebarOpen ? "justify-center" : ""
            }`}
          >
            <BookOpen
              size={20}
              className="text-gray-600 group-hover:text-blue-600 transition-colors"
            />
            <span
              className={`transition-all duration-300 ${
                isSidebarOpen ? "opacity-100" : "opacity-0 hidden md:hidden"
              }`}
            >
              Dashboard
            </span>
          </a>

          <div>
            <div
              className={`flex items-center gap-3 py-3 px-4 rounded-xl cursor-pointer ${
                isBatchExpanded
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50"
              } ${
                !isSidebarOpen ? "justify-center" : "justify-between"
              } hover:shadow-lg hover:shadow-blue-600/5 transition-all duration-300 hover:scale-[1.02]`}
              onClick={() => setIsBatchExpanded(!isBatchExpanded)}
            >
              <div className="flex items-center gap-3">
                <Users size={20} className="flex-shrink-0" />
                <span
                  className={`transition-all duration-300 font-medium ${
                    isSidebarOpen
                      ? "opacity-100"
                      : "opacity-0 hidden md:hidden"
                  }`}
                >
                  Manage Batch
                </span>
              </div>
              {isSidebarOpen && (
                <ChevronDown
                  size={16}
                  className={`transform transition-transform duration-300 ${
                    isBatchExpanded ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>
            {isSidebarOpen && isBatchExpanded && (
              <div className="pl-12 mt-2 space-y-1">
                <a
                  href="#"
                  className="block py-2 px-4 rounded-xl bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition-all duration-300 hover:shadow-md"
                >
                  All Batches
                </a>
                <a
                  href="#"
                  className="block py-2 px-4 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:shadow-md"
                >
                  Resources
                </a>
                <a
                  href="#"
                  className="block py-2 px-4 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:shadow-md"
                >
                  Add New Batch
                </a>
              </div>
            )}
          </div>

          <a
            href="#"
            className={`flex items-center gap-3 py-2.5 hover:bg-gray-50/50 rounded-lg px-3 transition-all duration-300 ${
              !isSidebarOpen ? "justify-center" : ""
            }`}
          >
            <TrendingUp size={20} className="text-gray-600" />
            <span
              className={`transition-opacity duration-300 ${
                isSidebarOpen ? "opacity-100" : "opacity-0 hidden md:hidden"
              }`}
            >
              My Earnings
            </span>
          </a>

          <a
            href="#"
            className={`flex items-center gap-3 py-2.5 hover:bg-gray-50/50 rounded-lg px-3 transition-all duration-300 ${
              !isSidebarOpen ? "justify-center" : ""
            }`}
          >
            <Calendar size={20} className="text-gray-600" />
            <span
              className={`transition-opacity duration-300 ${
                isSidebarOpen ? "opacity-100" : "opacity-0 hidden md:hidden"
              }`}
            >
              Timetable
            </span>
          </a>

          <a
            href="#"
            className={`flex items-center gap-3 py-2.5 hover:bg-gray-50/50 rounded-lg px-3 transition-all duration-300 ${
              !isSidebarOpen ? "justify-center" : ""
            }`}
          >
            <PieChart size={20} className="text-gray-600" />
            <span
              className={`transition-opacity duration-300 ${
                isSidebarOpen ? "opacity-100" : "opacity-0 hidden md:hidden"
              }`}
            >
              Analytics
            </span>
          </a>

          <div
            className={` ${
              !isSidebarOpen ? "" : ""
            }`}
          >
            <a
              href="#"
              className={`flex items-center gap-3 py-2.5 hover:bg-blue-50 rounded-lg px-3 transition-colors ${
                !isSidebarOpen ? "justify-center" : ""
              }`}
            >
              <User size={20} className="text-gray-600" />
              <span
                className={`transition-opacity duration-300 ${
                  isSidebarOpen ? "opacity-100" : "opacity-0 hidden md:hidden"
                }`}
              >
                Manage Profile
              </span>
            </a>
            <a
              href="#"
              className={`flex items-center gap-3 py-2.5 hover:bg-blue-50 rounded-lg px-3 transition-colors ${
                !isSidebarOpen ? "justify-center" : ""
              }`}
            >
              <Settings size={20} className="text-gray-600" />
              <span
                className={`transition-opacity duration-300 ${
                  isSidebarOpen ? "opacity-100" : "opacity-0 hidden md:hidden"
                }`}
              >
                Settings
              </span>
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;