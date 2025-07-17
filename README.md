# 🧑‍💻 User Management CRUD App (Node.js + MongoDB + HTML)

This is a full-stack **CRUD application** built with:

- **Node.js** and **Express.js** (Backend API)
- **MongoDB** and **Mongoose** (Database)
- **Vanilla HTML + JavaScript** (Frontend)

> A simple app to create, read, update, and delete users via a REST API with a clean web UI.

---

## 🚀 Features

- 📄 List all users
- ➕ Create a new user
- ✏️ Edit existing users
- ❌ Delete users
- 🧭 View users in a simple HTML table

---

## 🗂️ Project Structure

- node-mongo-crud/
- ├── models/
- │ └── User.js # Mongoose schema/model
- ├── routes/
- │ └── userRoutes.js # RESTful API routes
- ├── public/
- │ ├── index.html # Frontend UI
- │ └── script.js # Frontend JS (fetch API)
- ├── server.js # Express server + MongoDB connection
- └── README.md # Project documentation

---

## ⚙️ Prerequisites

- Node.js and npm installed
- MongoDB installed and running locally
- (Optional) MongoDB Compass to view your data

---

## 📦 Install Dependencies

```bash
npm install

```

---

## 🧠 MongoDB Connection
- This app connects to a local MongoDB database.

- Make sure MongoDB is running. Then it will connect using:

- mongodb://127.0.0.1:27017/userdb.

If you get a connection error like ECONNREFUSED ::1, use 127.0.0.1 instead of localhost.

---

## ▶️ Run the Server
```bash
node server.js
```
or
``` bash
node server.js
```

---

## 🌐 Access the Frontend
Go to your browser and open:

http://localhost:5000/index.html

You will see a simple user interface to:

Add a user

Edit a user

Delete a user

View all users


## 🧪 API Endpoints
Method	Endpoint	Description
GET	/api/users	Get all users
GET	/api/users/:id	Get a user by ID
POST	/api/users	Create a new user
PUT	/api/users/:id	Update a user
DELETE	/api/users/:id	Delete a user

---

## 🧰 Technologies Used
Node.js

Express.js

MongoDB

Mongoose

HTML5

JavaScript (fetch API)

CSS

---

## 📌 Tips
- You can expand this into a full MERN or MEAN stack project.

- Great for learning REST APIs, Express, and MongoDB with no frameworks.

- Can be deployed later using platforms like Render, Vercel, or Heroku.

---