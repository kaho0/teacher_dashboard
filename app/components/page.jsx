'use client'
import { Inter } from 'next/font/google';
import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Folder,
  FileText,
  Plus,
  Search,
  Trash,
  Upload,

  MoreHorizontal,
  Edit,

  Download,
  Eye,
  Info,
  User,
  Bell,
  ArrowLeft,
  Menu,
  X,
  MonitorPlay,

  Settings,
  LogOut,
  HelpCircle,
  Share2,
  Copy,

  Calendar,

  Users,
  BookOpen,
 
  AlertCircle,
  BarChart2 as Chart,
  PieChart,
  TrendingUp
} from "lucide-react";

const inter = Inter({ subsets: ['latin'] });

const mockData = {
  courseProgress: 75,
  notifications: [
    {
      id: 1,
      type: "info",
      title: "New student joined",
      message: "John Doe has joined Chemistry Level 3",
      time: "2 minutes ago",
      read: false
    },
    {
      id: 2,
      type: "warning",
      title: "Upcoming class",
      message: "You have a class in 30 minutes",
      time: "30 minutes ago",
      read: false
    },
    {
      id: 3,
      type: "info",
      title: "Assignment submitted",
      message: "Sarah Johnson submitted their assignment",
      time: "1 hour ago",
      read: true
    },
    {
      id: 4,
      type: "info",
      title: "Question in discussion",
      message: "Mike asked a question in Chapter 2 discussion",
      time: "2 hours ago",
      read: true
    }
  ],
  avatarUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23E5E7EB'/%3E%3Cpath d='M20 10C17.2386 10 15 12.2386 15 15C15 17.7614 17.2386 20 20 20C22.7614 20 25 17.7614 25 15C25 12.2386 22.7614 10 20 10Z' fill='%239CA3AF'/%3E%3Cpath d='M12 27.5C12 24.4624 14.4624 22 17.5 22H22.5C25.5376 22 28 24.4624 28 27.5V30H12V27.5Z' fill='%239CA3AF'/%3E%3C/svg%3E",
  chapters: [
    {
      id: 1,
      title: "Chapter 1.1",
      type: "folder",
      isExpanded: true,
      info: {
        createdOn: "25/02/2025 10:35 pm",
        createdBy: "Sir",
        lastModified: "Friday, 25/02/2025, 10:35 pm",
        lastModifiedBy: "Sir",
        kind: "PDF Document",
        size: "23 MB",
        visibleTo: "Batch 1, Batch 2, Batch 3. For both online & physical students"
      }
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
        visibleTo: "Batch 1, Batch 2. For online students only"
      }
    },
    {
      id: 3,
      title: "Chapter 1.2 - Atomic Structure",
      type: "folder",
      isExpanded: false,
      info: {
        createdOn: "01/03/2025 9:15 am",
        createdBy: "Sir",
        lastModified: "01/03/2025 9:15 am",
        lastModifiedBy: "Sir",
        kind: "Folder",
        size: "45 MB",
        visibleTo: "All batches"
      }
    },
    {
      id: 4,
      title: "Exam Preparation Guide.pdf",
      type: "file",
      isExpanded: false,
      info: {
        createdOn: "15/03/2025 2:30 pm",
        createdBy: "Sir",
        lastModified: "15/03/2025 2:30 pm",
        lastModifiedBy: "Sir",
        kind: "PDF Document",
        size: "8 MB",
        visibleTo: "All batches"
      }
    }
  ],
  userMenu: [
    { icon: User, label: "Profile", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
    { icon: HelpCircle, label: "Help & Support", href: "#" },
    { icon: LogOut, label: "Logout", href: "#" }
  ]
};

const baseButtonStyles = "transition-all duration-300";
const baseIconButtonStyles = "p-2 rounded-lg hover:bg-blue-50";
const baseModalStyles = "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4";
const baseModalContentStyles = "bg-white rounded-lg w-full";

const TeacherDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Materials");
  const [selectedSubtab, setSelectedSubtab] = useState("Content");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showFileInfo, setShowFileInfo] = useState(false);
  const [showAccessMenu, setShowAccessMenu] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [chapters, setChapters] = useState(mockData.chapters);
  const [isBatchExpanded, setIsBatchExpanded] = useState(false);
  const [notifications, setNotifications] = useState(mockData.notifications);

  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleChapterExpand = (id) => {
    setChapters(
      chapters.map(chapter =>
        chapter.id === id
          ? { ...chapter, isExpanded: !chapter.isExpanded }
          : chapter
      )
    );
  };

  const handleNotificationClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowNotifications(prev => !prev);
    setShowUserMenu(false);
  };

  const handleUserMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowUserMenu(prev => !prev);
    setShowNotifications(false);
  };

  const handleMarkAllAsRead = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const handleMarkAsRead = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const mainTabs = ["Students", "Announcements", "Materials", "Homework", "Attendance", "Discussion"];
  const subTabs = ["Content", "Course Details", "Revision"];
  const actionButtons = [
    { icon: Folder, text: "Add Folder" },
    { icon: Upload, text: "Upload File" },
    { icon: Upload, text: "Upload Folder" },
    { icon: Edit, text: "Add Text" },
    { icon: FileText, text: "Paste" }
  ];

  const renderNotificationIcon = (type) => {
    const iconProps = { size: 16, className: type === "info" ? "text-blue-600" : "text-amber-600" };
    return type === "info" ? <Info {...iconProps} /> : <AlertCircle {...iconProps} />;
  };

  const renderModal = (show, title, content, onClose) => {
    if (!show) return null;
    return (
      <div className={baseModalStyles}>
        <div className={`${baseModalContentStyles} max-w-2xl max-h-[90vh] overflow-y-auto`}>
          <div className="p-6 border-b flex items-center justify-between">
            <h3 className="text-lg font-medium">{title}</h3>
            <button className={`${baseIconButtonStyles} hover:bg-gray-100`} onClick={onClose}>
              <X size={20} />
            </button>
          </div>
          {content}
        </div>
      </div>
    );
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
        <div className={`p-2 rounded-xl ${notification.type === "info" ? "bg-blue-100" : "bg-amber-100"}`}>
          {renderNotificationIcon(notification.type)}
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-800">{notification.title}</p>
          <p className="text-sm text-gray-600">{notification.message}</p>
          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
        </div>
        {!notification.read && <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />}
      </div>
    </div>
  );

  const renderFileInfo = () => (
    <div className="p-6">
      <div className="space-y-4">
        {selectedFile?.info && Object.entries(selectedFile.info).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">{key}</span>
            <span className="text-gray-900">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white ${inter.className}`}>
      <header className="sticky top-0 z-50 flex justify-between items-center px-4 md:px-8 py-4 bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-100">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden p-2 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:shadow-md"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-lg md:text-xl font-bold text-blue-700">
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
                <Bell size={20} className="text-gray-600 group-hover:text-blue-600 transition-colors" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse shadow-lg shadow-red-500/30">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
            </div>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-blue-100 z-50 transform transition-all duration-300 ease-out origin-top">
                <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-blue-50 to-white rounded-t-2xl">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                  <button 
                    className="text-xs text-blue-600 cursor-pointer hover:text-blue-800 font-medium hover:underline"
                    onClick={handleMarkAllAsRead}
                  >
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No notifications
                    </div>
                  ) : (
                    notifications.map(renderNotification)
                  )}
                </div>
                <div className="p-4 border-t bg-gradient-to-r from-blue-50 to-white rounded-b-2xl">
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
                <p className="font-medium text-gray-900">Sir 1</p>
                <p className="text-xs text-gray-600">Chemistry | Level 3</p>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                {mockData.userMenu.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all duration-300 ${
                      index === 0 ? 'rounded-t-lg' : ''
                    } ${
                      index === mockData.userMenu.length - 1 ? 'rounded-b-lg' : ''
                    }`}
                  >
                    <item.icon size={16} className={index === mockData.userMenu.length - 1 ? "text-red-500" : "text-gray-600"} />
                    <span className={index === mockData.userMenu.length - 1 ? "text-red-500" : "text-gray-600"}>{item.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-grow relative">
        {isSidebarOpen && isSmallScreen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
            onClick={toggleSidebar}
          />
        )}

        <aside
          className={`
            fixed md:static inset-y-0 left-0 z-50
            ${isSmallScreen ? (isSidebarOpen ? "translate-x-0" : "-translate-x-full") : ""}
            ${!isSmallScreen ? (isSidebarOpen ? "w-64" : "w-20") : "w-72"}
            bg-white border-r border-blue-100 transition-all duration-300 ease-in-out
            shadow-[0_0_40px_-15px_rgba(0,0,0,0.3)] backdrop-blur-sm bg-white/90
          `}
        >
          <div className="p-4 border-b bg-gradient-to-br from-blue-50 to-white">
            <div className="flex items-center gap-3">
              <button
                className="bg-blue-600 rounded-xl text-white p-2 hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20 transform hover:scale-105"
                onClick={toggleSidebar}
              >
                <ArrowLeft
                  size={16}
                  className={`transform transition-transform duration-300 ${
                    isSidebarOpen ? "rotate-0" : "rotate-180"
                  }`}
                />
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
              <BookOpen size={20} className="text-gray-600 group-hover:text-blue-600 transition-colors" />
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
                  isBatchExpanded ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                } ${
                  !isSidebarOpen ? "justify-center" : "justify-between"
                } hover:shadow-lg hover:shadow-blue-600/5 transition-all duration-300 hover:scale-[1.02]`}
                onClick={() => setIsBatchExpanded(!isBatchExpanded)}
              >
                <div className="flex items-center gap-3">
                  <Users size={20} className="flex-shrink-0" />
                  <span
                    className={`transition-all duration-300 font-medium ${
                      isSidebarOpen ? "opacity-100" : "opacity-0 hidden md:hidden"
                    }`}
                  >
                    Manage Batch
                  </span>
                </div>
                {isSidebarOpen && (
                  <ChevronDown 
                    size={16} 
                    className={`transform transition-transform duration-300 ${
                      isBatchExpanded ? 'rotate-180' : ''
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
              className={`pt-6 mt-6 border-t space-y-4 ${
                !isSidebarOpen ? "border-t-transparent" : ""
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

        <main className="flex-1 min-w-0 overflow-x-hidden bg-white md:rounded-tl-3xl shadow-lg md:m-4 transition-all duration-300">
          <div className="p-4 border-b">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                  <span className="font-medium text-gray-900">Course for Chemistry</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
                <div className="border-l h-6 hidden md:block border-gray-200"></div>
                <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                  <span className="font-medium text-gray-900">All Batches</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button className="flex-1 md:flex-initial flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20">
                  <MonitorPlay size={18} />
                  <span>Take Class</span>
                </button>
                <button className="flex-1 md:flex-initial flex items-center justify-center gap-3 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300">
                  <div className="flex items-center gap-1">
                    <div className="relative flex -space-x-3">
                      <div className="relative h-8 w-8 rounded-full border-2 border-white overflow-hidden z-30">
                        <img
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt="TA 1"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="relative h-8 w-8 rounded-full border-2 border-white overflow-hidden z-20">
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt="TA 2"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="relative h-8 w-8 rounded-full bg-blue-100 border-2 border-white z-10 flex items-center justify-center">
                        <Plus size={16} className="text-blue-600" />
                      </div>
                    </div>
                  </div>
                  <span className="text-gray-700 font-medium">Add TA</span>
                </button>
              </div>
            </div>
          </div>

          <div className="px-4 py-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-600">Course Completion</span>
              <span className="text-sm font-medium text-blue-600">{mockData.courseProgress}%</span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${mockData.courseProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="border-b overflow-x-auto scrollbar-hide bg-gradient-to-r from-blue-50 to-white">
            <div className="flex min-w-max">
              {mainTabs.map((tab) => (
                <button
                  key={tab}
                  className={`px-4 md:px-6 py-3 font-medium whitespace-nowrap transition-all duration-300 ${
                    selectedTab === tab
                      ? "text-blue-600 border-b-2 border-blue-600 bg-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-blue-50/50"
                  }`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              ))}
              <button className="px-4 py-3 hover:bg-blue-50/50 transition-all duration-300">
                <MoreHorizontal size={20} />
              </button>
              <div className="flex-grow flex justify-end px-4">
                <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300">
                  <Trash size={20} />
                </button>
                <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 ml-2">
                  <Download size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="border-b overflow-x-auto scrollbar-hide">
              <div className="flex min-w-max">
                {subTabs.map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 md:px-6 py-3 font-medium whitespace-nowrap transition-colors ${
                      selectedSubtab === tab
                        ? "border-b-2 border-gray-900 text-gray-900"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setSelectedSubtab(tab)}
                  >
                    {tab}
                  </button>
                ))}
                <button className="px-4 py-3 flex items-center ml-4 text-blue-600 hover:text-blue-700 transition-colors font-medium">
                  <Plus size={20} className="mr-1" />
                  <span>Add main Folder</span>
                </button>
              </div>
            </div>

            <div className="py-4">
              <div className="flex flex-wrap items-center gap-2 mb-6 bg-gray-50 p-3 rounded-lg">
                <button className="p-1.5 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                  <ArrowLeft size={16} className="text-white" />
                </button>
                <div className="flex flex-wrap items-center gap-x-1">
                  <a href="#" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium">
                    <span>Chapter 1</span>
                    <ChevronRight size={16} />
                  </a>
                  <a href="#" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium">
                    <span>Chapter 1.1</span>
                    <ChevronRight size={16} />
                  </a>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="font-medium">Chapter 1</span>
                </div>
                <div className="ml-auto flex flex-wrap items-center gap-2">
                  <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                    <Info size={16} />
                  </button>
                  <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-200 p-1.5 rounded transition-colors">
                    <Eye size={16} />
                    <span className="text-sm whitespace-nowrap">Access to</span>
                    <ChevronDown size={16} />
                  </div>
                  <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-200 p-1.5 rounded transition-colors">
                    <span className="text-sm">Actions</span>
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              <div className="border rounded-xl shadow-sm overflow-hidden bg-white">
                {chapters.map((chapter) => (
                  <div key={chapter.id}>
                    <div 
                      className="border-b p-4 flex items-center gap-4 hover:bg-gray-50/80 transition-all duration-300 cursor-pointer group"
                      onClick={() => chapter.type === 'folder' && toggleChapterExpand(chapter.id)}
                    >
                      <input 
                        type="checkbox" 
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-2"
                        onClick={(e) => e.stopPropagation()}
                      />
                      {chapter.type === "folder" ? (
                        <Folder
                          size={24}
                          className="text-blue-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <FileText
                          size={24}
                          className="text-gray-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="truncate font-medium group-hover:text-blue-600 transition-colors duration-300">{chapter.title}</span>
                        {chapter.type === "folder" && (
                          chapter.isExpanded ? (
                            <ChevronUp size={16} className="text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
                          ) : (
                            <ChevronDown size={16} className="text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
                          )
                        )}
                      </div>

                      <div className="ml-auto flex items-center gap-2 md:gap-4 flex-shrink-0">
                        <button 
                          className="p-1.5 hover:bg-blue-50 rounded-lg transition-all duration-300 text-gray-600 hover:text-blue-600"
                          onClick={(e) => handleFileInfoClick(chapter, e)}
                        >
                          <Info size={18} />
                        </button>
                        <div 
                          className="hidden md:flex items-center gap-1 hover:bg-blue-50 p-1.5 rounded-lg transition-all duration-300"
                          onClick={(e) => handleAccessClick(chapter, e)}
                        >
                          <Eye size={18} className="text-gray-600" />
                          <span className="text-sm">Access to</span>
                          <ChevronDown size={16} />
                        </div>
                        <div 
                          className="flex items-center gap-1 hover:bg-blue-50 p-1.5 rounded-lg transition-all duration-300"
                          onClick={(e) => handleActionsClick(chapter, e)}
                        >
                          <span className="text-sm hidden md:inline">Actions</span>
                          <MoreHorizontal size={18} className="md:hidden text-gray-600" />
                          <ChevronDown size={16} className="hidden md:block" />
                        </div>
                      </div>
                    </div>
                    
                    {chapter.isExpanded && chapter.info && (
                      <div className="bg-gray-50 p-4 border-b text-sm">
                        <div className="space-y-2 md:ml-16">
                          {Object.entries(chapter.info).map(([key, value]) => (
                            <div key={key} className="flex flex-col md:flex-row md:gap-4">
                              <span className="font-medium md:w-32">{key}:</span>
                              <span className="text-gray-600">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 md:gap-4 mt-8">
                {actionButtons.map((action, index) => (
                  <button 
                    key={index}
                    className="flex-1 md:flex-initial border border-dashed rounded-lg py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors min-w-[120px]"
                  >
                    <action.icon size={18} className="text-gray-600" />
                    <span className="whitespace-nowrap">{action.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {renderModal(showFileInfo, "File Information", renderFileInfo(), () => setShowFileInfo(false))}

      {renderModal(showAccessMenu, "Access Settings", (
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Make Public</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Visible to
              </label>
              <select className="w-full p-2 border rounded-lg">
                <option>All Students</option>
                <option>Selected Batches</option>
                <option>Specific Students</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Duration
              </label>
              <div className="flex gap-2">
                <input 
                  type="date" 
                  className="flex-1 p-2 border rounded-lg"
                />
                <input 
                  type="date" 
                  className="flex-1 p-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      ), () => setShowAccessMenu(false))}

      {renderModal(showActionsMenu, "File Actions", (
        <div className="p-6">
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
              <Edit size={18} className="text-gray-600" />
              <span>Edit</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
              <Copy size={18} className="text-gray-600" />
              <span>Duplicate</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
              <Share2 size={18} className="text-gray-600" />
              <span>Share</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
              <Download size={18} className="text-gray-600" />
              <span>Download</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors text-red-600">
              <Trash size={18} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      ), () => setShowActionsMenu(false))}
    </div>
  );
}

export default TeacherDashboard;