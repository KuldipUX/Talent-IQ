# TalentIQ – Remote Technical Interview Platform

**TalentIQ** is a full-stack remote technical interview platform designed to simplify and streamline technical hiring. It provides a unified environment where interviewers and candidates can conduct live coding interviews through video communication, real-time chat, and a collaborative code editor.

The platform integrates multiple services to deliver an interactive interview experience, allowing candidates to solve coding problems while interviewers monitor their progress and evaluate their solutions.

## 🚀 Key Features

- **Authentication & Authorization:** Secure user authentication and session access management using Clerk.
- **Interview Management:** Interviewers can create coding interview sessions, select problems, and share session links with candidates.
- **Real-Time Video Interviews:** Integrated video communication using Stream Video.
- **Live Chat:** Real-time communication between interviewers and candidates using Stream Chat.
- **Collaborative Code Editor:** Monaco Editor provides a browser-based coding environment with syntax highlighting and multiple programming language support.
- **Real-Time Code Synchronization:** Socket.IO synchronizes code changes between interview participants.
- **Code Execution & Evaluation:** HackerEarth API integration enables code compilation and execution against programming problems.
- **Dashboard:** Displays user information, interview sessions, and relevant activity statistics.
- **Background Workflows:** Inngest handles background events and interview-related lifecycle operations.

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- DaisyUI
- React Router
- TanStack React Query
- Monaco Editor
- Socket.IO Client
- Stream Video & Chat SDK
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- Clerk Authentication
- Stream Node SDK
- HackerEarth API
- Inngest

## 🏗️ System Architecture

TalentIQ follows a full-stack client-server architecture with external integrations for authentication, communication, and code execution.

```text
             ┌──────────────────────┐
             │       TalentIQ       │
             │   React Frontend     │
             └──────────┬───────────┘
                        │
             ┌──────────▼───────────┐
             │    Express Server   │
             │     REST APIs       │
             └──────────┬───────────┘
                        │
          ┌─────────────┼──────────────┐
          │             │              │
    ┌─────▼────┐  ┌─────▼─────┐  ┌────▼─────┐
    │ MongoDB  │  │ Socket.IO │  │  Clerk   │
    │ Database │  │ Real-time │  │   Auth   │
    └──────────┘  │   Events  │  └──────────┘
                  └───────────┘

          External Integrations
          ┌─────────────────────┐
          │ Stream Video & Chat │
          │ HackerEarth API     │
          │ Inngest             │
          └─────────────────────┘
```

## 🔄 Interview Workflow

1. **Authentication:** Interviewers and candidates authenticate through Clerk.
2. **Session Creation:** The interviewer creates an interview session and selects a coding problem.
3. **Candidate Joining:** The candidate joins the interview through the shared session.
4. **Live Communication:** Both participants communicate using integrated video and chat.
5. **Collaborative Coding:** Candidates write code in Monaco Editor while code changes are synchronized using Socket.IO.
6. **Code Evaluation:** Submitted code is sent for compilation and execution through the HackerEarth integration.
7. **Interview Assessment:** The interviewer can observe the candidate's coding progress and evaluate their performance.

## ⚙️ Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB
- Clerk account
- Stream account
- HackerEarth API access
- Inngest account/configuration

### Installation

1. Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

2. Navigate to the project directory:

```bash
cd TalentIQ
```

3. Install dependencies in the frontend and backend directories:

```bash
npm install
```

4. Configure the required environment variables for MongoDB, Clerk, Stream, HackerEarth, and Inngest.

5. Start the backend and frontend using their respective development scripts:

```bash
npm run dev
```

*Note: Run the commands from the respective application directories and configure environment variables according to the project implementation.*

## 🧠 Engineering Concepts Explored

Building TalentIQ involved working with several important full-stack engineering concepts:

- Designing RESTful APIs using Node.js and Express.
- Managing application data using MongoDB and Mongoose.
- Implementing authentication and authorization.
- Building real-time communication using WebSockets and Socket.IO.
- Synchronizing collaborative code editor changes.
- Integrating third-party APIs and SDKs.
- Managing asynchronous operations and background workflows.
- Structuring a full-stack application with modular components and services.

## 🔮 Future Improvements

- Improve collaborative editing synchronization and conflict handling.
- Introduce stronger recovery mechanisms for interrupted connections.
- Add detailed interview analytics and performance reports.
- Improve scalability for concurrent interview sessions.
- Introduce enhanced monitoring and error logging.

## 👨‍💻 Author

**Kuldip Singh**

- GitHub: [@KuldipUX](https://github.com/KuldipUX)

---

*TalentIQ – Making technical interviews more collaborative, interactive, and accessible.*
