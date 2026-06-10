import { useState, useEffect } from "react";

function TodoApp() {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task,
        completed: false,
      },
    ]);

    setTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed }
          : t
      )
    );
  };

  const completedCount = tasks.filter(
    (t) => t.completed
  ).length;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Todo List</h2>

      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTask}>
        Add Task
      </button>

      <p>Total Tasks: {tasks.length}</p>

      <p>
        Completed Tasks: {completedCount}
      </p>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
        }}
      >
        {tasks.map((t) => (
          <li
            key={t.id}
            style={{
              margin: "10px",
            }}
          >
            <span
              style={{
                textDecoration: t.completed
                  ? "line-through"
                  : "none",
                color: t.completed
                  ? "green"
                  : "black",
                marginRight: "10px",
              }}
            >
              {t.text}
            </span>

            <button
              onClick={() =>
                toggleComplete(t.id)
              }
            >
              {t.completed
                ? "Undo"
                : "Complete"}
            </button>

            <button
              onClick={() =>
                deleteTask(t.id)
              }
              style={{
                marginLeft: "5px",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
