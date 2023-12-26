import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk<
  Array<object>,
  void,
  { state: UserStateType }
>("getAllUsers", async () => {
  const response = await axios.get("https://usersapitaskk.onrender.com/users");
  console.log(response.data);
  return response.data;
});
export interface UserStateType {
  users: object[];
  isLogin: boolean;
  error: string;
  loading: boolean;
}

const initialState: UserStateType = {
  users: [],
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
export const { login } = userSlice.actions;

export default userSlice.reducer;
