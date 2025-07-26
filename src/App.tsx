import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Register from "./routes/Register";
import About from "./routes/About";
import RootLayout from "./routes/layouts/RootLayout";

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
        element: <Login />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
