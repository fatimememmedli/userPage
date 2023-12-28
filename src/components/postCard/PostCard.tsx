import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import "./postCard.scss";
import { useEffect } from "react";
import type { RootState } from "./../../redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import {getAllUsers,createPost} from "./../../redux/slices/userSlice"

function PostCard() {
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
    <div>
      <div className="postCard">
        <div className="user">
          <div className="user-image">
            <img
              src="https://www.perfocal.com/blog/content/images/size/w960/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg"
              alt=""
            />
          </div>
          <div className="user-name">
            <p>fatime</p>
          </div>
        </div>
        <div className="image">
          <img
            src="https://www.perfocal.com/blog/content/images/size/w960/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg"
            alt=""
          />
        </div>
        <div className="post-details">
          <div className="icons">
            <div className="icons">
              <div className="icon">
                <FontAwesomeIcon icon={faHeart} />
              </div>

              <div className="icon">
                <FontAwesomeIcon icon={faComment} />
              </div>
            </div>
          </div>
          <div className="like-count"><h3>500 likes</h3></div>
          <div className="title">
            <h3>fatime</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, amet.</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default PostCard;
