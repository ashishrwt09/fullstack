import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function App() {
  // 3-state pattern (loading, error, data)
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  /*
   * DIFFERENCE BETWEEN AXIOS AND FETCH:
   * 1. Axios automatically parses JSON directly into `response.data`. In fetch, you must manually run `await response.json()`.
   * 2. Axios rejects the promise on HTTP error status codes (4xx, 5xx), whereas fetch only rejects on network failures and requires checking `response.ok`.
   */
  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Create Task (POST)
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await axios.post(
        API_URL,
        { title: newTitle },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
          }
        }
      );
      setTasks(prev => [...prev, res.data]);
      setNewTitle('');
    } catch (err) {
      alert(`Error creating task: ${err.response?.data?.error || err.message}`);
    }
  };

  // Delete Task (DELETE)
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { 'x-api-key': API_KEY }
      });
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      alert(`Error deleting task: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '500px' }}>
      <h2>Task Manager Mini App</h2>

      <form onSubmit={handleAddTask} style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="New task..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ padding: '8px', width: '70%' }}
        />
        <button type="submit" style={{ padding: '8px 12px', marginLeft: '8px' }}>
          Add Task
        </button>
      </form>

      {/* Button to test graceful 404 response */}
      <button 
        onClick={() => handleDeleteTask(9999)} 
        style={{ marginBottom: '16px', background: '#ffcccc', padding: '6px 12px' }}
      >
        Test Delete Fake ID (9999)
      </button>

      {loading && <p style={{ color: 'blue' }}>Loading tasks...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

     <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li
            key={task.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0',
              borderBottom: '1px solid #ddd'
            }}
          >
            <span>{task.title}</span>
            <button
              onClick={() => handleDeleteTask(task.id)}
              style={{ color: 'red', cursor: 'pointer', padding: '4px 8px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
