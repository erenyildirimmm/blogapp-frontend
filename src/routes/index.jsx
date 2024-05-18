import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";
import Home from "../pages/Home/Home";
import Navbar from "../components/Navbar";
import Register from "../pages/Register";
import Profile from "../pages/Profile/Profile";
import PostDetail from "../pages/PostDetail/PostDetail";
import CreateBooks from "../pages/CreateBooks/CreateBooks";

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
      path: "/books/:id",
      element: (
        <>
          <Navbar />
          <PostDetail />
        </>
      ),
    },
    {
      path: "/profile/:id",
      element: (
        <>
          <Navbar />
          <Profile />
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
          element: <CreateBooks isEdit={true} />,
        },
        {
          path: "/profile/:id",
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
