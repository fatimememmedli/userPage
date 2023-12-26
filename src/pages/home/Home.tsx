import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "../login/Login";
import type { RootState } from "./../redux/store/store";
import { getAllUsers } from "../../redux/slices/userSlice";
import axios from "axios";

import { UserStateType } from "../../redux/slices/userSlice";
import FollowingPosts from "../followingPosts/FollowingPosts";
import Navbar from "../../components/navbar/Navbar";
import Stories from "../../components/storiess/Stories";
import Posts from "../../components/posts/Posts";

function Home() {
  const dispatch = useDispatch();
  const [data, setdata] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios("http://localhost:5000/users", {
      headers: {
        Authorization: `barear ${token}`,
      },
    }).then((res) => {
      setdata(res.data);
    });
  }, []);

  const users = useSelector((state: RootState) => state.users.users);
  console.log(users);
  const isLogin: boolean = useSelector(
    (state: UserStateType) => state.users.isLogin
  );
  console.log(isLogin);
  return (
    <div>
      <Navbar />
      <Stories />
      <Posts />
      {/* {isLogin ? (
        <div>
          home
          <ul>
            {data &&
              data.map((elem, i) => {
                return <li key={i}>{elem.username}</li>;
              })}
          </ul>
        </div>
      ) : (
        <Login />
      )} */}
    </div>
  );
}

export default Home;
