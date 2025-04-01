"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import MainContent from "./components/MainContent/MainContent";
import { Info, AlertCircle } from "lucide-react";

export default function Page() {
  // State management
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isBatchExpanded, setIsBatchExpanded] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Materials");
  const [selectedSubtab, setSelectedSubtab] = useState("Content");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showFileInfo, setShowFileInfo] = useState(false);
  const [showAccessMenu, setShowAccessMenu] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);

  // Mock data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "info",
      title: "New student joined",
      message: "John Doe has joined Chemistry Level 3",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "warning",
      title: "Upcoming class",
      message: "You have a class in 30 minutes",
      time: "30 minutes ago",
      read: false,
    },
    {
      id: 3,
      type: "info",
      title: "Assignment submitted",
      message: "Sarah Johnson submitted their assignment",
      time: "1 hour ago",
      read: true,
    },
  ]);

  const mainTabs = ["Students", "Announcements", "Materials", "Homework", "Attendance", "Discussion"];
  const subTabs = ["Content", "Course Details", "Revision"];

  const [chapters, setChapters] = useState([
    {
      id: 1,
      title: "Chapter 1.1",
      type: "folder",
      isExpanded: false,
      info: {
        createdOn: "25/02/2025 10:35 pm",
        createdBy: "Sir",
        lastModified: "Friday, 25/02/2025, 10:35 pm",
        lastModifiedBy: "Sir",
        kind: "PDF Document",
        size: "23 MB",
        visibleTo: "Batch 1, Batch 2, Batch 3. For both online & physical students",
      },
    },
    {
      id: 2,
      title: "Chapter 2 revision notes.pdf",
      type: "file",
      isExpanded: false,
      info: {
        createdOn: "27/02/2025 11:20 am",
        createdBy: "Sir",
        lastModified: "Friday, 27/02/2025, 11:20 am",
        lastModifiedBy: "Sir",
        kind: "PDF Document",
        size: "15 MB",
        visibleTo: "Batch 1, Batch 2. For online students only",
      },
    },
  ]);

  const mockData = {
    courseProgress: 75,
    userMenu: [
      { icon: "User", label: "Profile", href: "#" },
      { icon: "Settings", label: "Settings", href: "#" },
      { icon: "HelpCircle", label: "Help & Support", href: "#" },
      { icon: "LogOut", label: "Logout", href: "#" },
    ],
  };

  // Event handlers
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleNotificationClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowNotifications((prev) => !prev);
    setShowUserMenu(false);
  };

  const handleUserMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowUserMenu((prev) => !prev);
    setShowNotifications(false);
  };

  const handleMarkAllAsRead = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const handleMarkAsRead = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const toggleChapterExpand = (id) => {
    setChapters(
      chapters.map((chapter) =>
        chapter.id === id
          ? { ...chapter, isExpanded: !chapter.isExpanded }
          : chapter
      )
    );
  };

  const handleFileInfoClick = (chapter, e) => {
    e.stopPropagation();
    setSelectedFile(chapter);
    setShowFileInfo(true);
  };

  const handleAccessClick = (chapter, e) => {
    e.stopPropagation();
    setSelectedFile(chapter);
    setShowAccessMenu(true);
  };

  const handleActionsClick = (chapter, e) => {
    e.stopPropagation();
    setSelectedFile(chapter);
    setShowActionsMenu(true);
  };

  const renderNotificationIcon = (type) => {
    const iconProps = {
      size: 16,
      className: type === "info" ? "text-blue-600" : "text-amber-600",
    };
    return type === "info" ? <Info {...iconProps} /> : <AlertCircle {...iconProps} />;
  };

  const renderNotification = (notification) => (
    <div
      key={notification.id}
      className={`p-4 border-b hover:bg-blue-50/50 transition-all duration-300 cursor-pointer ${
        !notification.read ? "bg-blue-50/30" : ""
      }`}
      onClick={(e) => handleMarkAsRead(notification.id, e)}
    >
      <div className="flex items-start gap-3">
        <div
          className={`p-2 rounded-xl ${
            notification.type === "info" ? "bg-blue-100" : "bg-amber-100"
          }`}
        >
          {renderNotificationIcon(notification.type)}
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-800">{notification.title}</p>
          <p className="text-sm text-gray-600">{notification.message}</p>
          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
        </div>
        {!notification.read && (
          <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
        )}
      </div>
    </div>
  );

  // Screen size effect
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-white">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isSmallScreen={isSmallScreen}
        toggleSidebar={toggleSidebar}
        isBatchExpanded={isBatchExpanded}
        setIsBatchExpanded={setIsBatchExpanded}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          notifications={notifications}
          showNotifications={showNotifications}
          showUserMenu={showUserMenu}
          handleNotificationClick={handleNotificationClick}
          handleUserMenuClick={handleUserMenuClick}
          handleMarkAllAsRead={handleMarkAllAsRead}
          notificationRef={notificationRef}
          userMenuRef={userMenuRef}
          renderNotification={renderNotification}
          mockData={mockData}
          isSmallScreen={isSmallScreen}
        />

        <MainContent
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          selectedSubtab={selectedSubtab}
          setSelectedSubtab={setSelectedSubtab}
          mainTabs={mainTabs}
          subTabs={subTabs}
          chapters={chapters}
          toggleChapterExpand={toggleChapterExpand}
          handleFileInfoClick={handleFileInfoClick}
          handleAccessClick={handleAccessClick}
          handleActionsClick={handleActionsClick}
          mockData={mockData}
          isSidebarOpen={isSidebarOpen}
          isSmallScreen={isSmallScreen}
        />
      </div>
    </div>
  );
} 