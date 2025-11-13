import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'; // Import TanStack Query

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
import ErrorPage from './pages/ErrorPage.jsx'; // 404 Page
import PrivateRoute from './routes/PrivateRoute.jsx';

// Create a client for TanStack Query
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />, // Add 404 page 
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/all-reviews", element: <AllReviews /> }, // Public page [cite: 88]
      {
        path: "/add-review",
        element: <PrivateRoute><AddReview /></PrivateRoute> // Protected [cite: 78]
      },
      {
        path: "/my-reviews",
        element: <PrivateRoute><MyReviews /></PrivateRoute> // Protected [cite: 91]
      },
      {
        path: "/update-review/:id", // Route for editing
        element: <PrivateRoute><UpdateReview /></PrivateRoute>,
        loader: ({ params }) => params.id // Pass the ID to the page
      },
      {
        path: "/my-favorites",
        element: <PrivateRoute><MyFavorites /></PrivateRoute> // Protected [cite: 104]
      }
    ]
  },
]);

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {/* Provide both Auth and Query clients to the app */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);