# Node.js + Express + MongoDB CRUD App with Session Authentication

A basic web application using Node.js, Express, MongoDB (via Mongoose), and vanilla HTML/CSS/JS that demonstrates:

- User login with session-based authentication
- Protected routes
- Full CRUD operations on user data
- Frontend and backend separation

---

## 🚀 Features

- 🔐 **Session Authentication** using `express-session`
- 🗃️ **MongoDB CRUD** via RESTful API endpoints
- 🧾 **Form-based login and data entry**
- 📁 **Public folder** for frontend HTML/CSS/JS
- ✅ Simple and clear code structure (no frameworks on frontend)

---

## 🧱 Tech Stack

- **Backend:** Node.js, Express, Mongoose, dotenv
- **Database:** MongoDB (local or MongoDB Compass)
- **Frontend:** HTML + JavaScript (fetch API)
- **Session:** express-session

---

## 📂 Project Structure
  project/
  │
  ├── models/
  │     └── User.js # Mongoose user schema
  ├── routes/
  │     ├── auth.js # Login and logout routes
  │     └── userRoutes.js # CRUD API endpoints
  ├── public/
  │     ├── login.html # Login page
  │     ├── index.html # Protected dashboard with CRUD form
  │     └── script.js # Handles fetch requests
  ├── .env # Environment variables
  ├── server.js # Main Express server
  └── README.md

---

## 🛠️ Setup Instructions

  1. **Clone the repository**
    ```bash
      git clone https://github.com/your-username/node-mongo-crud-auth.git
      cd node-mongo-crud-auth
    ```
  2. **Install dependencies**
    ```bash
      npm install
    ```
  3. **Create a .env file**
    ```bash
      MONGO_URI=mongodb://127.0.0.1:27017/userdb
      SESSION_SECRET=your_session_secret
    ```
  4. **Run MongoDB locally**
    Make sure MongoDB server is running (e.g., via MongoDB Compass or mongod CLI)

  5. **Start the server**
    ```bash
      node server.js
    ```
  6. **Open your browser**
    ```bash
      http://localhost:5000/login
    ```

---

## 👤 Default User (Optional)
 - You can insert a default user on startup by calling a script or modifying server.js to add a user if none exists.

---

## ✅ To Do / Improvements
   - 🔒 Password hashing (e.g., bcrypt)

   - 📦 Switch to JWT-based auth (optional)

   - 🧼 Form validation + error handling

   - 🌍 Deploy to Render, Railway, or Heroku

----

## 🧑‍💻 Author
   - Built with ❤️ by Ghel (Rodgel) — 2025

---