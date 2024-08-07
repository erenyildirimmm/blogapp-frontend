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
import AdminLayout from "../Admin/components/AdminLayout";

// Admin Route Paths
import AdminHome from "../Admin/pages/Home/AdminHome";
import Users from "../Admin/pages/Users/Users";
import Admins from "../Admin/pages/Admins/Admins";
import Posts from "../Admin/pages/Posts/Posts";
import Categories from "../Admin/pages/Categories/Categories";


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
      path: "/users/:username",
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
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "admins",
        element: <Admins />,
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "categories",
        element: <Categories />,
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
