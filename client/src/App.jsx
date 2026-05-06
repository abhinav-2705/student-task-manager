import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title) return;

    await axios.post("http://localhost:5000/tasks", {
      title,
    });

    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await axios.put(`http://localhost:5000/tasks/${task._id}`, {
      completed: !task.completed,
    });

    fetchTasks();
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Student Task Manager</h1>

      <input
        type="text"
        placeholder="Enter Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          padding: "10px",
          marginRight: "10px",
          width: "250px",
        }}
      />

      <button onClick={addTask}>Add Task</button>

      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            marginTop: "15px",
            border: "1px solid gray",
            padding: "10px",
            borderRadius: "8px",
            width: "350px",
          }}
        >
          <h3
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.title}
          </h3>

          <button onClick={() => toggleComplete(task)}>
            {task.completed ? "Undo" : "Complete"}
          </button>

          <button
            onClick={() => deleteTask(task._id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;