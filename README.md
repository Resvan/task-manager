
# Real-Time Task Management Application

## Description
A real-time task management application with drag-and-drop functionality built using React, Node.js, and TypeScript.

## Features
- Create, edit, and delete tasks
- Drag-and-drop task management
- Real-time updates using WebSocket
- Task states: TODO, IN_PROGRESS, DONE

## Technologies
- Frontend: React, TypeScript, react-beautiful-dnd, socket.io-client, axios
- Backend: Node.js, Express, MongoDB, Mongoose, socket.io

## Setup

### Backend
1. Navigate to the backend directory:
    ```sh
    cd server
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start the server:
    ```sh
    npm run start
    ```

### Frontend
1. Navigate to the frontend directory:
    ```sh
    cd client
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start the development server:
    ```sh
    npm start
    ```

## API Endpoints
- `POST /api/auth/signup`: Register 
- `POST /api/auth/signin`: Login 
- `GET /api/user`: Get all user 
- `POST /api/file/upload-file`: Upload image
- `GET /api/porject`: Get projects
- `POST /api/porject`: Create new project
- `GET /api/porject/get-members/:id`: Get project Members
- `POST /api/add-members`: Add members to project
- `GET /api/tasks`: Get Tasks
- `GET /api/tasks/:id`: Get tasks by project





## WebSocket Events
- `project:join`: Emit when a user joined to project room
- `project:leave`: Emit when a user leave from project room
- `task:create`: Emit when a task is created
- `task:created`: Receive when a task is created
- `task:update`: Emit when a task is updated
- `task:updated`: Receive when a task is updated
- `task:delete`: Emit when a task is deleted
- `task:deleted`: Receive when a task is deleted
- `task:move`: Emit when a task is moved
- `task:moved`: Receive when a task is moved
