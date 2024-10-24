import { useState, useEffect } from "react";

function App() {
  const [state, setState] = useState({
    task: "",
    tasks: [],
  });

  useEffect(() => {
    const savedTasks = sessionStorage.getItem("tasks");
    if (savedTasks) {
      setState((prevState) => ({
        ...prevState,
        tasks: JSON.parse(savedTasks),
      }));
    }
  }, []);

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      task: e.target.value,
    }));
  };

  const addTask = () => {
    if (!state.task.trim()) return;
    const newTask = { id: Date.now(), content: state.task };
    const updatedTasks = [...state.tasks, newTask];

    setState({
      task: "",
      tasks: updatedTasks,
    });

    sessionStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (id) => {
    const updatedTasks = state.tasks.filter((task) => task.id !== id);

    setState((prevState) => ({
      ...prevState,
      tasks: updatedTasks,
    }));

    sessionStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div>
      <section className="MainContainer">
        <section className="TitleC">
          <h1>Task Manager</h1>
          <h4>Control your life...</h4>
        </section>
        <section className="TaskC">
          <div className="TaskInput_Container">
            <input
              type="text"
              placeholder="New task..."
              value={state.task}
              onChange={handleChange}
            />
            <button onClick={addTask}>Add Task</button>
          </div>

          <ul className="TaskList">
            {state.tasks.map((task) => (
              <li key={task.id} className="TaskItem">
                {task.content}
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </div>
  );
}

export default App;
