import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Homepage from './components/Dashboard/Homepage';
import Signup from './components/Login/Signup';
import Login from './components/Login/Login';
import { Dashboard } from './components/Dashboard/Dashboard';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* TODO: if user web token is valid, redirect to dashboard */}
                <Route path="/" element={<Homepage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
