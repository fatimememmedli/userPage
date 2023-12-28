import React from 'react'
import { useParams } from 'react-router-dom';
import Navbar from "./../../components/navbar/Navbar"
import { useEffect } from 'react';
import "./followerList.scss"
import type { RootState } from "./../redux/store/store";
import {getAllUsers} from "../../redux/slices/userSlice"
import { useSelector, useDispatch } from "react-redux";
function FollowerList() {
  const dispatch = useDispatch();

  const { id } = useParams();
    console.log(id)
    useEffect(() => {
        dispatch(getAllUsers())
       }, [dispatch]);
       const users = useSelector((state: RootState) => state.users.users); 
    //    console.log(users)
    let user = users.find((elem)=> elem.id == id)
    console.log(user)
  return (
    <div>

        <Navbar/>
        <div className="FollowersList">
            <h1>{user?.username} Followers</h1>
            {user && user?.follower && user?.follower.map((element)=> {
                return  <div className="list-item">
                <div className="item-left">
                    <img src={element?.image} alt="" />
                </div>
                <div className="item-right">
                    <div className="username-btn">
                        <div className="username">
                            <h2>{element?.username}</h2>

                        </div>
                        <div className="button">
                            <button>Following</button>
                        </div>
                    </div>
                    <div className="bio">
                        <p>{element?.bio?.info}</p>
                    </div>
                </div>
            </div>
            }) }
            
            
        </div>
    </div>
  )
}

export default FollowerList