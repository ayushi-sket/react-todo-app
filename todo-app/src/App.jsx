import Header from "./components/Header";
import Footer from "./components/Footer";
import TaskCard from "./components/TaskCard";
import Counter from "./components/Counter";
import TodoApp from "./components/TodoApp";

function App() {
  const tasks = [
    "Study React",
    "Complete Assignment",
    "Practice JavaScript",
    "Read Documentation",
    "Build Todo App",
  ];

  return (
    <div>
      <Header />

      <Counter />

      <TodoApp />

      <h2 style={{ textAlign: "center" }}>Tasks Using Props</h2>

      {tasks.map((task, index) => (
        <TaskCard key={index} title={task} />
      ))}

      <Footer />
    </div>
  );
}

export default App;
