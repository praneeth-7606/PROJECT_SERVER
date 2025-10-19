# Project Management System - Backend

Backend API for the Project & Task Management System with Gemini AI integration.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Gemini AI** - AI integration for task analysis

## Project Structure

```
server/
├── controllers/        # Request handlers
│   ├── projectController.js
│   ├── taskController.js
│   └── aiController.js
├── models/            # Database models
│   ├── Project.js
│   └── Task.js
├── routes/            # API routes
│   ├── projectRoutes.js
│   ├── taskRoutes.js
│   └── aiRoutes.js
├── services/          # Business logic
│   └── geminiService.js
├── .env              # Environment variables
├── .gitignore
├── package.json
└── server.js         # Entry point
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the server directory with the following:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/project-management
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
```

**Important:** Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Windows (if MongoDB is installed as a service)
net start MongoDB

# Or use MongoDB Atlas for cloud database
```

### 4. Run the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks

- `GET /api/tasks/project/:projectId` - Get all tasks for a project
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `PUT /api/tasks/bulk/update` - Bulk update tasks (for drag & drop)
- `DELETE /api/tasks/:id` - Delete task

### AI Features

- `GET /api/ai/summarize/:projectId` - Summarize all tasks in a project
- `POST /api/ai/ask/:projectId` - Ask questions about project tasks
- `GET /api/ai/analyze/:taskId` - Analyze a specific task

## API Usage Examples

### Create a Project

```bash
POST /api/projects
Content-Type: application/json

{
  "name": "Website Redesign",
  "description": "Complete redesign of company website"
}
```

### Create a Task

```bash
POST /api/tasks
Content-Type: application/json

{
  "title": "Design homepage mockup",
  "description": "Create initial design concepts for the homepage",
  "status": "To Do",
  "projectId": "project_id_here"
}
```

### Summarize Tasks (AI)

```bash
GET /api/ai/summarize/:projectId
```

### Ask Question (AI)

```bash
POST /api/ai/ask/:projectId
Content-Type: application/json

{
  "question": "What tasks are blocking progress?"
}
```

## Database Schema

### Project Model

```javascript
{
  name: String (required),
  description: String (required),
  createdDate: Date (default: now),
  timestamps: true
}
```

### Task Model

```javascript
{
  title: String (required),
  description: String (required),
  status: String (enum: ['To Do', 'In Progress', 'Done']),
  projectId: ObjectId (ref: 'Project'),
  order: Number,
  timestamps: true
}
```

## Features

✅ Complete CRUD operations for projects and tasks
✅ RESTful API architecture
✅ MongoDB integration with Mongoose
✅ Gemini AI integration for intelligent task analysis
✅ Task summarization
✅ Q&A about project tasks
✅ Individual task analysis
✅ Bulk update support for drag & drop functionality
✅ Error handling and validation
✅ CORS enabled for frontend integration

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## Next Steps

After setting up the backend, proceed to the frontend setup in the `client` directory.
