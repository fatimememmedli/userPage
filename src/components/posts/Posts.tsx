import React from "react";
import PostCard from "../postCard/PostCard";
import "./Posts.scss";
import { useEffect } from "react";
import type { RootState } from "./../../redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import {getAllUsers,createPost} from "./../../redux/slices/userSlice"

function Posts() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers())
   }, [dispatch]);
   const users = useSelector((state: RootState) => state.users.users) 
   console.log(users)
   let loginID =localStorage.getItem("loginId")
   const findUser=users.find((elem)=> elem.id == loginID)
   console.log(findUser)
  return (
    <div className="postsPage">
      <div className="container">
        <div className="text">
          <p>Posts</p>
        </div>
        <div className="posts">
          
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
    </div>
  );
}

export default Posts;
