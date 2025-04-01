# Teacher Dashboard

A modern, responsive dashboard interface for teachers to manage course content, students, and classroom activities.

## Overview

This Next.js application provides teachers with a comprehensive dashboard to:
- Manage teaching materials and course content
- Track student attendance and performance
- Organize chapters and course materials
- Handle notifications and administrative tasks
- Monitor course progress

## Features

- **Course Management**: Organize course materials into chapters and files
- **Batch Management**: Manage different student batches and control access
- **Content Organization**: Upload, create and manage teaching materials
- **Notifications**: Real-time notification system for student activities and updates
- **Progress Tracking**: Visual course completion progress indicators
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Role Management**: Add teaching assistants to courses

## Tech Stack

- **Framework**: Next.js with React
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect, useRef)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `TeacherDashboard.js`: Main component with the dashboard implementation
- Uses mock data for demonstration purposes
- Includes responsive sidebar, notifications panel, and file management

## Main Components

- **Header**: Navigation and user profile
- **Sidebar**: Course navigation and main menu
- **Content Area**: File and chapter management
- **Modals**: For file info, access control, and actions
