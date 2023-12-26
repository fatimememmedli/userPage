import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import "./postCard.scss";
function PostCard() {
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
          <div className="title">
            <p>title</p>
          </div>
          <div className="icons">
            <div className="icons">
              <div className="icon">
                <FontAwesomeIcon icon={faHeart} />
                <span>500</span>
              </div>

              <div className="icon">
                <FontAwesomeIcon icon={faComment} />
                <span>500</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
