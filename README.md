AutoRentify 🚗💨

A full-stack Car Rental Web Application built using the MERN stack (MongoDB, Express, React, Node.js).
Users can browse available cars, view details, make bookings, leave reviews, and manage their rentals seamlessly.

✨ Features

🔑 User Authentication (Login & Signup)

🚘 Browse Cars with filters and details

📅 Car Booking System with date & time selection

⭐ Customer Reviews & Ratings for each car

📍 Map Integration for pickup & drop locations

📊 Admin Dashboard for managing cars & bookings

💳 Payment Integration (extendable)

🎨 Responsive UI built with React + TailwindCSS

⚡ Real-time notifications with Toast

🛠️ Tech Stack

Frontend: React, Vite, TailwindCSS, Framer Motion
Backend: Node.js, Express.js, MongoDB, Mongoose
Other: JWT Authentication, Axios, React Router

📂 Project Structure
<img width="872" height="553" alt="image" src="https://github.com/user-attachments/assets/67c118f2-d4f6-48d1-8677-dfca94418f3f" />


⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/Hemshika22/AutoRentify.git
cd AutoRentify

2. Install dependencies
For backend
cd server
npm install

For frontend
cd client
npm install

3. Environment variables

Create a .env file in the server/ folder:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
PORT=3000


For frontend (client/.env):

VITE_BASE_URL=http://localhost:5000
VITE_GOOGLE_MAPS_KEY=your_api_key   # if using Google Maps

4. Run the app
Backend
cd server
npm run dev

Frontend
cd client
npm run dev


The app will be live at: http://localhost:5173
 🎉


🙌 Credits

This project was built by following the amazing tutorials from the
GreatStack YouTube Channel
 💙

📜 License

This project is for learning purposes. You are free to modify and extend it.
