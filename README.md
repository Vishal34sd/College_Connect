# Task Tracker — MERN Stack

A production-ready Task Tracker web application built with the MERN stack (MongoDB, Express, React, Node.js). 
This app includes full CRUD capabilities, sorting, searching, pagination, dark mode, toast notifications, and form validation using Zod.

## Features

- **Frontend**: React, Vite, Tailwind CSS v3, React Router, React Hot Toast, Zod, Axios.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Zod.
- **Dark Mode**: Fully supported with local storage persistence.
- **Validation**: Shared Zod schemas used on both frontend and backend.
- **Filtering & Search**: Server-side filtering by status/priority and searching by title.
- **Pagination & Sorting**: Efficient database queries for pagination and dynamic sorting (including custom priority sorting).
- **Responsive UI**: Glassmorphism design system using Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB instance running locally or via MongoDB Atlas

### Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment variables:
   ```bash
   cp .env.example .env
   ```
   *Make sure `MONGODB_URI` points to your active database.*
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment variables:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

Once both the server and client are running, you can access the frontend at `http://localhost:5173`. The application provides an intuitive interface to add, edit, delete, and view tasks with real-time updates.
