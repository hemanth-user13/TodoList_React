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
            }
            setTasks([...tasks, newTask]);
            setTask("");
            setPriority("low");
            console.log(task)
            console.log(tasks)
        }
    };




    const getPriorityColor = (priority) => {
        if (priority === "low") return "text-green-500"
        if (priority === "medium") return "text-orange-500";
        if (priority === "high") return "text-red-500"
    }

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
    }

    return (
        <div>
            <h1 className="text-4xl text-center mb-14">Welcome to the Todo List Page</h1>
            <div className="flex align-center justify-center">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Enter your task:</label>
                    <input
                        type="text"
                        placeholder="Enter some task here"
                        className="ml-4"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <label className="ml-4">Priority:</label>
                    <select
                        className="ml-2"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <div className="ml-4 flex align-middle justify-center">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-1 mt-2">
                            Add Task
                        </button>
                    </div>
                </form>
            </div>

            <div className="mt-10">
                <h2 className="text-2xl text-center">Your Todo List</h2>
                {tasks.length > 0 ? (
                    <ul className="mt-4">
                        {tasks.map((item, index) => (
                            <li key={index} className="mt-2">
                                <div className="flex align-middle justify-center text-2xl">
                                    <span className="font-semibold text-center text-green-600 ">Task:</span><p className="ml-8">{item.task}{" "}</p>
                                    <span className={`font-semibold ml-4 ${getPriorityColor(item.priority)}`}>| Priority:</span> {item.priority}
                                    <button type="button"
                                        className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
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
