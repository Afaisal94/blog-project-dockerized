import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = 'http://localhost:5000/categories/';
const API_URL = "http://localhost:5000/categories/";

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async () => {
    const res = await axios.get(API_URL);
    const response = res.data.categories;
    return response;
  }
);

export const getCategoryById = createAsyncThunk(
  "category/getCategoryById",
  async (id) => {
    const res = await axios.get(API_URL + id);
    const response = await res.data;
    return response;
  }
);

export const getCategoryByName = createAsyncThunk(
  "category/getCategoryByName",
  async (name) => {
    const res = await axios.get(`http://localhost:5000/categories?name=${name}`);
    const response = await res.data;
    return response;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id) => {
    await axios.delete(API_URL + id);
    return id;
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async ({ name }) => {
    const res = await axios.post(API_URL, {
      name,
    });
    const response = await res.data;
    return response;
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, name }) => {
    const res = await axios.patch(API_URL + id, {
      name,
    });
    const response = await res.data;
    return response;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    isLoading: false,
    isError: "",
  },
  extraReducers: {
    // GET CATEGORIES
    [getCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
      state.isError = "";
    },
    [getCategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.categories = [];
      state.isError = action.error.message;
    },

    // GET CATEGORY BY ID
    [getCategoryById.pending]: (state) => {
      state.isLoading = true;
    },
    [getCategoryById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
      state.isError = "";
    },
    [getCategoryById.rejected]: (state, action) => {
      state.isLoading = false;
      state.categories = [];
      state.isError = action.error.message;
    },

    // GET CATEGORY BY NAME
    [getCategoryByName.pending]: (state) => {
      state.isLoading = true;
    },
    [getCategoryByName.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
      state.isError = "";
    },
    [getCategoryByName.rejected]: (state, action) => {
      state.isLoading = false;
      state.categories = [];
      state.isError = action.error.message;
    },

    // DELETE CATEGORY
    [deleteCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categories = state.categories.filter(
        (item) => item._id !== action.payload
      );
    },
    [deleteCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    // CREATE CATEGORY
    [createCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [createCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categories = state.categories.push(action.payload);
    },
    [createCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    // UPDATE CATEGORY
    [updateCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categories = [action.payload];
    },
    [updateCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

export default categorySlice.reducer;
