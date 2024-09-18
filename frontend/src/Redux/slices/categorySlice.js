import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_BASE_URL;

export const createCategories = createAsyncThunk(
  "categories/createCategories",
  async (categoriesData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseURL}/categories/update`,
        categoriesData
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async (categoriesData, thunkAPI) => {
    try {
      const response = await axios.get(`${baseURL}/categories`);
      console.log("categories response: ", response);
      return response.data;
    } catch (error) {
      console.log("Error occured while fetching categories: ", error);
      toast.error(error?.response?.data?.message);
      thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    error: null,
    loading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    /* handling create categories */
    builder
      .addCase(createCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategories.fulfilled, (state, action) => {
        state.loading = false;
        const { status, message } = action.payload;
        if (status === 1) {
          toast.success(message);
        } else {
          state.error = message;
        }
      });
    /* handling get categories */
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action.payload: ", action.payload);
        const { categories, status, message } = action.payload;
        console.log("payload categories: ", categories);
        if (status === 1) {
          status.categories = categories;
        } /* else {
          state.error = message;
        } */
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        const { message } = action.payload;
        state.error = message;
      });
  },
});

export const { clearError } = categorySlice.actions;
export default categorySlice.reducer;
