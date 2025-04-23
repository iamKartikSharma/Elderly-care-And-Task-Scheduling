import Navbar from "./navbar";

function ElderHome({ username,userType }) {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <Navbar username={username} userType={userType}/>
      
      <div className="max-w-5xl mx-auto p-8 space-y-8">
        
        <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-[1.02] transition-transform duration-300">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Good Morning, {username}! ☀️
          </h2>
          <p className="text-gray-600 mt-3 text-lg">Here's your daily summary:</p>
          <div className="flex justify-center gap-8 mt-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="font-semibold text-green-600">2 Tasks Completed ✅</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="font-semibold text-red-600">1 Missed Reminder ⚠️</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-semibold text-blue-600">1 Pending Order 🛒</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">📅 Daily Schedule</h3>
              <span className="text-sm text-gray-500">Today, {new Date().toLocaleDateString()}</span>
            </div>
            <ul className="space-y-3">
              <li className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg hover:from-green-100 hover:to-green-200 transition-all duration-300">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-green-600 font-medium">💊 Morning Medicine</span>
                    <p className="text-sm text-gray-600 mt-1">Blood Pressure & Vitamins</p>
                  </div>
                  <div className="text-right">
                    <span className="text-green-700 font-semibold">9:00 AM</span>
                    <p className="text-xs text-green-600">High Priority</p>
                  </div>
                </div>
              </li>
              <li className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg hover:from-amber-100 hover:to-amber-200 transition-all duration-300">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-amber-600 font-medium">🏥 Dr. Smith Appointment</span>
                    <p className="text-sm text-gray-600 mt-1">Monthly Check-up</p>
                  </div>
                  <div className="text-right">
                    <span className="text-amber-700 font-semibold">2:00 PM</span>
                    <p className="text-xs text-amber-600">15 min reminder set</p>
                  </div>
                </div>
              </li>
              <li className="bg-gradient-to-r from-rose-50 to-rose-100 p-4 rounded-lg hover:from-rose-100 hover:to-rose-200 transition-all duration-300">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-rose-600 font-medium">🛒 Weekly Shopping</span>
                    <p className="text-sm text-gray-600 mt-1">Groceries & Essentials</p>
                  </div>
                  <div className="text-right">
                    <span className="text-rose-700 font-semibold">5:00 PM</span>
                    <p className="text-xs text-rose-600">Volunteer Assigned</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">📊 Wellness Dashboard</h3>
              <span className="text-sm text-blue-500 font-medium">Daily Progress</span>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">🏃 Daily Steps</span>
                  <span className="font-bold text-blue-600">4,500 / 6,000</span>
                </div>
                <div className="h-3 bg-blue-100 rounded-full">
                  <div className="h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style={{width: '75%'}}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Great progress! 1,500 steps to go</p>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">💤 Sleep Quality</span>
                  <span className="font-bold text-purple-600">7 hrs / 8 hrs</span>
                </div>
                <div className="h-3 bg-purple-100 rounded-full">
                  <div className="h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full" style={{width: '87.5%'}}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Good sleep pattern maintained</p>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">🔥 Activity Level</span>
                  <span className="font-bold text-orange-600">300 kcal</span>
                </div>
                <div className="h-3 bg-orange-100 rounded-full">
                  <div className="h-3 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" style={{width: '60%'}}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Light exercise recommended</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Keep existing content for these sections but with enhanced styling */}
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold">🛍️ Grocery Requests</h3>
            <p className="text-gray-600 mt-2">You have a pending request for groceries.</p>
            <button className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-300">
              View Order
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold">🤝 Volunteer Help</h3>
            <p className="text-gray-600 mt-2">Need assistance? Request a volunteer for help.</p>
            <button className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300">
              Request Help
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold">💬 Chat</h3>
            <p className="text-gray-600 mt-2">Stay connected with your loved ones.</p>
            <button className="mt-4 w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transform hover:scale-105 transition-all duration-300">
              Open Chat
            </button>
          </div>
        </div>

        <div className="fixed bottom-5 right-5">
          <button className="bg-red-500 text-white px-8 py-4 rounded-full shadow-xl hover:bg-red-600 transform hover:scale-110 transition-all duration-300 text-lg font-bold">
            🚨 SOS
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Existing grid items */}
        </div>

        {/* New Testimonials Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            What Our Community Says ⭐
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/79.jpg" 
                  alt="Sarah" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Age 72</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "This platform has made my daily routine so much easier. The medication reminders are a lifesaver!"
              </p>
              <div className="mt-3 text-yellow-400">★★★★★</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/men/82.jpg" 
                  alt="Robert" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Robert Smith</h4>
                  <p className="text-sm text-gray-600">Age 68</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The volunteer help feature is wonderful. I've met some amazing people who truly care."
              </p>
              <div className="mt-3 text-yellow-400">★★★★★</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/68.jpg" 
                  alt="Mary" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Mary Davis</h4>
                  <p className="text-sm text-gray-600">Age 75</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Staying connected with my family through the chat feature brings me joy every day!"
              </p>
              <div className="mt-3 text-yellow-400">★★★★★</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500">
            Share Your Experience 📝
          </h3>
          <div className="max-w-2xl mx-auto">
            <textarea 
              className="w-full p-4 border border-emerald-100 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none h-32"
              placeholder="Tell us about your experience with our platform..."
            ></textarea>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Rate your experience:</span>
                <div className="flex text-amber-400 text-2xl">
                  {"★★★★★".split("").map((star, index) => (
                    <button key={index} className="hover:text-amber-500 transition-colors">
                      {star}
                    </button>
                  ))}
                </div>
              </div>
              <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:opacity-90 transform hover:scale-105 transition-all duration-300">
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElderHome;