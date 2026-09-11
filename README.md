# CodeBridge

CodeBridge is a collaborative remote interview platform designed for practicing technical interviews with another developer. It combines real-time collaborative coding, video communication, chat, coding problems, session management, and browser-based code execution in one platform.

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/vivek-pruthi/Remote_Interview_Platform?utm_source=oss&utm_medium=github&utm_campaign=vivek-pruthi%2FRemote_Interview_Platform&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

---

## 🚀 Features

- 👥 Create and join collaborative interview sessions
- 💻 Real-time collaborative code editing with Monaco Editor
- 🧩 Practice curated coding problems based on difficulty
- ▶️ Execute supported programming languages directly from the browser using Judge0
- 🎥 Live video communication using Stream
- 💬 Real-time chat using Stream
- 🔐 Secure authentication using Clerk
- 📋 Track active interview sessions
- 📚 View recent session history
- ⚡ Event-driven backend workflows using Inngest
- 🗄️ MongoDB database for persistent application data
- 🐳 Docker support for containerized deployment
- 🌐 Production setup with React frontend served through the Express backend

---

## 🛠️ Tech Stack

| Area | Technologies |
| --- | --- |
| Frontend | React, Vite |
| Styling | Tailwind CSS, DaisyUI |
| Routing | React Router |
| Code Editor | Monaco Editor |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Authentication | Clerk |
| Video & Chat | Stream |
| Code Execution | Judge0 |
| Background Workflows | Inngest |
| HTTP Client | Axios |
| Deployment | Docker |

---

## 📁 Project Structure

```text
Code Bridge/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── chatController.js
│   │   │   ├── executeController.js
│   │   │   └── sessionController.js
│   │   │
│   │   ├── lib/
│   │   │   ├── db.js
│   │   │   ├── env.js
│   │   │   ├── inngest.js
│   │   │   └── stream.js
│   │   │
│   │   ├── middlewares/
│   │   │   └── protectRoute.js
│   │   │
│   │   ├── models/
│   │   │   ├── Session.js
│   │   │   └── User.js
│   │   │
│   │   ├── routes/
│   │   │   ├── chatRoutes.js
│   │   │   ├── executeRoutes.js
│   │   │   └── sessionRoutes.js
│   │   │
│   │   └── server.js
│   │
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── Pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── .dockerignore
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
```

---

# 📋 Prerequisites

Before running CodeBridge, make sure you have:

- Node.js 20 or later
- npm
- MongoDB
- Docker Desktop
- A Clerk application
- A Stream application
- An Inngest account/setup
- Internet connection for Judge0 code execution

---

# 🔑 Required Services

CodeBridge uses the following services.

### Clerk

Used for:

- User authentication
- Login and signup
- User identity management

### MongoDB

Used for:

- User data
- Interview sessions
- Session history

### Stream

Used for:

- Video calls
- Audio communication
- Real-time chat
- Participant management

### Inngest

Used for:

- Event-driven backend workflows
- User synchronization
- User deletion workflows

### Judge0

Used for:

- Programming language execution
- Compilation
- Runtime execution
- Returning program output and errors

---

# ⚙️ Local Development Setup

## 1. Clone the Repository

```bash
git clone https://github.com/vivek-pruthi/Remote_Interview_Platform.git
```

Enter the project directory:

```bash
cd Remote_Interview_Platform
```

---

## 2. Install Dependencies

Install frontend dependencies:

```bash
npm install --prefix frontend
```

Install backend dependencies:

```bash
npm install --prefix backend
```

---

# 🔐 Environment Variables

CodeBridge uses separate environment files for the frontend and backend.

Do not commit actual secret values to GitHub.

---

## Frontend Environment

Create:

```text
frontend/.env
```

Add:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_STREAM_API_KEY=your_stream_api_key
VITE_API_URL=http://localhost:5000/api
```

### Frontend Variables

| Variable | Purpose |
| --- | --- |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk frontend authentication |
| `VITE_STREAM_API_KEY` | Stream frontend connection |
| `VITE_API_URL` | Backend API URL |

For the Docker production build, use:

```env
VITE_API_URL=/api
```

This allows the frontend and backend to communicate through the same domain.

---

# Backend Environment

Create:

```text
backend/.env
```

Add:

```env
PORT=5000
NODE_ENV=development

DB_URL=your_mongodb_connection_string

CLIENT_URL=http://localhost:5173

CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

### Backend Variables

| Variable | Purpose |
| --- | --- |
| `PORT` | Backend server port |
| `NODE_ENV` | Application environment |
| `DB_URL` | MongoDB connection string |
| `CLIENT_URL` | Frontend URL allowed by CORS |
| `CLERK_PUBLISHABLE_KEY` | Clerk configuration |
| `CLERK_SECRET_KEY` | Clerk server authentication |
| `STREAM_API_KEY` | Stream API key |
| `STREAM_API_SECRET` | Stream server secret |
| `INNGEST_EVENT_KEY` | Inngest event authentication |
| `INNGEST_SIGNING_KEY` | Inngest webhook signing |

---

# ▶️ Running Locally

CodeBridge can be run using separate frontend and backend development servers.

## Start Backend

Open a terminal and run:

```bash
npm run dev --prefix backend
```

The backend will run on:

```text
http://localhost:5000
```

---

## Start Frontend

Open another terminal and run:

```bash
npm run dev --prefix frontend
```

The frontend will normally run on:

```text
http://localhost:5173
```

Open the application in your browser:

```text
http://localhost:5173
```

---

# 🐳 Docker

CodeBridge includes a multi-stage Dockerfile.

The Docker image:

1. Installs frontend dependencies
2. Builds the React frontend
3. Installs backend production dependencies
4. Copies the frontend production build into the backend image
5. Runs the Express server
6. Serves the React frontend through Express

---

## Build Docker Image

From the project root:

```bash
docker build -t codebridge .
```

---

## Run Docker Container

```bash
docker run --env-file backend/.env -p 5000:5000 codebridge
```

Then open:

```text
http://localhost:5000
```

---

# 🗄️ Docker with Local MongoDB

If MongoDB is running directly on your Windows machine while CodeBridge is running inside Docker, use `host.docker.internal` instead of `localhost`.

```bash
docker run --env-file backend/.env -e DB_URL="mongodb://host.docker.internal:27017/interview_db" -p 5000:5000 codebridge
```

This allows the Docker container to connect to MongoDB running on the host machine.

---

# 🔄 Application Architecture

```text
                    ┌──────────────────┐
                    │     Browser      │
                    │   React + Vite   │
                    └────────┬─────────┘
                             │
                             │ HTTP
                             ▼
                    ┌──────────────────┐
                    │ Express Backend  │
                    │     Node.js      │
                    └───────┬──────────┘
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
      MongoDB            Clerk             Stream
    Application       Authentication      Video + Chat
       Data
                            │
                            ▼
                         Inngest
                    Event-driven workflows

                            │
                            ▼
                         Judge0
                    Code execution service
```

---

# ▶️ Code Execution

CodeBridge uses Judge0 for browser-based code execution.

The frontend does not directly communicate with Judge0.

Instead, the frontend sends the code to the CodeBridge backend.

```text
User writes code
       ↓
Frontend
       ↓
POST /api/execute/run
       ↓
Express Backend
       ↓
Judge0
       ↓
Program execution
       ↓
Execution result
       ↓
Express Backend
       ↓
Frontend
```

---

## Supported Languages

The current backend supports:

| Language | Judge0 Language ID |
| --- | ---: |
| JavaScript | 97 |
| Java | 91 |
| Python | 109 |
| C++ | 105 |
| C | 103 |
| TypeScript | 101 |

---

# 🔐 Authentication

CodeBridge uses Clerk for authentication.

Protected backend routes use Clerk authentication middleware.

The authenticated Clerk user is matched with the corresponding user stored in MongoDB.

The relationship is based on the Clerk user ID:

```text
Clerk User
     ↓
clerkId
     ↓
MongoDB User
```

---

# 👤 User Synchronization

Inngest is used for event-driven user synchronization.

When a Clerk user is created, the backend workflow can synchronize the corresponding user with MongoDB and Stream.

The user creation workflow listens for:

```text
clerk/user.created
```

User deletion is handled through:

```text
clerk/user.deleted
```

This keeps application users synchronized with the authentication and communication services.

---

# 🎥 Video and Chat

Stream is used for real-time communication.

CodeBridge uses Stream for:

- Video interviews
- Audio communication
- Real-time chat
- Participant management

The Stream API secret is used only on the backend and must never be exposed to the frontend.

---

# 📡 API Endpoints

## Health Check

```http
GET /health
```

Used to check whether the backend server is running.

---

## Code Execution

```http
POST /api/execute/run
```

Executes code through Judge0.

Example request:

```json
{
  "language": "javascript",
  "code": "console.log(123)"
}
```

---

## Sessions

Base endpoint:

```text
/api/sessions
```

Available session routes include:

```text
POST   /api/sessions
GET    /api/sessions/active
GET    /api/sessions/my-recent
GET    /api/sessions/:id
POST   /api/sessions/:id/join
POST   /api/sessions/:id/end
```

Most session endpoints require Clerk authentication.

---

## Chat

Base endpoint:

```text
/api/chat
```

Used for chat-related functionality.

---

## Inngest

```text
/api/inngest
```

Used for Inngest events and background functions.

---

# 🏗️ Production Build

CodeBridge supports building the frontend and serving it through the Express backend.

Run:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

The Express backend serves the generated React production files.

---

# 📦 NPM Scripts

## Root

### Build

```bash
npm run build
```

Builds the frontend and prepares it for the backend production server.

### Start

```bash
npm start
```

Starts the production backend server.

---

## Frontend

### Development

```bash
npm run dev --prefix frontend
```

Starts the Vite development server.

### Build

```bash
npm run build --prefix frontend
```

Creates the production frontend build.

### Lint

```bash
npm run lint --prefix frontend
```

Runs ESLint.

---

## Backend

### Development

```bash
npm run dev --prefix backend
```

Starts the backend using Nodemon.

### Production

```bash
npm start --prefix backend
```

Starts the backend in production mode.

---

# 🌐 Deployment

CodeBridge is containerized using Docker and can be deployed on cloud platforms that support Docker-based web services.

The production deployment flow is:

```text
GitHub Repository
       ↓
Docker Build
       ↓
Docker Image
       ↓
Cloud Deployment
       ↓
Express Server
       ↓
React Frontend + Backend API
```

For production deployment, configure environment variables through the hosting platform instead of committing `.env` files to the repository.

---

# 🔒 Security Notes

Never commit environment files containing secrets.

The following files should remain private:

```text
.env
.env.*
```

Never expose or commit secret values such as:

```text
CLERK_SECRET_KEY
STREAM_API_SECRET
INNGEST_EVENT_KEY
INNGEST_SIGNING_KEY
DB_URL
```

Frontend Vite variables are bundled into the browser application.

Only public/client-safe values should use the `VITE_` prefix.

Never place backend secrets such as `CLERK_SECRET_KEY` or `STREAM_API_SECRET` in frontend environment variables.

---

# 🧪 Testing Checklist

Before deploying CodeBridge, verify:

- [ ] User signup works
- [ ] User login works
- [ ] User exists in MongoDB
- [ ] Interview session can be created
- [ ] Another user can join a session
- [ ] Video communication works
- [ ] Chat works
- [ ] Code execution works
- [ ] JavaScript execution works
- [ ] Java execution works
- [ ] Python execution works
- [ ] C execution works
- [ ] C++ execution works
- [ ] TypeScript execution works
- [ ] Session history works
- [ ] Session ending works
- [ ] `/health` endpoint works
- [ ] Docker container starts successfully
- [ ] Frontend loads from the production backend
- [ ] No secret environment variables are committed

---

# 🐛 Troubleshooting

## MongoDB Connection Error

If MongoDB is running on the host machine and CodeBridge is running inside Docker, use:

```text
mongodb://host.docker.internal:27017/interview_db
```

instead of:

```text
mongodb://localhost:27017/interview_db
```

---

## Frontend API Connection Error

For the Docker production build, use:

```env
VITE_API_URL=/api
```

This allows the frontend to communicate with the backend using the same host and port.

---

## Docker Container Not Starting

Make sure Docker Desktop is running.

Check Docker:

```bash
docker info
```

Check running containers:

```bash
docker ps
```

View container logs:

```bash
docker logs codebridge
```

---

## Port Already in Use

If port `5000` is already being used, map another host port:

```bash
docker run --env-file backend/.env -p 5001:5000 codebridge
```

Then open:

```text
http://localhost:5001
```

---

# 🤝 Contributing

Contributions are welcome.

1. Create a feature branch.
2. Keep frontend and backend changes focused.
3. Test your changes locally.
4. Run the frontend lint command.
5. Run the production build.
6. Test the Docker image when making deployment-related changes.
7. Create a pull request with a clear description of the changes.

---

# 📄 License

This project is currently distributed under the ISC license listed in `package.json`.

---

# 👨‍💻 Author

**Vivek Pruthi**

GitHub Repository:

https://github.com/vivek-pruthi/Remote_Interview_Platform

---

## ⭐ CodeBridge

A collaborative platform for practicing technical interviews through real-time coding, communication, and problem solving.
