# GigFlow — Smart Leads Management System

> A modern, full-stack Lead Management Dashboard designed to help teams capture, track, and manage leads efficiently with role-based access, analytics, and export capabilities.

---

## Overview

**GigFlow** is a scalable **MERN stack SaaS-style dashboard** that simplifies lead tracking and management. It provides a centralized system for handling leads, improving sales workflows, and enabling data-driven decisions through a clean analytics interface.

Built with **TypeScript, React, Node.js, and MongoDB**, the system is optimized for performance, maintainability, and real-world business use cases.

---

## Key Features

### Authentication & Security
- JWT-based authentication
- Secure password handling
- Role-based access control (Admin / User)
- Protected API routes

### Lead Management
- Create, update, and delete leads
- Status tracking (New / In Progress / Converted / Rejected)
- Advanced filtering & search
- Pagination support for large datasets

### Dashboard & Insights
- Lead summary statistics
- Status-based analytics
- Clean and responsive UI dashboard

### Data Export
- Export leads as CSV for reporting
- Backend-powered data transformation using `json2csv`

### Developer Experience
- Modular and scalable architecture
- TypeScript support (frontend + backend)
- RESTful API design
- Redux Toolkit state management

---

### Architecture

Frontend (React + Vite + Redux)
↕
REST API (Express.js + TypeScript)
↕
Database (MongoDB + Mongoose)


---

## Tech Stack

### Frontend
- React.js (Vite)
- TypeScript
- Redux Toolkit
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JSON Web Token (JWT)
- json2csv (Export utility)


---

## Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/soumen-github-account/lead-management-dashboard.git
cd lead-management-dashboard
```

### 2. Backend Setup

```bash
cd server
npm install
```

### Create .env file:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

### Run server:
npm run dev

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev 
```

## API  Overview

Auth
Method	Endpoint	        Description
POST	/api/auth/register	Register user
POST	/api/auth/login	    Login user

Leads
Method	Endpoint	Description
GET	    /api/leads	Get all leads
POST	/api/leads	Create lead
PUT	   /api/leads/:id	Update lead
DELETE	/api/leads/:id	Delete lead

Export
Method	Endpoint	            Description
GET	   /api/leads/export/csv	Export leads CSV

### Security Model
- JWT authentication for API access
- Middleware-protected routes
- Role-based authorization (Admin vs Sales)
- Secure environment variable handling

### Future Roadmap
- Real-time notifications (Socket.io)
- Email automation system
- Advanced analytics dashboard
- Team management & permissions
- Cloud deployment optimization

## Author

Soumen Das

GitHub: https://github.com/soumen-github-account

⭐ Support

If you like this project:

⭐ Star the repository
🍴 Fork it
🛠️ Contribute improvements
🧠 Notes

This project is built as a full-stack internship-level production simulation, focusing on real-world architecture, scalability, and maintainability.