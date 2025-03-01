# CRM - Customer Relationship Management

A simple CRM application built with **MERN Stack** (MongoDB, Express.js, React.js, Node.js) to manage customer leads.

### Features

- Add and store leads (name, phone, email).
- View all leads.
- Update lead status.

### Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** React.js (Vite)
- **Others:** CORS, dotenv, Nodemon (for development)

### Setup Instructions

### Clone the Repository
git clone https://github.com/Abhishek572002/CRM.git
cd CRM

### Backend Setup 
cd backend
npm install express dotenv cors nodemon mongoose

### Create a .env file in the backend/ directory and add:

### Setup for Frontend
cd frontend
npm install
npm run dev

### API Endpoints
Create Lead: POST /contacts
Get Leads: GET /contacts
Update Lead: PUT /contacts/:id
