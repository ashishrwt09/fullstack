require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;

// Global Middleware
app.use(cors()); // CORS enabled
app.use(express.json());

// Custom Logger Middleware (Method, URL, Timestamp)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// Auth Middleware: requires x-api-key header
const checkApiKey = (req, res, next) => {
  const userApiKey = req.headers['x-api-key'];
  if (!userApiKey || userApiKey !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid x-api-key header' });
  }
  next();
};

// In-memory Task list (5 tasks)
let tasks = [
  { id: 1, title: 'Learn Node.js and Express', completed: true },
  { id: 2, title: 'Build REST API CRUD endpoints', completed: true },
  { id: 3, title: 'Implement Logger and Auth Middleware', completed: false },
  { id: 4, title: 'Consume API using Vanilla JS Fetch', completed: false },
  { id: 5, title: 'Build React Client with Vite', completed: false }
];

// 1. GET /api/tasks
app.get('/api/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// 2. GET /api/tasks/:id
app.get('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: `Task with ID ${taskId} not found` });
  }
  res.status(200).json(task);
});

// 3. POST /api/tasks (Protected with x-api-key)
app.post('/api/tasks', checkApiKey, (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Task title is required' });
  }
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// 4. PUT /api/tasks/:id (Protected with x-api-key)
app.put('/api/tasks/:id', checkApiKey, (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: `Task with ID ${taskId} not found` });
  }
  const { title, completed } = req.body;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  res.status(200).json(task);
});

// 5. DELETE /api/tasks/:id (Protected with x-api-key)
app.delete('/api/tasks/:id', checkApiKey, (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: `Task with ID ${taskId} not found` });
  }
  const deletedTask = tasks.splice(taskIndex, 1);
  res.status(200).json({ message: 'Task deleted successfully', task: deletedTask[0] });
});

// 404 Route Handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found on this server' });
});

// Centralized Error-Handling Middleware (4 params)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: err.status || 500,
    error: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});