import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";
import { useFormik } from "formik";
import type { RootState } from "./../redux/store/store";
import  axios  from "axios";
import Swal from 'sweetalert2'
import { login } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import {getAllUsers} from "../../redux/slices/userSlice"

import { useSelector, useDispatch } from "react-redux";
interface valuesType {
  username: string;
  password: string;
}
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // const users = useSelector((state: RootState) => state.users.users); 
  // console.log(users);
  // useEffect(() => {
  //  dispatch(getAllUsers())
  // }, [dispatch]);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values: valuesType) => {
      console.log(values);
      axios.post("http://localhost:5000/login",values).then((res)=>{
        console.log(res.data)
localStorage.setItem("token", res.data)

        if(res.status==201){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${res.data}`,
            footer: '<a href="#">Why do I have this issue?</a>'
          });
         
        }
        if(res.status==200){
          Swal.fire(`Wellcome`);
          dispatch(login(true))
          navigate("/")
        }
      })

    },
  });
  return (
    <div className="Loginpage">
      <div className="box">
        <div className="box-left">
          <h1>Login</h1>

          <form onSubmit={formik.handleSubmit}>
            <div className="inputs">
              <div className="input">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                <div className="input">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </div>
              </div>
            </div>
            <div className="button">
              <button type="submit">Sign in</button>
            </div>
          </form>

          <div className="register-info">
            <p>Don't have an account?</p>
            <Link style={{ color: "#8052CC" }} to="/register">
              Register
            </Link>
          </div>
        </div>
        <div className="box-right">
          <h1>Hey Welcome back!</h1>
        </div>
      </div>
    </div>
  );
}

export default Login;
