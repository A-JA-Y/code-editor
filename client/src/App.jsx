import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <div className="bg-gray-200 text-center">
                <div className="flex justify-between items-center bg-gray-800 p-4 relative">
                  <div className="text-white font-bold text-xl">CodeEditor</div>

                  <button className="bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded-full shadow-md hover:shadow-lg">
                    Signin/Signup
                  </button>
                </div>

                <h1 className="text-gray-800">
                  Welcome to the Browser-Based Code Editor
                </h1>
                <p className="text-gray-600">
                  Please{' '}
                  <a href="/register" className="text-blue-500 hover:underline">
                    register
                  </a>{' '}
                  or{' '}
                  <a href="/login" className="text-blue-500 hover:underline">
                    login
                  </a>{' '}
                  to continue.
                </p>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
