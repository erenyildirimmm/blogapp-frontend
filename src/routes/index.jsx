import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";
import Home from "../pages/Home/Home";
import Navbar from "../components/Navbar";
import Register from "../pages/Register";
import Profile from "../pages/Profile/Profile";
import PostDetail from "../pages/PostDetail/PostDetail";
import CreateBooks from "../pages/CreateBooks/CreateBooks";
import NotFound from "../pages/NotFound";
import AdminHome from "../Admin/pages/Home/AdminHome";

const Routes = () => {
  const { token, setToken, role } = useAuth();

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
      path: "/books/:slug",
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
      element: (
        <>
          <Navbar />
          <div>About Us</div>
        </>
      ),
    },
    {
      path: "/contact",
      element: (
        <>
          <Navbar />
          <div>Contact</div>
        </>
      ),
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
          element: <CreateBooks isEdit={false} />,
        },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/books/edit/:slug",
          element: <CreateBooks isEdit={true} />,
        },
        {
          path: "/profile/:username",
          element: <Profile />,
        },
      ],
    },
  ];

  const routesForSuperadmin = [
    {
      path: "/admin",
      element: <AdminHome />,
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
    ...(role === "superadmin" ? routesForSuperadmin : []),
    ...routesForAuthenticatedOnly,
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
