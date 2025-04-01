"use client";
import React from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Folder,
  FileText,
  Plus,
  MonitorPlay,
  MoreHorizontal,
  Trash,
  Download,
  Eye,
  Info,
  ChevronLeft,
  CircleEllipsis,
  ArrowLeft
} from "lucide-react";

const MainContent = ({
  selectedTab,
  setSelectedTab,
  selectedSubtab,
  setSelectedSubtab,
  mainTabs,
  subTabs,
  chapters,
  toggleChapterExpand,
  handleFileInfoClick,
  handleAccessClick,
  handleActionsClick,
  mockData,
  isSidebarOpen,
  isSmallScreen,
}) => {
  return (
    <main
      className={`flex-1 min-w-0 overflow-x-hidden bg-white shadow-lg transition-all duration-300 ${
        !isSmallScreen ? (isSidebarOpen ? "md:ml-72" : "md:ml-28") : ""
      }`}
    >
      <div className="bg-white mt-25">
        {/* New Header Section */}
        <div className="p-4 border-b border-gray-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                <span className="font-medium text-gray-900">
                  Course for Chemistry
                </span>
                <ChevronDown size={16} className="text-gray-500" />
              </div>
              <div className="border-l h-6 hidden md:block border-gray-300"></div>
              <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                <span className="font-medium text-gray-900">
                  All Batches
                </span>
                <ChevronDown size={16} className="text-gray-500" />
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button className="flex-1 md:flex-initial flex items-center bg-blue-700 justify-center gap-2  text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300">
                <MonitorPlay size={20} />
                <span>Take Class</span>
              </button>
              <button className="flex-1 md:flex-initial flex items-center justify-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50/80 transition-all duration-300">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    <div className="h-7 w-7 rounded-full border-2 border-white overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="TA 1"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="h-7 w-7 rounded-full border-2 border-white overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="TA 2"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <span className="text-gray-700">Add TA</span>
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-600 animate-fade-in">
              Course Completion
            </span>
            <span className="text-sm font-medium text-blue-600 animate-count-up">
              {mockData.courseProgress}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-full transition-all duration-1000 ease-out animate-progress"
              style={{ width: `${mockData.courseProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Main Tabs */}
        <div className="border-b border-gray-400 overflow-x-auto scrollbar-hide bg-gradient-to-r from-blue-50 to-white">
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

        {/* Sub Tabs and Content */}
        <div className="p-4 pb-4">
          <div className="border-b border-gray-400 overflow-x-auto scrollbar-hide">
            <div className="flex min-w-max">
              {subTabs.map((tab) => (
                <button
                  key={tab}
                  className={`px-4 md:px-6 py-3 font-medium whitespace-nowrap transition-colors ${
                    selectedSubtab === tab
                      ? "border-b-2 border-gray-300 text-gray-900"
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

          {/* Breadcrumbs and Chapter Content */}
          <div className="py-4">
            <div className="flex flex-wrap items-center gap-2 mb-6 bg-gray-50 p-3 rounded-lg">
              <button className="p-1.5 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                <ArrowLeft size={16} className="text-white" />
              </button>
              <div className="flex flex-wrap items-center gap-x-1">
                <a
                  href="#"
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
                >
                  <span>Chapter 1</span>
                  <ChevronRight size={16} />
                </a>
                <a
                  href="#"
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
                >
                  <span>Chapter 1.1</span>
                  <ChevronRight size={16} />
                </a>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
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

            {/* Chapters List */}
            <div className="border rounded border-gray-300 shadow-sm bg-white">
              {chapters.map((chapter) => (
                <div key={chapter.id} className={chapter.type === 'folder' ? 'border-b border-gray-300' : ''}>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 mr-3 rounded border-gray-300 text-blue-600"
                      />
                      <div className="flex items-center">
                        {chapter.type === 'folder' ? (
                          <Folder size={20} className="text-gray-500 mr-3" />
                        ) : (
                          <FileText size={20} className="text-gray-500 mr-3" />
                        )}
                        <span className="font-medium mr-2">{chapter.title}</span>
                        {chapter.type === 'folder' && (
                          <button 
                            className="hover:bg-gray-100 rounded p-0.5"
                            onClick={() => toggleChapterExpand(chapter.id)}
                          >
                            {chapter.isExpanded ? (
                              <ChevronUp size={16} className="text-gray-500" />
                            ) : (
                              <ChevronDown size={16} className="text-gray-500" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button onClick={(e) => handleFileInfoClick(chapter, e)}>
                        <Info size={20} className="text-gray-500" />
                      </button>
                      <div 
                        className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer"
                        onClick={(e) => handleAccessClick(chapter, e)}
                      >
                        <Eye size={16} />
                        <span>Access to</span>
                        <ChevronDown size={14} />
                      </div>
                      <div 
                        className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer"
                        onClick={(e) => handleActionsClick(chapter, e)}
                      >
                        <span>Actions</span>
                        <ChevronDown size={14} />
                      </div>
                    </div>
                  </div>
                  
                  {chapter.type === 'folder' && chapter.isExpanded && (
                    <div className="flex flex-col">
                      <div className="flex border-t border-gray-300">
                        <div className="flex-1 p-4 flex items-end">
                          <div>
                            <div className="text-xs text-gray-500">Visible to:</div>
                            <div className="text-xs text-gray-600 italic">{chapter.info.visibleTo}</div>
                          </div>
                        </div>
                        <div className="flex bg-gray-50 ml-auto w-1/4">
                          <div className="flex-1 p-4">
                            <div>
                              <div className="text-xs text-gray-500">Created on:</div>
                              <div className="text-sm font-medium">{chapter.info.createdOn}</div>
                            </div>
                            <div className="mt-1">
                              <div className="text-xs text-gray-500">Created by:</div>
                              <div className="text-sm font-medium">{chapter.info.createdBy}</div>
                            </div>
                            <div className="mt-1">
                              <div className="text-xs text-gray-500">Last Modified:</div>
                              <div className="text-sm font-medium">{chapter.info.lastModified}</div>
                            </div>
                            <div className="mt-1">
                              <div className="text-xs text-gray-500">Last Modified by:</div>
                              <div className="text-sm font-medium">{chapter.info.lastModifiedBy}</div>
                            </div>
                            <div className="mt-1">
                              <div className="text-xs text-gray-500">Kind:</div>
                              <div className="text-sm font-medium">{chapter.info.kind}</div>
                            </div>
                            <div className="mt-1">
                              <div className="text-xs text-gray-500">Size:</div>
                              <div className="text-sm font-medium">{chapter.info.size}</div>
                            </div>
                          </div>
                          <div className="w-px bg-gray-200"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Content Buttons */}
            <div className="flex flex-wrap gap-3 mt-8">
              <button className="flex items-center gap-2 px-5 py-3 border border-dashed border-gray-300 rounded hover:bg-gray-50">
                <Plus size={16} className="text-gray-500" />
                <span className="text-xs text-gray-600">Add Folder</span>
              </button>
              <button className="flex items-center gap-2 px-5 py-3 border border-dashed border-gray-300 rounded hover:bg-gray-50">
                <Plus size={16} className="text-gray-500" />
                <span className="text-xs text-gray-600">Upload File</span>
              </button>
              <button className="flex items-center gap-2 px-5 py-3 border border-dashed border-gray-300 rounded hover:bg-gray-50">
                <Plus size={16} className="text-gray-500" />
                <span className="text-xs text-gray-600">Upload Folder</span>
              </button>
              <button className="flex items-center gap-2 px-5 py-3 border border-dashed border-gray-300 rounded hover:bg-gray-50">
                <Plus size={16} className="text-gray-500" />
                <span className="text-xs text-gray-600">Add Text</span>
              </button>
              <button className="flex items-center gap-2 px-5 py-3 border border-dashed border-gray-300 rounded hover:bg-gray-50">
                <Plus size={16} className="text-gray-500" />
                <span className="text-xs text-gray-600">Paste</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;