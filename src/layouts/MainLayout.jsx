import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast'; // For error/success messages

const MainLayout = () => {
    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Page Content */}
            <div className="min-h-[calc(100vh-300px)]">
                <Outlet />
            </div>

            {/* Footer */}
            <Footer />

            {/* Toast Notifications */}
            <Toaster position="top-right" />
        </div>
    );
};

export default MainLayout;