import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Logout from './components/Logout';
import Profile from './components/Profile';
import Navbar from './components/Navbar.jsx';
function App() {
  return (
    <Router>
      <div className="App">
        <nav>
        <Navbar />
          {/* <Logout /> */}
        </nav>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <div>
              <h1>Home Page</h1>
            </div>
          } />
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