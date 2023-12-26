import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.scss";
function Navbar() {
  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar-left">
          <div className="logo">
            <img
              src="https://www.story.agency/wp-content/uploads/2023/07/storylogo.png"
              alt=""
            />
          </div>
        </div>
        <div className="navbar-middle">
          <div className="search-input">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: "#cccccc" }}
            />
            <input type="text" />
          </div>
          <div className="create-story">
            <button>Create story</button>
          </div>
        </div>
        <div className="navbar-right">
          <div className="icons">
            <div className="icon">
              <FontAwesomeIcon icon={faHouse} />
            </div>
            <div className="icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div className="icon">
              <FontAwesomeIcon icon={faBell} />
            </div>
          </div>
          <div className="profile-info">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
