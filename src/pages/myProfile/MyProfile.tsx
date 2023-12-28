import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import "./myProfile.scss"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { RootState } from "./../redux/store/store";
import {getAllUsers} from "../../redux/slices/userSlice"
import { useSelector, useDispatch } from "react-redux";
import { editBio } from '../../redux/slices/userSlice';
import { useNavigate } from "react-router-dom";
function MyProfile() {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 const [edit, setEdit] = useState<boolean>(false);
    const loginId = localStorage.getItem("loginId")
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllUsers())
       }, [edit]);
       const users = useSelector((state: RootState) => state.users.users); 
       console.log(users);
       let findLogin = users.find((element)=> element.id ==loginId)
       console.log(findLogin)
      
       const stylee = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      const [infoValue, setInfoValue] = useState<string>(findLogin?.bio?.info);
      const [countryValue, setCountryValue] = useState<string>(findLogin?.bio?.country);
      console.log(infoValue)
  return (
    <div>

        <Navbar/>
        <div className="profilePage">
            <div className="profile-info">
                <div className="info-left">
                    <img src={findLogin?.image} alt="" />
                </div>
                <div className="info-right">
                    <div className="username-editBtn">
                        <div className="name"><p>{findLogin?.username}</p></div>
                        <div className="edit-btn">
                        <div>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box  sx={stylee}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Bio
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div style={{display:"flex", flexDirection:"column", gap:"10px", alignItem:"center"
        
        }}>
          <input
          value={infoValue}
          onChange={(e)=>{
            setInfoValue(e.target.value)
          }}   style={{padding:"2px 10px", outline:"none", fontSize:"large", borderRadius:"4px"}} type="text" />
          <input onChange={(e)=>{
            setCountryValue(e.target.value)
          }} value={countryValue}  style={{padding:"2px 10px", outline:"none", fontSize:"large", borderRadius:"4px"}}  type="text" />
          <button onClick={()=>{
            const obj = {
              info:infoValue,
              country:countryValue
            }
            const send = {
              loginId:loginId,
              newBio: obj
            }
            dispatch(editBio(send))
            handleClose()
            setEdit((state)=> !state)
          }} style={{padding:"10px 30px", width:"max-content", border:"none", backgroundColor:"#e84d66ff", color:"white",borderRadius:"10px" }} >Edit</button>
          </div>
          </Typography>
        </Box>
      </Modal>
    </div>



                            
                        </div>

                    </div>
                    <div className="post-followers-following">
                       <div className="count">
                       <p>{findLogin?.posts.length}</p> <span>posts</span>
                       </div>
                       <Link style={{textDecoration:"none",color:"black" }} to={"/userFollower/" + findLogin?.id}>
                       <div className="count">
                        <p>{findLogin?.follower.length}</p> <span>followers</span>
                       </div>
                       </Link>
                       <Link style={{textDecoration:"none",color:"black" }} to={"/userFollowing/" + findLogin?.id}>
                       <div className="count">
                        <p>{findLogin?.following.length}</p> <span>following</span>
                       </div>
                       </Link>
                      
                    </div>
                    <div className="name-surname">
                        <p>
                        {findLogin?.bio?.info}
                        </p>
                    </div>
                </div>
            </div>
            <div className="posts">
                <div className="postTitle">
                    <h1>My Posts</h1>
                </div>
                <div className="images">
                {findLogin && findLogin?.posts && findLogin?.posts.map((photo)=> {
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

export default MyProfile