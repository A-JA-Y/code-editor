import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { FaGear } from 'react-icons/fa6';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
// import Logout from './components/Logout';
import Profile from './components/Profile';
// import Navbar from './components/Navbar.jsx';
function App() {
  return (
    <Router>
      <div className="App bg-gray-100 dark:bg-gray-900 min-h-screen">
        
          <nav className="flex justify-between items-center bg-gray-800 p-4 relative">
            <div className="text-white font-bold text-xl">CodeEditor</div>
            <button className=" hover:rotate-90 text-white font-bold  rounded transition-all duration-300">
              <FaGear />
            </button>
          </nav>
        

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <h1>Protected Page</h1>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
