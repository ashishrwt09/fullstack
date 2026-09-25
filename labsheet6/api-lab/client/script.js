const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const taskListUl = document.getElementById('task-list');

async function fetchTasks() {
  loadingDiv.style.display = 'block';
  errorDiv.textContent = '';
  taskListUl.innerHTML = '';

  try {
    const response = await fetch('http://localhost:5000/api/tasks');
    if (!response.ok) {
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }
    const tasks = await response.json();
    loadingDiv.style.display = 'none';

    tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = `${task.title} - [${task.completed ? 'Completed' : 'Pending'}]`;
      taskListUl.appendChild(li);
    });
  } catch (err) {
    loadingDiv.style.display = 'none';
    errorDiv.textContent = `Fetch error: ${err.message}. Make sure server is running!`;
  }
}

fetchTasks();