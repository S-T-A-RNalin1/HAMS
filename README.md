# HAMS
The Hostel Allocation Management System is a comprehensive web-based application designed to streamline and automate the process of managing student accommodations within educational institutions. Traditionally, hostel management relies on manual record-keeping, which is time-consuming, prone to data duplication, and highly inefficient. This project provides a centralized digital platform for administrators to manage room inventory, allocate rooms to students based on specific criteria, track fee payments, and handle maintenance requests. For students, the system offers a user-friendly portal to apply for hostel rooms, view their allocation status, submit grievances, and monitor fee dues. By digitizing these day-to-day operations, the system enhances transparency, drastically reduces administrative workload, and ensures a seamless, organized experience for both hostel staff and residents.

INTRODUCTION

The growing number of students in educational institutions makes manual hostel management an arduous task. The Hostel Allocation Management System acts as a bridge between the hostel administration and the students, ensuring smooth communication and operational efficiency.
The system operates primarily through two user roles:
1)	Admin: Has complete control over adding new hostels, defining room capacities, approving or rejecting student applications, generating fee records, and resolving complaints.
2)	Student: Can register, fill out a detailed application for hostel accommodation, view room allotment details, pay fees, and raise maintenance tickets


# Hostel Allocation Management System

A Full-Stack application built with React, Node.js, Express, and SQLite.

## How to run this project locally

### 1. Clone the Repository
Open your terminal and run these commands 1 by 1:
\`\`\`bash
1) git clone https://github.com/S-T-A-RNalin1/HAMS.git
2) cd HAMS
\`\`\`

### 2. Backend Setup
The backend uses SQLite, so you do not need to install any external database software. The database file will generate automatically when you start the server!

Open a terminal and run the following 1 by 1:
\`\`\`bash
1) cd backend
2) npm install
\`\`\`

**Environment Variables:**
Create a file named `.env` inside the `backend` folder and paste this inside:
\`\`\`env
PORT=5000
JWT_SECRET=super_secret_hostel_key_2026
\`\`\`

**Start the Server:**
\`\`\`bash
node server.js
\`\`\`
*(You should see a message saying "SQL Database (SQLite) Connected & Synced!". A new file named `hostel_database.sqlite` will appear in your folder).*

### 3. Frontend Setup
Open a second, completely new terminal window and run these 1 by 1:
\`\`\`bash
1) cd frontend
2) npm install
3) npm start
\`\`\`
The app will automatically open in your browser at `http://localhost:3000`.

### 4. Testing the App
Since the database is freshly generated on your machine, it will be empty. 
1. Click "Register" to create a test Student account.
2. Click "Register" again, create a different email, and select "Admin" to create an Admin account.
