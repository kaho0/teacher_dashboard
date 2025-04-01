"use client";
import React from "react";
import {
  Bell,
  User,
  Menu,
  X,
  Settings,
  HelpCircle,
  LogOut,
  AlertCircle,
  Info,
} from "lucide-react";

const Navbar = ({
  isSidebarOpen,
  toggleSidebar,
  notifications,
  showNotifications,
  showUserMenu,
  handleNotificationClick,
  handleUserMenuClick,
  handleMarkAllAsRead,
  notificationRef,
  userMenuRef,
  renderNotification,
  mockData,
  isSmallScreen,
}) => {
  const userMenuItems = [
    { icon: User, label: "Profile", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
    { icon: HelpCircle, label: "Help & Support", href: "#" },
    { icon: LogOut, label: "Logout", href: "#" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-8 py-4 bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-100">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden p-2 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:shadow-md"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-lg md:text-xl font-extrabold text-blue-700">
          Teacher's Center
        </h1>
      </div>
      <div className="flex items-center gap-3 md:gap-6">
        <div className="hidden md:flex items-center gap-2 text-gray-600 cursor-pointer hover:text-blue-600 transition-all duration-300 hover:scale-105">
          <User size={20} />
        </div>
        <div className="relative">
          <div className="relative" ref={notificationRef}>
            <button
              className="relative cursor-pointer p-2 hover:bg-blue-50 rounded-xl transition-all duration-300 group"
              onClick={handleNotificationClick}
            >
              <Bell
                size={20}
                className="text-gray-600 group-hover:text-blue-600 transition-colors"
              />
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse shadow-lg shadow-red-500/30">
                  {notifications.filter((n) => !n.read).length}
                </span>
              )}
            </button>
          </div>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-blue-100 z-50 transform transition-all duration-300 ease-out origin-top">
              <div className="p-4 flex justify-between items-center bg-gradient-to-r from-blue-50 to-white rounded-t-2xl">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
                <button
                  className="text-xs text-blue-600 cursor-pointer hover:text-blue-800 font-medium hover:underline"
                  onClick={handleMarkAllAsRead}
                >
                  Mark all as read
                </button>
              </div>
              <div className="max-h-[calc(100vh-200px)] overflow-y-auto divide-y divide-gray-50">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No notifications
                  </div>
                ) : (
                  <div className="space-y-1">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-gray-50/80 transition-all duration-300 cursor-pointer ${
                          !notification.read ? 'bg-blue-50/50' : ''
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className={`mt-0.5 ${
                            notification.type === 'warning' ? 'text-amber-500' : 'text-blue-500'
                          }`}>
                            {notification.type === 'warning' ? (
                              <AlertCircle size={20} />
                            ) : (
                              <Info size={20} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-0.5">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-50 to-white rounded-b-2xl">
                <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-100 py-2 rounded-xl transition-all duration-300">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="relative" ref={userMenuRef}>
          <button
            className="flex items-center gap-3 hover:bg-gray-50/50 p-2 rounded-lg transition-all duration-300"
            onClick={handleUserMenuClick}
          >
            <div className="relative h-8 w-8 md:h-9 md:w-9 rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block text-left">
              <p className="font-semibold text-gray-900 tracking-wide">
                Sir 1
              </p>
              <p className="text-xs font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Chemistry | Level 3
              </p>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border-gray-300 border border-gray-100 z-50">
              {userMenuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all duration-300 ${
                    index === 0 ? "rounded-t-lg" : ""
                  } ${
                    index === userMenuItems.length - 1
                      ? "rounded-b-lg"
                      : ""
                  }`}
                >
                  <item.icon
                    size={16}
                    className={
                      index === userMenuItems.length - 1
                        ? "text-red-500"
                        : "text-gray-600"
                    }
                  />
                  <span
                    className={
                      index === userMenuItems.length - 1
                        ? "text-red-500"
                        : "text-gray-600"
                    }
                  >
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar; 