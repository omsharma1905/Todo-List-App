import React, { useState } from "react";

const TaskList = ({ tasks, deleteTask, toggleComplete, editTask }) => {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");

  const startEdit = (task) => {
    setEditId(task.id);
    setEditText(task.text);
    setEditPriority(task.priority);
  };

  const saveEdit = (id) => {
    if (editText.trim() !== "") {
      editTask(id, editText, editPriority);
      setEditId(null);
      setEditText("");
      setEditPriority("Medium");
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
    setEditPriority("Medium");
  };

  return (
    <ul className="task-list">
      {tasks.length === 0 && <p>No tasks to display.</p>}

      {tasks.map((task) => (
        <li key={task.id} className={`task ${task.completed ? "completed" : ""}`}>
          <div className="task-left">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
              title="Mark Complete"
            />

            {editId === task.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <span>{task.text}</span>
            )}
          </div>

          {editId === task.id ? (
            <>
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <div className="task-actions">
                <button onClick={() => saveEdit(task.id)} title="Save">
                  <i className="fa-solid fa-check"></i>
                </button>
                <button onClick={cancelEdit} title="Cancel">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </>
          ) : (
            <>
              <span className={`priority ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
              <div className="task-actions">
                <button onClick={() => startEdit(task)} title="Edit">
                  <i className="fa-solid fa-pen"></i>
                </button>
                <button onClick={() => deleteTask(task.id)} title="Delete">
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;