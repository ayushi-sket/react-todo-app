import { useState, useEffect } from "react";

function TodoApp() {
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const editTask = (id) => {
    const updatedText = prompt("Edit Task");

    if (!updatedText || updatedText.trim() === "") return;

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: updatedText }
          : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="todo-container">
      <h2 className="todo-title">📝 Todo Application</h2>

      <div style={{ textAlign: "center" }}>
        <input
          className="todo-input"
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button
          className="add-btn"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>

      <div className="filter-section">
        <button
          className="filter-btn"
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className="filter-btn"
          onClick={() =>
            setFilter("completed")
          }
        >
          Completed
        </button>

        <button
          className="filter-btn"
          onClick={() =>
            setFilter("pending")
          }
        >
          Pending
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="empty-msg">
          No Tasks Available 🚀
        </p>
      ) : (
        <ul className="todo-list">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="todo-item"
            >
              <span
                className={
                  task.completed
                    ? "completed"
                    : ""
                }
              >
                {task.text}
              </span>

              <div className="btn-group">
                <button
                  className="complete-btn"
                  onClick={() =>
                    toggleComplete(task.id)
                  }
                >
                  {task.completed
                    ? "Undo"
                    : "Complete"}
                </button>

                <button
                  className="edit-btn"
                  onClick={() =>
                    editTask(task.id)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteTask(task.id)
                  }
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoApp;
