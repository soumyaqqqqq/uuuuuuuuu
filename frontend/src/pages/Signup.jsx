// src/Signup.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Signup.css';

const API_BASE_URL = 'http://localhost:3000';

const Signup = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(${API_BASE_URL}/places);
        setStates(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching states:", err);
        setError("Failed to load states. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchStates();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submitted", { name, password, selectedState });
  };
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const handleStateSelect = (state) => {
    setSelectedState(state);
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-300 overflow-auto">
      <div className="bg-yellow-200 rounded-xl shadow-lg p-8 w-full max-w-md border border-yellow-300 my-8">
        <h2 className="text-center text-2xl font-bold text-purple-700 mb-6">Sign up to continue</h2>
        <form onSubmit={handleSubmit}>

          {/* Name */}
          <label className="block text-sm font-semibold text-black mb-1">Name</label>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md placeholder-gray-600 focus:outline-none"
            />
            <span className="absolute right-3 top-2.5 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A8 8 0 1116.97 6.05M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
          </div>

          {/* Create Password */}
          <label className="block text-sm font-semibold text-black mb-1">Create Password</label>
          <div className="relative mb-4">
            <input
              type={showCreatePassword ? "text" : "password"}
              placeholder="Create your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md placeholder-gray-600 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowCreatePassword(!showCreatePassword)}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showCreatePassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-.681.068-1.347.2-1.988M6.21 6.21A9.963 9.963 0 002 9c0 5.523 4.477 10 10 10a9.963 9.963 0 002.79-.39m1.42-1.42A9.963 9.963 0 0022 9c0-5.523-4.477-10-10-10a9.963 9.963 0 00-2.79.39" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-6-6" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <label className="block text-sm font-semibold text-black mb-1">Confirm Password</label>
          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md placeholder-gray-600 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showConfirmPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-.681.068-1.347.2-1.988M6.21 6.21A9.963 9.963 0 002 9c0 5.523 4.477 10 10 10a9.963 9.963 0 002.79-.39m1.42-1.42A9.963 9.963 0 0022 9c0-5.523-4.477-10-10-10a9.963 9.963 0 00-2.79.39" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-6-6" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* State Dropdown */}
          <label className="block text-sm font-semibold text-black mb-1">State</label>
          <div className="relative mb-6">
            <div
              onClick={toggleDropdown}
              className="w-full px-4 py-2 border rounded-md bg-white cursor-pointer flex justify-between items-center focus:outline-none"
            >
              <span className={selectedState ? "text-black" : "text-gray-500"}>
                {selectedState || "Select your state"}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className={h-5 w-5 text-gray-500 transform transition-transform ${isDropdownOpen ? "rotate-180" : ""}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {isDropdownOpen && (
              <div className="absolute bg-white border w-full mt-1 rounded-md max-h-48 overflow-y-auto z-10">
                {loading && <div className="p-2 text-gray-500 text-center">Loading states...</div>}
                {error && <div className="p-2 text-red-500 text-center">{error}</div>}
                {!loading && !error && states.map((place, idx) => (
                  <div
                    key={idx}
                    onClick={() => { setSelectedState(place); setIsDropdownOpen(false); }}
                    className="p-2 hover:bg-yellow-100 cursor-pointer"
                  >
                    {place}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-semibold transition"
          >
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;