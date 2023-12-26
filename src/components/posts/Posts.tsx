import React from "react";
import PostCard from "../postCard/PostCard";
import "./Posts.scss";
function Posts() {
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
