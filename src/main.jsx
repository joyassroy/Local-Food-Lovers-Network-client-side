import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import './index.css';
import AuthProvider from './contexts/AuthProvider.jsx';

// Import all your pages
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AddReview from './pages/AddReview.jsx';
import AllReviews from './pages/AllReviews.jsx';
import MyReviews from './pages/MyReviews.jsx';
import UpdateReview from './pages/UpdateReview.jsx';
import MyFavorites from './pages/MyFavorites.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import ReviewDetails from './pages/ReviewDetails.jsx'; // <-- 1. IMPORT THE NEW PAGE


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/all-reviews", element: <AllReviews /> },
      {
        path: "/review/:id", 
        element: <ReviewDetails /> 
      },
      {
        path: "/add-review",
        element: <PrivateRoute><AddReview /></PrivateRoute>
      },
      {
        path: "/my-reviews",
        element: <PrivateRoute><MyReviews /></PrivateRoute>
      },
      {
        path: "/update-review/:id",
        element: <PrivateRoute><UpdateReview /></PrivateRoute>
      },
      {
        path: "/my-favorites",
        element: <PrivateRoute><MyFavorites /></PrivateRoute>
      }
    ]
  },
]);

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);