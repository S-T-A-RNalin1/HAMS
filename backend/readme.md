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