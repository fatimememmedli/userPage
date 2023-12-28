import React from 'react'
import Navbar from "../../components/navbar/Navbar"
import "./userProfile.scss"
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { RootState } from "./../redux/store/store";
import {getAllUsers} from "../../redux/slices/userSlice"
import { useSelector, useDispatch } from "react-redux";
import { setFollowers } from '../../redux/slices/userSlice';
import { setFollowing } from '../../redux/slices/userSlice';
import { Link } from 'react-router-dom';
function UserProfile() {
    let loginId:string = localStorage.getItem("loginId")
    const [follow, setFollow] = useState<boolean>(false);

    console.log(loginId)
  const dispatch = useDispatch();

  const { id } = useParams();

  console.log(id)


  useEffect(() => {
   dispatch(getAllUsers())
  }, [follow]);
  const users = useSelector((state: RootState) => state.users.users); 
  console.log(users);
  let user = users.find((elem)=> elem.id == id)
  console.log(user)
let findLogin = users.find((element)=> element.id ==loginId)
console.log(findLogin)
let findFollow = findLogin?.following.find((elem)=> elem?.id == user?.id)

console.log(findFollow)
  return (
    <div>
        <Navbar/>
         <div className="UserprofilePage">
            <div className="profile-info">
                <div className="info-left">
                    <img src={user?.image} alt="" />
                </div>
                <div className="info-right">
                    <div className="username-editBtn">
                        <div className="name"><p>{user?.username}</p></div>
                        <div className="edit-btn">


                            {findFollow|| follow ? <button className='unfollow'>Unfollow</button>: user?.id==loginId ? null  : <button className='follow' onClick={()=>{
                                setFollow(true)
                                const obj:object = {
                                    userId:user.id,
                                    login:findLogin
                                }
                                const obj2:object = {
                                    loginId: loginId,
                                    send:user
                                }
                                dispatch(setFollowers(obj))
                                dispatch(setFollowing(obj2))

                            }}>Follow</button>  }
                
                            
                        </div>

                    </div>
                    <div className="post-followers-following">
                       <div className="count">
                       <p>5</p> <span>posts</span>
                       </div>
                       <Link style={{textDecoration:"none",color:"black" }} to={"/userFollower/" + user?.id}>
                       <div className="count">
                        <p>{user?.follower.length}</p> <span>followers</span>
                       </div>
                       </Link>
                       <Link style={{textDecoration:"none",color:"black" }} to={"/userFollowing/" + user?.id}>
                       <div className="count">
                        <p>{user?.following.length}</p> <span>following</span>
                       </div>
                       </Link>
                      
                    </div>
                    <div className="name-surname">
                        <p>
                        {user?.bio?.info}
                       
                        
                        </p>
                        <p> {user?.bio?.country}</p>
                    </div>
                </div>
            </div>
            <div className="posts">
                <div className="postTitle">
                    {user?.posts ? <h1>Posts</h1> : <h1>No Posts yet</h1> }
                </div> 
                <div className="images">
                    {user && user?.posts && user?.posts.map((photo)=> {
                        return <div className="image">
                        <img src={photo.imgSRC} alt="" />
                    </div>
                    })}
               
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserProfile