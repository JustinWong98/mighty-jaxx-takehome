import React, { createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Homepage from './components/Dashboard/Homepage';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import { Dashboard } from './components/Dashboard/Dashboard';
import ProductForm from './components/Product/ProductForm';
import ProductCard from './components/Product/ProductCard';
import { AuthProvider } from './components/Auth/AuthContext';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import EditProductForm from './components/Product/EditProductForm';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* <AuthProvider> */}
                <Route path="/" element={<Homepage />} />
                {/* TODO: if user web token is valid for signup and login, redirect to dashboard, if not redirect to homepage */}
                {/* <Route
                        path="/signup"
                        element={
                            <ProtectedRoute>
                                <Signup />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <ProtectedRoute>
                                <Login />
                            </ProtectedRoute>
                        }
                    /> */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/addProduct" element={<ProductForm />} />
                <Route path="/product/:id" element={<EditProductForm />} />
                {/* </AuthProvider> */}
            </Routes>
        </Router>
    );
};

export default App;
