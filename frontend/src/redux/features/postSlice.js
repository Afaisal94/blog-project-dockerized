import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = "http://localhost:5000/posts/";
const API_URL = "http://localhost:5000/posts/";

export const getPosts = createAsyncThunk("post/getPosts", async () => {
  const res = await axios.get(API_URL);
  const response = await res.data.posts;
  return response;
});

export const getPostById = createAsyncThunk("post/getPostById", async (id) => {
  const res = await axios.get(API_URL + id);
  const response = await res.data;
  return response;
});

export const getPostByCategoryName = createAsyncThunk("post/getPostByCategoryName", async (categoryName) => {
  const res = await axios.get(`${API_URL}categoryname/${categoryName}`);
  const response = await res.data.posts;
  return response;
});

export const getPostByKeyword = createAsyncThunk("post/getPostByKeyword", async (keyword) => {
  const res = await axios.get(`http://localhost:5000/posts?q=${keyword}`);
  const response = await res.data.posts;
  return response;
});

export const getPostBySlug = createAsyncThunk(
  "post/getPostBySlug",
  async (slug) => {
    const res = await axios.get(
      `http://localhost:5000/posts?slug=${slug}`
    );
    const response = res.data;
    return response;
  }
);

export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
  await axios.delete(API_URL + id);
  return id;
});

export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ title, content, image, description, category }) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("category", category);

    const response = await axios.post(
      "http://localhost:5000/posts/",
      formData,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ id, title, content, image, description, category }) => {
    const response = await axios.patch(
      API_URL + id,
      {
        title,
        content,
        image,
        description,
        category,
      },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    isLoading: false,
    isError: "",
  },
  extraReducers: {
    // GET POSTS
    [getPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.isError = "";
    },
    [getPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.posts = [];
      state.isError = action.error.message;
    },

    // GET POST BY ID
    [getPostById.pending]: (state) => {
      state.isLoading = true;
    },
    [getPostById.fulfilled]: (state, action) => {
      // state.isLoading = false;
      state.posts = action.payload;
      // state.isError = "";
    },
    [getPostById.rejected]: (state, action) => {
      state.isLoading = false;
      state.posts = [];
      state.isError = action.error.message;
    },

    // GET POST BY CATEGORY NAME
    [getPostByCategoryName.pending]: (state) => {
      state.isLoading = true;
    },
    [getPostByCategoryName.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.isError = "";
    },
    [getPostByCategoryName.rejected]: (state, action) => {
      state.isLoading = false;
      state.posts = [];
      state.isError = action.error.message;
    },

    // GET POST BY KEYWORD
    [getPostByKeyword.pending]: (state) => {
      state.isLoading = true;
    },
    [getPostByKeyword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.isError = "";
    },
    [getPostByKeyword.rejected]: (state, action) => {
      state.isLoading = false;
      state.posts = [];
      state.isError = action.error.message;
    },

    // DELETE POST
    [deletePost.pending]: (state) => {
      state.isLoading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.filter((item) => item._id !== action.payload);
    },
    [deletePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    // CREATE POST
    [createPost.pending]: (state) => {
      state.isLoading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.push(action.payload);
    },
    [createPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    // UPDATE POST
    [updatePost.pending]: (state) => {
      state.isLoading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = [action.payload];
    },
    [updatePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    // GET POST BY SLUG
    [getPostBySlug.pending]: (state) => {
      state.isLoading = true;
    },
    [getPostBySlug.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.isError = "";
    },
    [getPostBySlug.rejected]: (state, action) => {
      state.isLoading = false;
      state.posts = [];
      state.isError = action.error.message;
    },
  },
});

export default postSlice.reducer;
