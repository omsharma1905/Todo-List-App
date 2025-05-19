import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import FilterBar from "./FilterBar";

const App = () => {
  const [theme, setTheme] = useState("dark"); // Force dark by default
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });
  const [filter, setFilter] = useState("All");

  // Load theme from localStorage OR fallback to 'dark'
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  // Save theme on change
  useEffect(() => {
    if (theme) localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks([...tasks, task]);
  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));
  const toggleComplete = (id) =>
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

  const editTask = (id, newText, newPriority) =>
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: newText, priority: newPriority }
          : task
      )
    );

  const changeTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "All") return true;
      if (filter === "Completed") return task.completed;
      if (filter === "Incomplete") return !task.completed;
      return true;
    })
    .sort((a, b) => {
      const order = { High: 1, Medium: 2, Low: 3 };
      return order[a.priority] - order[b.priority];
    });

  return (
    <div className={`app ${theme}`}>
      <h1>ToDo App</h1>
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        theme={theme}
        changeTheme={changeTheme}
      />
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
        editTask={editTask}
      />
    </div>
  );
};

export default App;