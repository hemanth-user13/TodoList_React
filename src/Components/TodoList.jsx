import { useState } from "react";
import Swal from 'sweetalert2';

function TodoList() {
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("low");
    const [tasks, setTasks] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task) {
            const newTask = {
                id: Date.now(),
                task,
                priority
            };
            setTasks([...tasks, newTask]);
            setTask("");
            setPriority("low");
        }
    };

    const getPriorityColor = (priority) => {
        if (priority === "low") return "text-green-500";
        if (priority === "medium") return "text-orange-500";
        if (priority === "high") return "text-red-500";
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Deleted!", "Your task has been deleted.", "success");
                setTasks(tasks.filter((task) => task.id !== id));
            }
        });
    };

    return (
        <div className="container mx-auto p-4 max-w-lg">
            <h1 className="text-3xl text-center mb-6 font-bold">Todo List</h1>
            <div className="flex flex-col items-center">
                <form onSubmit={handleSubmit} className="w-full">
                    <label htmlFor="task-input" className="block mb-2 text-sm font-medium text-gray-700">Enter your task:</label>
                    <input
                        id="task-input"
                        type="text"
                        placeholder="Enter some task here"
                        className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-300"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <label htmlFor="priority-select" className="block mb-2 text-sm font-medium text-gray-700">Priority:</label>
                    <select
                        id="priority-select"
                        className="block w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring focus:ring-green-200 focus:border-green-300"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                        Add Task
                    </button>
                </form>
            </div>

            <div className="mt-10">
                <h2 className="text-2xl text-center font-semibold">Your Todo List</h2>
                {tasks.length > 0 ? (
                    <ul className="mt-4 space-y-4">
                        {tasks.map((item, index) => (
                            <li key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-lg font-medium">{item.task}</p>
                                        <span className={`text-sm font-semibold ${getPriorityColor(item.priority)}`}>
                                            Priority: {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                                        </span>
                                    </div>
                                    <button type="button"
                                        className="ml-4 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                                        onClick={() => handleDelete(item.id)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center mt-4 text-red-500">No tasks have been added yet.</p>
                )}
            </div>
        </div>
    );
}

export default TodoList;
