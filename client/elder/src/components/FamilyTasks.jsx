import React, { useState, useEffect } from 'react';
import Navbar from './navbar';

const FamilyTasks = ({ username, userType }) => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [selectedElder, setSelectedElder] = useState('');
  const [elders, setElders] = useState([]);
  const [importanceLevel, setImportance] = useState('');
  const [completionTime, setCompletionTime] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchTasks();
    fetchElders();
  }, []);

  const updatetasks = async (t) => {
    setTask(t.task);
    setSelectedElder(t.name);
    setImportance(t.importanceLevel);
    setCompletionTime(t.completionTime);
    setIsUpdating(true);
    
    const response = await fetch(`http://localhost:8000/family-task/tasks/${t._id}`, {
      method: 'DELETE',
      headers: { 'content-Type': 'application/json' },
    });
    
    if (response.ok) {
      fetchTasks();
    } else {
      console.error("Task not updated");
    }
  };

  const deleteTasks = async (t) => {
    const response = await fetch(`http://localhost:8000/family-task/tasks/${t._id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      fetchTasks();
    } else {
      console.error("Error in deleting the task");
    }
  };

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:8000/family-task/getfull');
    const data = await response.json();
    setTasks(data);
  };

  const fetchElders = async () => {
    const response = await fetch('http://localhost:8000/user/Elder');
    const data = await response.json();
    setElders(data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    setIsUpdating(false);

    const response = await fetch('http://localhost:8000/family-task/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task, name: selectedElder,createdby:username, importanceLevel, completionTime }),
    });

    if (response.ok) {
      fetchTasks();
      setTask('');
      setSelectedElder('');
      setImportance('');
      setCompletionTime('');
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <Navbar username={username} userType={userType} />
      <div className="max-w-6xl mx-auto p-8 space-y-8">
        {/* Header Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-[1.02] transition-transform duration-300">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Family Task Management 📋
          </h1>
          <p className="text-gray-600 mt-3">Organize and manage tasks for your loved ones</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Task Form */}
          <form onSubmit={addTask} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              {isUpdating ? "✏️ Update Task" : "➕ Add New Task"}
            </h2>
            <div className="space-y-4">
              <input 
                type="text" 
                value={task} 
                onChange={(e) => setTask(e.target.value)} 
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter task description" 
                required 
              />
              
              <select 
                value={selectedElder} 
                onChange={(e) => setSelectedElder(e.target.value)} 
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select an elder</option>
                {elders.map((elder) => (
                  <option key={elder.id} value={elder.id}>{elder.name}</option>
                ))}
              </select>

              <select 
                value={importanceLevel} 
                onChange={(e) => setImportance(e.target.value)} 
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select importance level</option>
                <option value="High">🔴 High Priority</option>
                <option value="Medium">🟡 Medium Priority</option>
                <option value="Low">🟢 Low Priority</option>
              </select>

              <div className="relative">
                <label className="block text-sm text-gray-600 mb-2">Completion Time</label>
                <input 
                  type="time" 
                  value={completionTime} 
                  onChange={(e) => setCompletionTime(e.target.value)} 
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required 
                />
              </div>

              <button 
                type="submit" 
                className={`w-full p-3 rounded-lg text-white font-semibold transform hover:scale-[1.02] transition-all duration-300 ${
                  isUpdating 
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500" 
                    : "bg-gradient-to-r from-blue-500 to-purple-500"
                }`}
              >
                {isUpdating ? "Update Task" : "Add Task"}
              </button>
            </div>
          </form>

          {/* Task List */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Active Tasks
            </h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {tasks.map((t) => (
                <div 
                  key={t.id} 
                  className={`p-5 rounded-lg transform hover:scale-[1.02] transition-all duration-300 ${
                    t.importanceLevel === 'High' 
                      ? 'bg-gradient-to-r from-red-50 to-red-100' 
                      : t.importanceLevel === 'Medium' 
                      ? 'bg-gradient-to-r from-yellow-50 to-yellow-100' 
                      : 'bg-gradient-to-r from-green-50 to-green-100'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg">{t.task}</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>👤 Assigned by: <span className="font-semibold">{username}</span></p>
                        <p>🎯 Assigned to: <span className="font-semibold">{t.name}</span></p>
                        <p>⏰ Due by: <span className="font-semibold">{t.completionTime}</span></p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          t.importanceLevel === 'High' 
                            ? 'bg-red-500 text-white' 
                            : t.importanceLevel === 'Medium' 
                            ? 'bg-yellow-500 text-white' 
                            : 'bg-green-500 text-white'
                        }`}>
                          {t.importanceLevel} Priority
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => updatetasks(t)} 
                        className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-all duration-300"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => deleteTasks(t)} 
                        className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-all duration-300"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyTasks;
