import React, { useState, useMemo } from 'react';
import Button from './button.jsx';


let nextId = 0;

const TaskManager = () => {

    const [tasks, setTasks] = useState([]);


    const [newTask, setNewTask] = useState('');


    const [filter, setFilter] = useState('All');


    const addTask = (e) => {
        e.preventDefault();

        if (!newTask.trim()) return;

        const newTaskList = [
            ...tasks,
            { id: nextId++, text: newTask.trim(), completed: false },
        ];
        setTasks(newTaskList);
        setNewTask('');
    };

    const toggleTask = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const filteredTasks = useMemo(() => {
        switch (filter) {
            case 'Active':
                return tasks.filter(task => !task.completed);
            case 'Completed':
                return tasks.filter(task => task.completed);
            case 'All':
            default:
                return tasks;
        }
    }, [tasks, filter]);


    return (
        <div className="max-w-md  mx-auto grow p-4 bg-gray-700 shadow-lg rounded-lg dark:bg-white dark:text-black text-white">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Task Manager</h1>
            <form onSubmit={addTask} className="flex mb-6">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                    className="grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <Button
                    type="submit"
                    variant="success"
                    size="md"
                    disabled={!newTask.trim()}
                    className="rounded-l-none"
                >
                    Add Task
                </Button>
            </form>


            <div className="flex justify-center space-x-4 mb-6">

                {['All', 'Active', 'Completed'].map(f => (
                    <Button
                        key={f}
                        onClick={() => setFilter(f)}
                        variant={filter === f ? 'primary' : 'secondary'}
                        size="sm"
                    >
                        {f}
                    </Button>
                ))}
            </div>


            <ul className="space-y-3">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                        <li
                            key={task.id}
                            className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0 transition duration-150 hover:bg-gray-50 rounded-md"
                        >

                            <span
                                className={`grow cursor-pointer ${task.completed ? 'line-through text-gray-500' : 'text-gray-300 dark:text-gray-800'}`}
                                onClick={() => toggleTask(task.id)}
                            >
                                {task.text}
                            </span>


                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(task.id)}
                                className="mr-3 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />


                            <Button
                                onClick={() => deleteTask(task.id)}
                                variant="danger"
                                size="sm"
                                className="p-1 rounded-full text-sm font-normal"
                            >
                                Delete
                            </Button>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-gray-500 italic">
                        {tasks.length === 0 ? "You have no tasks! Start adding one." : `No ${filter.toLowerCase()} tasks.`}
                    </p>
                )}
            </ul>
        </div>
    );
}

export default TaskManager;