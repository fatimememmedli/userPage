import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk<
  Array<object>,
  void,
  { state: UserStateType }
>("getAllUsers", async () => {
  const response = await axios.get("http://localhost:5000/users");
  // console.log(response.data);
  return response.data;
});
export interface UserStateType {
  users: object[];
  filterUsers:object[];
  isLogin: boolean;
  error: string;
  loading: boolean;
}

const initialState: UserStateType = {
  users: [],
  filterUsers:[],
  isLogin: true,
  error: "",
  loading: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    login: (state, action) => {
      // console.log(current(state.users));
      state.isLogin = action.payload;
    },
    searchUser: (state, action) => {
      state.filterUsers=action.payload
    },
    setFollowers: (state, action) => {
      let find = state.users.find((elem)=> elem.id == action.payload.userId)
      console.log(current(find.follower))
      let arr =[...current(find.follower),action.payload.login]
      console.log(arr)
      axios.patch("http://localhost:5000/users/" + action.payload.userId, {
        follower:arr
      })
      // let findLogin = state.users.find((element)=> element.id == action.payload.login.id)
      // console.log(current(findLogin.following))
      // let array = [...current(findLogin.following),find]
      // console.log("arr2",current(array))
      // axios.patch("http://localhost:5000/users/" + action.payload.login.id, {
      //   following:array
      // })
    },
    setFollowing: (state, action) => {
      let login = state.users.find((elem)=> elem.id == action.payload.loginId)
      // console.log(current(login))
      let arr =[...current(login.following),action.payload.send]
      // console.log(arr)
      axios.patch("http://localhost:5000/users/" + action.payload.loginId, {
        following:arr
      })
      // let findLogin = state.users.find((element)=> element.id == action.payload.login.id)
      // console.log(current(findLogin.following))
      // let array = [...current(findLogin.following),find]
      // console.log("arr2",current(array))
      // axios.patch("http://localhost:5000/users/" + action.payload.login.id, {
      //   following:array
      // })
    },
    editBio: (state, action) => {
      let find = state.users.find((elem)=> elem.id= action.payload.loginId)
      console.log(current(find))
      axios.patch("http://localhost:5000/users/" + action.payload.loginId, {
        bio:action.payload.newBio
      })
    },
    createPost: (state, action) => {
      let loginUserId = localStorage.getItem("loginId")
      let find = state.users.find((elem)=> elem.id= action.payload.loginId)
      console.log(current(find))
      console.log(action.payload.loginId)
      console.log(current(find).posts)
      let arr = [...current(find).posts,action.payload.newPost]
      console.log(arr)
      // axios.patch("http://localhost:5000/users/" + action.payload.loginId, {
      //   posts:arr
      // })
    },
  },

  extraReducers: (builder: any) => {
    builder.addCase(
      getAllUsers.pending,
      (state: UserStateType, action: any) => {
        state.loading = true;
      }
    );
    builder.addCase(
      getAllUsers.fulfilled,
      (state: UserStateType, action: any) => {
        state.loading = false;
        state.users = action.payload;
      }
    );

    builder.addCase(
      getAllUsers.rejected,
      (state: UserStateType, action: any) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { login,searchUser,setFollowers,setFollowing,editBio,createPost } = userSlice.actions;

export default userSlice.reducer;
