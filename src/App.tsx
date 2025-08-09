import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Register from "./routes/Register";
import About from "./routes/About";
import Dashboard from "./routes/Dashboard";
import UserInfoSetup from "./routes/UserInfoSetup";
import Profile from "./routes/Profile";
import Search from "./routes/Search";
import RootLayout from "./routes/layouts/RootLayout";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import UserInfoGuard from "./components/shared/UserInfoGuard";
import AuthRedirect from "./components/shared/AuthRedirect";

import { AuthProvider } from "./contexts/AuthContext";
import ErrorBoundary from "./components/shared/ErrorBoundary";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: (
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          ),
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/register",
          element: (
            <AuthRedirect>
              <Register />
            </AuthRedirect>
          ),
        },
        {
          path: "/profile/:username",
          element: <Profile />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute>
              <UserInfoGuard>
                <Dashboard />
              </UserInfoGuard>
            </ProtectedRoute>
          ),
        },
        {
          path: "/user-info-setup",
          element: (
            <ProtectedRoute>
              <UserInfoSetup />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
