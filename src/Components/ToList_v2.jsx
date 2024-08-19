import React, { useState } from "react";


function App() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");
  const [columns, setColumns] = useState({
    todo: { name: "To Do", items: [] },
    inProgress: { name: "In Progress", items: [] },
    completed: { name: "Completed", items: [] },
    reviewed: { name: "Reviewed", items: [] },
  });

  // Handle form submission
  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskTitle) {
      const newTask = {
        id: new Date().getTime(),
        title: taskTitle,
        priority: taskPriority,
        status: "To Do", // Task status initially set to "To Do"
      };

      setColumns((prevColumns) => ({
        ...prevColumns,
        todo: { ...prevColumns.todo, items: [...prevColumns.todo.items, newTask] },
      }));

      // Clear form
      setTaskTitle("");
      setTaskPriority("Medium");
    }
  };

  // Handle drag start
  const onDragStart = (e, taskId, columnId) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("columnId", columnId);
  };

  // Handle drop
  const onDrop = (e, columnId) => {
    const taskId = e.dataTransfer.getData("taskId");
    const sourceColumnId = e.dataTransfer.getData("columnId");

    const taskToMove = columns[sourceColumnId].items.find(
      (item) => item.id === parseInt(taskId)
    );

    // Update the task's status based on the column it's dropped into
    const updatedTask = { ...taskToMove, status: columns[columnId].name };

    // Remove task from source column
    const sourceColumnItems = columns[sourceColumnId].items.filter(
      (item) => item.id !== parseInt(taskId)
    );

    // Add task to destination column
    setColumns((prevColumns) => ({
      ...prevColumns,
      [sourceColumnId]: { ...prevColumns[sourceColumnId], items: sourceColumnItems },
      [columnId]: { ...prevColumns[columnId], items: [...prevColumns[columnId].items, updatedTask] },
    }));
  };

  // Handle drag over
  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Task Submission Form */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4">Add a Task</h2>
        <form onSubmit={handleAddTask} className="flex space-x-4">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Task Title"
            className="p-2 border rounded w-64"
          />
          <select
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </form>
      </div>

      {/* Task Columns */}
      <div className="grid grid-cols-4 gap-6">
        {Object.entries(columns).map(([columnId, column]) => (
          <div
            key={columnId}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, columnId)}
            className="bg-white p-4 rounded-lg shadow-md min-h-[400px]"
          >
            <h2 className="font-bold text-lg mb-4 text-center">{column.name}</h2>
            <div>
              {column.items.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, task.id, columnId)}
                  className="p-4 mb-4 bg-gray-200 rounded-lg shadow-md"
                >
                  <p className="font-bold text-lg">{task.title}</p>
                  <p className="text-sm text-gray-600">Priority: {task.priority}</p>
                  <p className="text-sm text-gray-500 italic">Status: {task.status}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
