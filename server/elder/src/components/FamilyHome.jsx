import Navbar from "./navbar";
import { Link } from "react-router-dom";
import CareSVG from "../assets/picture.svg"; // Import your SVG file
import "../App.css";

function FamilyHome({ userType, username }) {
  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar username={username} userType={userType} />
      
      <div className="container mx-auto p-6 flex items-center">
        
        {/* Left Side - SVG Animation */}
        <div className="w-1/3 flex justify-center">
        <img 
          src={CareSVG} 
          alt="Care Animation" 
          className="w-full max-w-sm rounded-lg animated-svg"
        />
        </div>

        {/* Right Side - Content */}
        <div className="w-2/3 pl-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Personalized Care Hub</h1>

          {/* Task Overview */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">Task Management</h2>
              <p className="text-gray-700">Assign and track elderly care tasks.</p>
              <Link to="/family-task" className="text-blue-600 hover:underline">Manage Tasks</Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">Chat with Elderly</h2>
              <p className="text-gray-700">Stay connected with real-time messaging.</p>
              <Link to="/chat" className="text-blue-600 hover:underline">Go to Chat</Link>
            </div>
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">Community Forum</h2>
              <p className="text-gray-700">Help elderly users engage with others.</p>
              <Link to="/community" className="text-blue-600 hover:underline">Join Community</Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">Health & Activity Log</h2>
              <p className="text-gray-700">Monitor step counts and sleep hours.</p>
              <Link to="/health" className="text-blue-600 hover:underline">View Logs</Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">Emergency Alerts</h2>
              <p className="text-gray-700">Get notified about emergency situations.</p>
              <Link to="/alerts" className="text-blue-600 hover:underline">View Alerts</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default FamilyHome;
