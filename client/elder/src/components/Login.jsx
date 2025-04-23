import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

function Login({ FetchTask, setUsername , setUserType  }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault(); // Prevent default form submission
        try {
            const response = await fetch("http://localhost:8000/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const res = await response.json();
            console.log("Response JSON:", res);

            if (!response.ok) {
                console.error("Login failed:", res.message);
                toast.error(res.message || "Login failed!");
                return; 
            }

            toast.success("Login successful!", {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
            });
            

            setUsername(res.name); // Set the username in the parent component
            const userType = res.type; // Get user type from response
            console.log("User  Type:", userType);
            setUserType(userType);

            // Navigate based on user type
            if (userType === "Family") {
                navigate("/family-home");
            } else {
                navigate("/elder-home");
            }

            // Reset form fields
            setEmail("");
            setPassword("");

            if (FetchTask) FetchTask(); // Call FetchTask if provided
        } catch (error) {
            console.error("Fetch Error:", error);
            toast.error("Something went wrong!", {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
            });
        }
    }

    return (
        <div className="bg-gray-200 min-h-screen">
            {/* Navbar */}
            <nav className="bg-gradient-to-r from-black to-gray-900 p-4 flex justify-between items-center shadow-lg">
                <div className="flex items-center">
                    <img
                        src="https://t3.ftcdn.net/jpg/01/42/15/24/360_F_142152431_qZyGglnYiyCm8TF2vzXdT2giJ9uOFG9v.jpg" 
                        alt="Elderly Home Logo"
                        className="h-14 w-14 rounded-full shadow-lg object-cover"
                    />
                    <h1 className="text-white text-2xl font-bold tracking-wide ml-3">
                        Ashirvad
                    </h1>
                </div>
            </nav>

            {/* Login Form */}
            <div className="flex justify-center items-center min-h-[90vh]">
                <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Log In</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full mt-4 mb-4 px-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-accent"
                            >
                                Log In
                            </button>
                        </div>
                        <div className="mt-4 text-center">
                            <div className="-mt-[20px]">
                                <span className="text-sm text-gray-600">Don't have an account? </span>
                                <Link
                                    to="/"
                                    className="text-blue-500 hover:text-blue-700 font-semibold"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
