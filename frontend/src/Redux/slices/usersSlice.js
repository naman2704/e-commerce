import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getCookie } from "../../utilities";

const baseURL = import.meta.env.VITE_BASE_URL;

export const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async (usersData, thunkAPI) => {
    try {
      const token = getCookie("token");
      if (token) {
        const response = await axios.get(`${baseURL}/admin/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        return response.data;
      }
    } catch (error) {
      console.log("Error occured while fetching users: ", error);
      toast.error(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    error: null,
    loading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (bulder) => {
    /* handle cases for getting All users */
    bulder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        const { status, users, message } = action.payload;
        if (status === 1) {
          state.users = users;
          toast.success("Get All users successfully!");
        } else {
          state.error = message;
          toast.error(message);
        }
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        const { message } = action.payload;
        console.log("Error Message: ", message);
        state.error = message;
        /* toast.error(message); */
      });
  },
});

export const { clearError } = usersSlice.actions;
export default usersSlice.reducer;
