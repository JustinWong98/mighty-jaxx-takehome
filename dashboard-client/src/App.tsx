import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Homepage from './components/Dashboard/Homepage';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import { Dashboard } from './components/Dashboard/Dashboard';
import ProductForm from './components/Product/ProductForm';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* TODO: if user web token is valid, redirect to dashboard */}
                <Route path="/" element={<Homepage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/addProduct" element={<ProductForm />} />
            </Routes>
        </Router>
    );
};

export default App;
