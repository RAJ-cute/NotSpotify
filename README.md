# 🎵 NotSpotify

A simple full-stack music streaming application built with the MERN stack.

Users can browse songs and albums, while artists can upload songs and create albums.

> ⚠️ This project is currently under development. Many features are still not implemented and will be added as we move forward.

---

# Features

### Authentication

* User registration
* User login
* Logout
* JWT-based authentication
* Role-based access control

### Artist Features

* Add songs
* Create albums

### User Features

* View all songs
* View all albums
* View songs inside an album

---

# Tech Stack

## Frontend

* React
* Vite
* React Router DOM
* Axios

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs

---

# Folder Structure

```text
notSpotify
│
├── client
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── src
│   ├── controllers
│   ├── db
│   ├── middlewares
│   ├── models
│   ├── routes
│   └── app.js
│
├── server.js
├── package.json
├── .gitignore
└── README.md
```

---

# API Routes

## Authentication

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

### Logout

```http
POST /api/auth/logout
```

---

## Music

### Get all songs

```http
GET /api/music
```

### Add song (Artist only)

```http
POST /api/music/add
```

### Create album (Artist only)

```http
POST /api/music/album
```

### Get all albums

```http
GET /api/music/albums
```

### Get album by ID

```http
GET /api/music/albums/:albumId
```

---

# Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# Installation

### Clone the repository

```bash
git clone https://github.com/RAJ-cute/NotSpotify.git
```

### Backend Setup

```bash
npm install
```

### Frontend Setup

```bash
cd client
npm install
```

---

# Running the Project

### Start Backend

```bash
node server.js
```

### Start Frontend

```bash
cd client
npm run dev
```

---

# Future Improvements

* Refresh Tokens
* Token Blacklisting
* Password Reset
* Email Verification
* Search Songs
* Playlists
* Favorites
* Like Songs
* Album Covers
* Delete Songs
* Update Songs
* Recently Played
* Artist Analytics

---

# Status

🚧 Work in Progress

This project is being built gradually while learning full-stack development.
