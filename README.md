# HAMS
The Hostel Allocation Management System is a comprehensive web-based application designed to streamline and automate the process of managing student accommodations within educational institutions. Traditionally, hostel management relies on manual record-keeping, which is time-consuming, prone to data duplication, and highly inefficient. This project provides a centralized digital platform for administrators to manage room inventory, allocate rooms to students based on specific criteria, track fee payments, and handle maintenance requests. For students, the system offers a user-friendly portal to apply for hostel rooms, view their allocation status, submit grievances, and monitor fee dues. By digitizing these day-to-day operations, the system enhances transparency, drastically reduces administrative workload, and ensures a seamless, organized experience for both hostel staff and residents.

INTRODUCTION

The growing number of students in educational institutions makes manual hostel management an arduous task. The Hostel Allocation Management System acts as a bridge between the hostel administration and the students, ensuring smooth communication and operational efficiency.
The system operates primarily through two user roles:
1)	Admin: Has complete control over adding new hostels, defining room capacities, approving or rejecting student applications, generating fee records, and resolving complaints.
2)	Student: Can register, fill out a detailed application for hostel accommodation, view room allotment details, pay fees, and raise maintenance tickets


# Hostel Allocation Management System

## How to run this project locally

### 1. Database Setup
1. Create a free MongoDB Atlas account at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a free M0 cluster.
3. Under Security, set up a Database User (username and password) and allow Network Access from `0.0.0.0/0`. Type exactly this IP address
4. Click Connect -> Drivers -> Node.js and copy your connection string.

### 2. Backend Setup
Open a terminal and run the following:
\`\`\`bash
cd backend
npm install
\`\`\`
1. Rename the `.env.example` file to `.env`.
2. Open the new `.env` file and replace the `MONGO_URI` placeholder with your actual MongoDB connection string.
3. Start the server:
\`\`\`bash
node server.js
\`\`\`

### 3. Frontend Setup
Open a second, completely new terminal window and run:
\`\`\`bash
cd frontend
npm install
npm start
\`\`\`
The app will automatically open in your browser at `http://localhost:3000`.
