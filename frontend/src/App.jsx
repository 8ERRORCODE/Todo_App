import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
const API_URL = 'http://127.0.0.1:8000/tasks/';
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]); 
  const [title, setTitle] = useState('');  
  const [loading, setLoading] = useState(false); 

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);  
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data); 
    } catch (error) {
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title }),
      });

      if (response.ok) {
        setTitle('');
        fetchTasks(); 
      } else {
        console.error('Failed to create task');
      }
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []); 

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/tasks/${id}/`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };


  return (
    <div className='container'>
      <h1 className='task-list'>Task List</h1>
      <form onSubmit={handleSubmit}>
        <input className='cin'
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
        />
        <button className='btn' type="submit">Add Task</button>
      </form>

      {loading && <p>Loading tasks...</p>}
      
      <ul className='tasks'>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id}>
              <p>Task: {task.title}</p>
              <p>Is Completed: ⌚</p>
              <button onClick={() => handleDelete(task.id)} className='delete-btn'>
                Delete
              </button>
            </li>
          ))
        ) : (
          <li>No tasks found</li>
        )}
      </ul>
    </div>
  );
}
export default App
