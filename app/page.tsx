"use client";

import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Home() {

  const [tasks, setTasks] = useState([
    {
      name: "Finish React dashboard",
      status: "Completed",
    },
    {
      name: "Connect AI API",
      status: "In Progress",
    },
    {
      name: "Create analytics page",
      status: "Pending",
    },
  ]);

  const [newTask, setNewTask] = useState("");

  const [filter, setFilter] = useState("All");

  const [darkMode, setDarkMode] = useState(false);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
const [editingText, setEditingText] = useState("");

  useEffect(() => {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    setTasks(JSON.parse(savedTasks));
  }
}, []);

useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

  const addTask = () => {

    if (newTask.trim() === "") return;

    const task = {
      name: newTask,
      status: "Pending",
    };

    setTasks([...tasks, task]);

    setNewTask("");
  };

const updateTask = () => {
  if (editingIndex === null || editingText.trim() === "") return;

  const updatedTasks = tasks.map((task, index) =>
    index === editingIndex
      ? { ...task, name: editingText }
      : task
  );

  setTasks(updatedTasks);
  setEditingIndex(null);
  setEditingText("");
};

const changeTaskStatus = (taskIndex: number) => {
  const updatedTasks = tasks.map((task, index) => {
    if (index !== taskIndex) return task;

    const nextStatus =
      task.status === "Pending"
        ? "In Progress"
        : task.status === "In Progress"
        ? "Completed"
        : "Pending";

    return {
      ...task,
      status: nextStatus,
    };
  });

  setTasks(updatedTasks);
};

const filteredTasks =
  filter === "All"
    ? tasks
    : tasks.filter((task) => task.status === filter);

    const chartData = [
  {
    status: "Pending",
    tasks: tasks.filter((task) => task.status === "Pending").length,
  },
  {
    status: "In Progress",
    tasks: tasks.filter((task) => task.status === "In Progress").length,
  },
  {
    status: "Completed",
    tasks: tasks.filter((task) => task.status === "Completed").length,
  },
];

  return (
    <main
  className={
    darkMode
  ? "min-h-screen bg-gray-900 text-white flex flex-col md:flex-row"
  : "min-h-screen bg-gray-100 text-gray-900 flex flex-col md:flex-row"
  }
>

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-blue-600 text-white p-6">

        <h1 className="text-2xl font-bold mb-10">
          AI Dashboard
        </h1>

        <nav className="space-y-4">
          <p>Dashboard</p>
          <p>Tasks</p>
          <p>Analytics</p>
          <p>Settings</p>
        </nav>

      </aside>

      {/* Main Content */}
      <section className="flex-1 p-4 md:p-8">

        <h1 className={darkMode ? "text-4xl font-bold text-white" : "text-4xl font-bold text-gray-800"}>
          AI Productivity Dashboard
        </h1>

        <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
  Monitor your productivity and task progress
</p>
        <button
  onClick={() => setDarkMode(!darkMode)}
  className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
>
  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <div
  className={
    darkMode
      ? "bg-gray-800 rounded-2xl shadow-md p-6"
      : "bg-white rounded-2xl shadow-md p-6"
  }
>
            <h2 className="text-xl font-semibold">
              Tasks Completed
            </h2>

            <p className="text-4xl font-bold text-green-600 mt-4">
  {tasks.filter(task => task.status === "Completed").length}
</p>
          </div>

          <div
  className={
    darkMode
      ? "bg-gray-800 rounded-2xl shadow-md p-6"
      : "bg-white rounded-2xl shadow-md p-6"
  }
>
            <h2 className="text-xl font-semibold">
              Pending Tasks
            </h2>

            <p className="text-4xl font-bold text-yellow-500 mt-4">
  {tasks.filter(task => task.status !== "Completed").length}
</p>
          </div>

          <div
  className={
    darkMode
      ? "bg-gray-800 rounded-2xl shadow-md p-6"
      : "bg-white rounded-2xl shadow-md p-6"
  }
>
            <h2 className="text-xl font-semibold">
              Productivity
            </h2>

            <p className="text-4xl font-bold text-blue-600 mt-4">
            {tasks.length === 0
  ? "0%"
  : `${Math.round(
      (tasks.filter(task => task.status === "Completed").length / tasks.length) * 100
    )}%`}
            </p>
          </div>

        </div>

        <div
  className={
    darkMode
      ? "bg-gray-800 rounded-2xl shadow-md p-6 mt-10 text-white"
      : "bg-white rounded-2xl shadow-md p-6 mt-10 text-gray-900"
  }
>
  <h2 className="text-2xl font-bold mb-6">
    Task Analytics
  </h2>

  <div className="h-80">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <XAxis dataKey="status" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar
  dataKey="tasks"
  fill={darkMode ? "#3B82F6" : "#2563EB"}
/>
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

{/* Add Task */}

<div
  className={
    darkMode
      ? "bg-gray-800 rounded-2xl shadow-md p-6 mt-10 text-white"
      : "bg-white rounded-2xl shadow-md p-6 mt-10 text-gray-900"
  }
>
  <h2 className="text-2xl font-bold mb-4">
    Add New Task
  </h2>

  <div className="flex flex-col md:flex-row gap-4">

    <input
  type="text"
  placeholder="Add New Task"
  value={newTask}
  onChange={(e) => setNewTask(e.target.value)}
  className={
    darkMode
      ? "flex-1 p-4 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-300"
      : "flex-1 p-4 rounded-lg border border-gray-300 bg-white text-black placeholder-gray-500"
  }
/>

    <button
      onClick={addTask}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
    >
      Add
    </button>

  </div>

</div>

        {/* Recent Tasks */}

<div
  className={
    darkMode
      ? "bg-gray-800 rounded-2xl shadow-md p-6 mt-10 text-white"
      : "bg-white rounded-2xl shadow-md p-6 mt-10 text-gray-900"
  }
>
  <h2 className="text-2xl font-bold mb-6">
    Recent Tasks
  </h2>

  <div className="flex flex-wrap gap-3 mb-6">
    {["All", "Pending", "In Progress", "Completed"].map((status) => (
      <button
        key={status}
        onClick={() => setFilter(status)}
        className={
          filter === status
            ? "bg-blue-600 text-white px-4 py-2 rounded-lg"
            : "bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
        }
      >
        {status}
      </button>
    ))}
  </div>

  <div className="space-y-4">

    {filteredTasks.map((task, index) => (

      <div
        key={index}
        className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-3 gap-4"
      >

        <div className="flex items-center gap-4 flex-wrap">

          {editingIndex === index ? (
            <input
              type="text"
              className={
                darkMode
                  ? "border border-gray-600 bg-gray-700 text-white rounded-lg p-2"
                  : "border rounded-lg p-2"
              }
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
            />
          ) : (
            <p>{task.name}</p>
          )}

          <button
            onClick={() => {

              const updatedTasks = tasks.filter(
                (_, taskIndex) => taskIndex !== index
              );

              setTasks(updatedTasks);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
          >
            Delete
          </button>

          <button
            onClick={() => {
              setEditingIndex(index);
              setEditingText(task.name);
            }}
            className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
          >
            Edit
          </button>

          {editingIndex === index && (
            <button
              onClick={updateTask}
              className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
            >
              Save
            </button>
          )}

          <button
            onClick={() => changeTaskStatus(index)}
            className="bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700"
          >
            Change Status
          </button>

        </div>

        <span
          className={
            task.status === "Completed"
              ? "text-green-600 font-semibold"
              : task.status === "In Progress"
              ? "text-yellow-500 font-semibold"
              : "text-red-500 font-semibold"
          }
        >
          {task.status}
        </span>

      </div>

    ))}

  </div>

</div>

      </section>

    </main>
  );
}
