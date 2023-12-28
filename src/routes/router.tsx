import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Direct from "../pages/direct/Direct";
import MyProfile from "../pages/myProfile/MyProfile";
import UserProfile from "../pages/userProfile/UserProfile";
import FollowerList from "../pages/followerList/FollowerList";

import FollowingPage from "./../pages/followingList/FollowingPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/direct",
    element: <Direct />,
  },
  {
    path: "/profile",
    element: <MyProfile />,
  },
  {
    path: "/userProfile/:id",
    element: <UserProfile />,
  },
  {
    path: "/userFollower/:id",
    element: <FollowerList />,
  },
  {
    path: "/userFollowing/:id",
    element: <FollowingPage />,
  },
]);
