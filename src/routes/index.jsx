import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";
import Home from "../pages/Home";
import EditBook from "../pages/EditBook";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import CreateBooks from "../pages/CreateBooks";
import Register from "../pages/Register";
import Profile from "../pages/Profile";

const Routes = () => {
  const { token, setToken } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <ProtectedRoute />
        </>
      ), // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/books/create",
          element: <CreateBooks />,
        },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/books/edit/:id",
          element: <EditBook />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
