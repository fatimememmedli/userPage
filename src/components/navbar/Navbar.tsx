import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import type { RootState } from "./../../redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import {getAllUsers,createPost} from "./../../redux/slices/userSlice"
import { searchUser } from "./../../redux/slices/userSlice";
import "./Navbar.scss";
function Navbar() {
  const [newPostLink, setNewPostLink] = useState<string>("");
  const [newPostTitle, setPostTitle] = useState("");
  const [value, setValue] = useState<string>("");
  const [post, setPost] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [listArr, setListArr] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let loginId = localStorage.getItem("loginId")
  useEffect(() => {
    dispatch(getAllUsers())
   }, [post]);
   const style = {
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
  const users = useSelector((state: RootState) => state.users.users) 
 

  
let arr = users.filter((elem)=> elem.username.toLowerCase().includes(value.toLowerCase()))
let loginUser = users.find((element)=> element.id==loginId)
  console.log("navbar post",loginUser)
  
  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar-left">
          <Link to="/">
          <div className="logo">
            <img
              src="https://www.story.agency/wp-content/uploads/2023/07/storylogo.png"
              alt=""
            />
          </div>
          </Link>
        </div>
        <div className="navbar-middle">
          <div className="search-input">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: "#cccccc" }}
            />
            <input onChange={(e)=>{
              setValue(e.target.value)
            }} type="text" />

            {value ? 
            <div className="search-list">
            {arr && arr.map((elem)=>{
              return  <Link  key={uuidv4()} style={{textDecoration:"none",color:"black" }} to={"/userProfile/"+ elem.id }>
              <div className="list">
              <div className="list-left">
                <img src={elem?.image} alt="" />
              </div>
              <div className="list-right">
                <p>{elem.username}</p>
              </div>
            </div>
              </Link>
            })}
           

          </div> : null
          
          }
          </div>
          <div className="create-story">
          <div>
      <Button onClick={handleOpen}>Create Post</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Post
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div style={{display:"flex", flexDirection:"column", gap:"10px", alignItem:"center"
        
      }}>
        <input
     placeholder="link"
        onChange={(e)=>{
          setNewPostLink(e.target.value)
        }}   style={{padding:"2px 10px", outline:"none", fontSize:"large", borderRadius:"4px"}} type="text" />
        <input
        placeholder="title"
         onChange={(e)=>{
          setPostTitle(e.target.value)
        }}  style={{padding:"2px 10px", outline:"none", fontSize:"large", borderRadius:"4px"}}  type="text" />
        <button onClick={()=>{
          const obj = {
            id:uuidv4(),
            imgSRC:newPostLink,
            title:newPostTitle
          }
          const send = {
            loginId:loginId,
            newPost:obj
          }
         dispatch(createPost(send))
         setPost((state)=>!state)
         handleClose()
        }} style={{padding:"10px 30px", width:"max-content", border:"none", backgroundColor:"#e84d66ff", color:"white",borderRadius:"10px" }} >Create</button>
        </div>
          </Typography>
        </Box>
      </Modal>
    </div>
          </div>
        </div>
        <div className="navbar-right">
          <div className="icons">
            <div className="icon">
              <FontAwesomeIcon icon={faHouse} />
            </div>
            <div className="icon">
            <Link to="/direct">
            <FontAwesomeIcon icon={faEnvelope} />
            </Link>
              
            </div>
            <div className="icon">
              <FontAwesomeIcon icon={faBell} />
            </div>
          </div>
          <Link to="/profile">
          <div className="profile-info">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt=""
            />
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
