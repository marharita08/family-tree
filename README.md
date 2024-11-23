# Family Tree Application

An application for managing and visualizing a family tree.  
The backend is built with **Express.js**, and the frontend is powered by **React** and **Vite**.

---

## Features

- Add, update, and delete family members.
- View a complete family tree structure as an accordion menu.

---

## Backend

### Tech Stack
- **Node.js**
- **Express.js**
- **PostgreSQL**

### .env Configuration

Create a `.env` file in the root of the backend directory with the following content:

PORT=3001  
DB_HOST=localhost  
DB_PORT=5432  
DB_USER=postgres  
DB_PASSWORD=password  
DB_DATABASE=family_tree  

### API Endpoints

| Method | Endpoint            | Description                       |
|--------|---------------------|-----------------------------------|
| POST   | `/`                 | Add a new person.                |
| PUT    | `/:id`              | Update an existing person.       |
| DELETE | `/:id`              | Delete a person by ID.           |
| GET    | `/`                 | Get a list of all persons.       |
| GET    | `/family-tree`      | Retrieve the family tree.        |

---

## Frontend

### Tech Stack
- **React**
- **Vite**
- **TypeScript**

### .env Configuration

Create a `.env` file in the root of the frontend directory with the following content:

VITE_API_URL=http://localhost:3001/

## Running the Application

### Backend

1. Navigate to the backend directory:

   `cd backend`

2. Install dependencies:

   `npm install`

3. Start the server:

   `npm start`

4. The backend server will run at [http://localhost:3001](http://localhost:3001).

---

### Frontend

1. Navigate to the frontend directory:

   `cd frontend`

2. Install dependencies:

   `npm install`

3. Start the development server:

   `npm run dev`

4. Open the application in your browser at [http://localhost:5173](http://localhost:5173).
