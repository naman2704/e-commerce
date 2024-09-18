import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { setCookie, removeCookie, getCookie } from "../../utilities";

const initialState = {
  userInfo: null,
  loading: false,
  error: "",
  isUserLoggedIn: false,
};
const baseURL = import.meta.env.VITE_BASE_URL;

// Async thunk for registering a user
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${baseURL}/auth/register`, userData);
      console.log("res2704: ", response);
      console.log("Success message: ", response);
      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      console.log("Error occured while registering user: ", error);
      console.log("Error message: ", error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${baseURL}/auth/login`, userData);
      return response.data;
    } catch (error) {
      console.log("Error occured while logging in user: ", error);
      toast.error(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const reLoginUser = createAsyncThunk(
  "user/relogin",
  async (_, thunkAPI) => {
    try {
      const refreshToken = getCookie("refresh_token");
      if (!refreshToken) {
        return thunkAPI.rejectWithValue("Login session expired!");
      }
      const response = await axios.post(`${baseURL}/user/re-login`, {
        refreshToken,
      });
      return response.data;
    } catch (error) {
      console.log("Error in relogin: ", error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getLoggedInUserInfo = createAsyncThunk(
  "user/getLoggedInUserInfo",
  async (_, thunkAPI) => {
    try {
      const accessToken = getCookie("access_token");
      if (!accessToken) {
        return thunkAPI.rejectWithValue("Login session expired!");
      }
      const response = await axios.get(`${baseURL}/user/getLoggedInUserInfo`, {
        accessToken,
      });
      return response.data;
    } catch (error) {
      console.log(
        "Error in getting logged in user info: ",
        error?.response?.data?.message
      );
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Optionally, you can define other non-async actions here
    clearError: (state) => {
      state.error = null;
    },
    logOut: (state) => {
      state.userInfo = null;
      state.isUserLoggedIn = false;
      removeCookie("access_token");
      removeCookie("refresh_token");
      localStorage.removeItem("userInfo");
      toast.success("User logged out successfully!");
    },
    setUser: (state, action) => {
      console.log("action payload: ", action.payload);
      state.userInfo = action.payload.userInfo;
      toast.success("User updated into redux successfully!");
    },
  },
  extraReducers: (builder) => {
    /* Handle user signup states */
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    /* Handle user login states */
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action.payload: ", action);
        const { tokens, user, expiresIn, expiresIn_ } = action.payload;
        if (tokens?.accessToken) {
          toast.success("User logged in successfully!");
          const { accessToken, refreshToken } = tokens;
          if (accessToken) {
            setCookie(
              "access_token",
              accessToken,
              typeof expiresIn === "number" ? expiresIn : 86400
            );
          }
          if (refreshToken) {
            setCookie(
              "refresh_token",
              refreshToken,
              typeof expiresIn_ === "number" ? expiresIn_ : 2628000
            );
          }
        }

        if (user) {
          const storedUser = { ...user };
          delete storedUser.password;
          state.userInfo = storedUser;
          state.userInfo.isUserLoggedIn = true;
          localStorage.setItem("userInfo", JSON.stringify(storedUser));
        }
        /* Storing user data in redux state */
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    /* Handle user re-login states */
    builder
      .addCase(reLoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action.payload: ", action);
        const { tokens, user, expiresIn, expiresIn_ } = action.payload;
        if (tokens?.accessToken) {
          toast.success("User logged in successfully!");
          const { accessToken, refreshToken } = tokens;
          if (accessToken) {
            setCookie(
              "access_token",
              accessToken,
              typeof expiresIn === "number" ? expiresIn : 86400
            );
          }
          if (refreshToken) {
            setCookie(
              "refresh_token",
              refreshToken,
              typeof expiresIn_ === "number" ? expiresIn_ : 2628000
            );
          }
        }

        if (user) {
          const storedUser = { ...user };
          delete storedUser.password;
          state.userInfo = storedUser;
          state.userInfo.isUserLoggedIn = true;
          localStorage.setItem("userInfo", JSON.stringify(storedUser));
        }
        /* Storing user data in redux state */
      })
      .addCase(reLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    /* Handle getting logged in user info */

    builder
      .addCase(getLoggedInUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoggedInUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action.payload: ", action);
        const { user } = action.payload;

        if (user) {
          state.userInfo = { ...user };
          state.userInfo.isUserLoggedIn = true;
          localStorage.setItem("userInfo", JSON.stringify(user));
        }
        /* Storing user data in redux state */
      })
      .addCase(getLoggedInUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, logOut, setUser } = userSlice.actions;
export default userSlice.reducer;
