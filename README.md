# 007 CRM

A full-stack customer relationship management app built with the MERN stack. Add contacts, search and filter the directory, update contact statuses, and remove contacts.

## Features

- Create, view, update, and delete contacts
- Search by name, email, or company
- Filter contacts by status
- Validate required fields and prevent duplicate email addresses
- Store contacts in MongoDB Atlas
- Responsive React interface

## Built with

- **MongoDB Atlas** — cloud database
- **Express** and **Node.js** — backend API
- **React** — frontend
- **Mongoose** — MongoDB models and validation

## Project structure

```text
.
├── backend/
│   ├── config/        # MongoDB connection
│   ├── models/        # Contact schema
│   ├── routes/        # CRM API routes
│   ├── .env.example   # Backend environment variable template
│   └── server.js      # Express server
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/  # Calls to the backend API
│   │   └── App.js
│   └── .env.example   # Frontend environment variable template
└── README.md
```

## Prerequisites

Install [Node.js](https://nodejs.org/) and npm. You’ll also need a MongoDB Atlas account and a database connection URI.

## Run locally

### 1. Get the project

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

Replace the URL with your GitHub repository URL.

### 2. Configure the environment files

In PowerShell, from the project root:

```powershell
Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.example frontend/.env
```

Open `backend/.env` and add your MongoDB Atlas URI:

```env
PORT=4000
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER.mongodb.net/crm?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:3000
```

Keep the real URI private. **Never commit `.env` files or database credentials to GitHub.**

The frontend `.env` should contain:

```env
REACT_APP_API_URL=http://localhost:4000/api/clients
```

### 3. Install dependencies

Open a terminal in the project root and install the backend dependencies:

```bash
cd backend
npm install
```

Open a second terminal in the project root and install the frontend dependencies:

```bash
cd frontend
npm install
```

### 4. Start the app

In the backend terminal:

```bash
cd backend
npm run dev
```

In the frontend terminal:

```bash
cd frontend
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The API runs at [http://localhost:4000](http://localhost:4000).

## API

Base URL: `http://localhost:4000/api/clients`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/clients` | Get all contacts |
| `GET` | `/api/clients/:id` | Get one contact |
| `POST` | `/api/clients` | Create a contact |
| `PATCH` | `/api/clients/:id` | Update a contact |
| `DELETE` | `/api/clients/:id` | Delete a contact |

Example request to create a contact:

```json
{
  "nom": "Nora El Idrissi",
  "email": "nora@example.com",
  "entreprise": "Nova Conseil",
  "telephone": "+33 6 12 34 56 78"
}
```

New contacts default to the `prospect` status. Allowed statuses are `prospect`, `client`, and `inactif`.

## Deploy

The frontend and backend can be deployed as separate Vercel projects from the same GitHub repository.

### Backend project

- Set the Vercel **Root Directory** to `backend`.
- Add the `MONGODB_URI` environment variable.
- After deploying the frontend, add `FRONTEND_URL` with the frontend’s production URL and redeploy the backend.

### Frontend project

- Set the Vercel **Root Directory** to `frontend`.
- Add `REACT_APP_API_URL` with the backend’s production URL followed by `/api/clients`.

Configure MongoDB Atlas network access so the deployed backend can connect. Do not use real customer information for a class project.

## Security

- Keep real credentials in local `.env` files and Vercel environment variables.
- Do not commit `.env` files, passwords, or private connection strings.
- The MongoDB URI belongs on the backend only; frontend environment variables are visible in the browser.

## License

This project was created for educational purposes.