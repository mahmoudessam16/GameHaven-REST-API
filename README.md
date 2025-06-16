# 🎮 GameHaven REST API

GameHaven is a fictional digital marketplace for video games. This RESTful API backend is built with **Node.js**, **Express**, and **MongoDB**, and supports core features like authentication, game catalog management, cart, and orders.

## Features

- User registration and login with JWT
- Role-based access control (admin / user)
- Game catalog CRUD (admin only)
- Cart functionality (add/remove/view)
- Order processing and order history
- Automatic stock management after orders
- Input validation & error handling

## Tech Stack

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Multer** for image uploads
- **express-validator** for input validation
- **dotenv**.

## API Endpoints Overview

| Method | Endpoint              | Description                 | Auth       |
| ------ | --------------------- | --------------------------- | ---------- |
| POST   | `/auth/register`      | Register new user           | ❌         |
| POST   | `/auth/login`         | Login and receive JWT token | ❌         |
| GET    | `/api/games`          | Get all games               | ❌         |
| GET    | `/api/games/:id`      | Get single game by ID       | ❌         |
| POST   | `/api/games`          | Create new game             | ✅ (admin) |
| PUT    | `/api/games/:id`      | Update game                 | ✅ (admin) |
| DELETE | `/api/games/:id`      | Delete game                 | ✅ (admin) |
| POST   | `/api/cart`           | Add item to cart            | ✅         |
| GET    | `/api/cart`           | Get current user's cart     | ✅         |
| DELETE | `/api/cart/:gameId`   | Remove item from cart       | ✅         |
| POST   | `/api/orders`         | Place an order (checkout)   | ✅         |
| GET    | `/api/orders/history` | View user's order history   | ✅         |

> All protected routes require `Authorization: Bearer <token>` in the header.

---

## Getting Started

### 1. Clone the project

```bash
git clone https://github.com/mahmoudessam16/GameHaven-REST-API.git
cd GameHaven-REST-API
npm install
```

### 2. Setup environment variables

Create a `.env` file based on `.env.example` and add:

```env
PORT=3000
MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
```

### 3. Start the server

```bash
npm start
```

---

## Example Postman Collection

This project includes a fully documented Postman Collection with:

- Auth requests
- Game CRUD
- Cart operations
- Order creation/history

> [🔗 Open in Postman Workspace (Team)](https://game-haven-team.postman.co/workspace/Game-Haven-Team-Workspace~85adb929-171a-499c-8652-18bbffaadeb3/collection/32613952-508fb3d3-9730-4b47-b624-2a8a938c3a8f)
