import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";
import moment from "moment";
import Navbar from "./navbar"; 

function HealthTracker() {
  const [healthData, setHealthData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [newEntry, setNewEntry] = useState({ date: "", heartRate: "", bp: "", weight: "", height: "" });
  const [bmi, setBmi] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  // Calculate BMI dynamically
  useEffect(() => {
    if (newEntry.weight && newEntry.height) {
      const heightInMeters = newEntry.height / 100;
      const calculatedBmi = (newEntry.weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(calculatedBmi);
    } else {
      setBmi("");
    }
  }, [newEntry.weight, newEntry.height]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEntry.date || !newEntry.heartRate || !newEntry.bp || !newEntry.weight || !newEntry.height) return;

    const newHealthData = [...healthData, { 
      date: newEntry.date, 
      heartRate: parseInt(newEntry.heartRate), 
      bp: parseInt(newEntry.bp),
      weight: parseFloat(newEntry.weight),
      height: parseFloat(newEntry.height),
      bmi: parseFloat(bmi)
    }];
    
    setHealthData(newHealthData);
    setNewEntry({ date: "", heartRate: "", bp: "", weight: "", height: "" });
  };

  // Group BMI Data by Week
  useEffect(() => {
    const weeklyBMI = {};
    
    healthData.forEach((entry) => {
      const week = moment(entry.date).startOf("isoWeek").format("YYYY-MM-DD");
      if (!weeklyBMI[week]) {
        weeklyBMI[week] = { week, totalBMI: 0, count: 0 };
      }
      weeklyBMI[week].totalBMI += entry.bmi;
      weeklyBMI[week].count += 1;
    });

    const formattedData = Object.values(weeklyBMI).map((week) => ({
      week: week.week,
      avgBMI: (week.totalBMI / week.count).toFixed(2),
    }));

    setWeeklyData(formattedData);
  }, [healthData]);

  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar /> {/* ✅ Navbar Added Here */}

      <div className="p-6">
        <h1 className="text-2xl font-bold text-center text-black-800">Health & Activity Logs</h1>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="bg-white p-6 max-w-md mx-auto mt-6 shadow-lg rounded-lg">
          <label className="block mb-2 text-gray-700">Date:</label>
          <input type="date" name="date" value={newEntry.date} onChange={handleChange} className="w-full p-2 mb-4 border rounded-lg" required />

          <label className="block mb-2 text-gray-700">Heart Rate (bpm):</label>
          <input type="number" name="heartRate" value={newEntry.heartRate} onChange={handleChange} className="w-full p-2 mb-4 border rounded-lg" required />

          <label className="block mb-2 text-gray-700">Blood Pressure (mmHg):</label>
          <input type="text" name="bp" value={newEntry.bp} onChange={handleChange} className="w-full p-2 mb-4 border rounded-lg" required />

          <label className="block mb-2 text-gray-700">Weight (kg):</label>
          <input type="number" name="weight" value={newEntry.weight} onChange={handleChange} className="w-full p-2 mb-4 border rounded-lg" required />

          <label className="block mb-2 text-gray-700">Height (cm):</label>
          <input type="number" name="height" value={newEntry.height} onChange={handleChange} className="w-full p-2 mb-4 border rounded-lg" required />

          {/* Display Calculated BMI */}
          {bmi && (
            <p className="text-lg font-semibold text-blue-600">BMI: {bmi} 
              <span className="text-sm text-gray-700 ml-2">
                {bmi < 18.5 ? " (Underweight)" :
                bmi >= 18.5 && bmi <= 24.9 ? " (Normal weight)" :
                bmi >= 25 && bmi <= 29.9 ? " (Overweight)" :
                " (Obese)"}
              </span>
            </p>
          )}

          <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg w-full hover:bg-blue-700 mt-4">Add Entry</button>
        </form>

        {/* Health Chart */}
        <div className="mt-8 bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Health Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={healthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="heartRate" stroke="#ff7300" strokeWidth={2} />
              <Line type="monotone" dataKey="bp" stroke="#387908" strokeWidth={2} />
              <Line type="monotone" dataKey="bmi" stroke="#007bff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly BMI Report */}
        <div className="mt-8 bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Weekly BMI Progression</h2>
          {weeklyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgBMI" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">No weekly BMI data available. Add more entries to see trends.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HealthTracker;
