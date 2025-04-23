import React, { useState, useEffect } from "react";
import Navbar from "./navbar";

const ElderTasks = ({ username, userType }) => {
  const [tasks, setTasks] = useState([]);
  const [dailySteps, setDailySteps] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [requestTask, setRequestTask] = useState("");
  const [familyMembers, setFamilyMembers] = useState([]);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState("");

  useEffect(() => {
    fetchTasks();
    fetchHealthData();
    fetchFamilyMembers();
  }, []);

  const fetchTasks = async () => {
    console.log("Fetching tasks...");
    const response = await fetch(`http://localhost:8000/family-task/get/${username}`);
    const data = await response.json();
    console.log("Tasks fetched:", data);
    setTasks(data);
  };

  const fetchHealthData = async () => {
    const response = await fetch("http://localhost:8000/elder-health-data");
    const data = await response.json();
    setDailySteps(data.steps);
    setCaloriesBurned(data.calories);
  };

  const fetchFamilyMembers = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/family");
      const data = await response.json();
      console.log("Family members fetched:", data);
      setFamilyMembers(data);
    } catch (error) {
      console.error("Error fetching family members:", error);
    }
  };

  const requestNewTask = async () => {
    if (requestTask.trim() === "" || selectedFamilyMember === "") {
      alert("Please enter a task and select a family member.");
      return;
    }

    const response = await fetch("http://localhost:8000/request-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        elder: username, 
        familyMember: selectedFamilyMember, 
        task: requestTask 
      }),
    });

    if (response.ok) {
      alert("Task request sent to family member.");
      setRequestTask("");
      setSelectedFamilyMember("");
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <Navbar username={username} userType={userType} />
      <div className="max-w-6xl mx-auto p-8 space-y-8">
        {/* Welcome Header */}
        <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-[1.02] transition-transform duration-300 mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Task Management & Health Tracking 📋
          </h2>
          <p className="text-gray-600 mt-3 text-lg">Stay organized and healthy with your daily activities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Health Data & Request Task */}
          <div className="space-y-6">
            {/* Health Dashboard */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">📊 Health Dashboard</h2>
                <span className="text-sm text-blue-500 font-medium">Today's Progress</span>
              </div>
              
              <div className="space-y-6">
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">🚶 Daily Steps</span>
                    <span className="font-bold text-blue-600">{dailySteps}</span>
                  </div>
                  <div className="h-3 bg-blue-100 rounded-full">
                    <div 
                      className="h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" 
                      style={{width: `${(dailySteps/10000)*100}%`}}
                    ></div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">🔥 Calories Burned</span>
                    <span className="font-bold text-orange-600">{caloriesBurned} kcal</span>
                  </div>
                  <div className="h-3 bg-orange-100 rounded-full">
                    <div 
                      className="h-3 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" 
                      style={{width: `${(caloriesBurned/2000)*100}%`}}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Request Task Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4">🤝 Request Assistance</h3>
              <select
                value={selectedFamilyMember}
                onChange={(e) => setSelectedFamilyMember(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              >
                <option value="">Select a Family Member</option>
                {familyMembers.map((member) => (
                  <option key={member._id} value={member.username}>
                    {member.name}
                  </option>
                ))}
              </select>

              <textarea
                value={requestTask}
                onChange={(e) => setRequestTask(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32 mb-4"
                placeholder="Describe what you need help with..."
              />

              <button
                onClick={requestNewTask}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 transform hover:scale-105 transition-all duration-300"
              >
                Send Request
              </button>
            </div>
          </div>

          {/* Right Side - Task List */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">📝 Your Tasks</h2>
              <span className="text-sm text-purple-500 font-medium">{tasks.length} Active Tasks</span>
            </div>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className="bg-gradient-to-r p-5 rounded-lg transform hover:scale-[1.02] transition-all duration-300"
                  style={{
                    background: t.importanceLevel === "High"
                      ? "linear-gradient(to right, #fee2e2, #fecaca)"
                      : t.importanceLevel === "Medium"
                      ? "linear-gradient(to right, #fef3c7, #fde68a)"
                      : "linear-gradient(to right, #d1fae5, #a7f3d0)"
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{t.task}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      t.importanceLevel === "High"
                        ? "bg-red-500 text-white"
                        : t.importanceLevel === "Medium"
                        ? "bg-yellow-500 text-white"
                        : "bg-green-500 text-white"
                    }`}>
                      {t.importanceLevel}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">⏰ Due: {t.completionTime}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElderTasks;
