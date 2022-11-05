import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API_URL = 'http://localhost:5000/comments/';
const API_URL = "http://localhost:5000/comments/";

export const getComments = createAsyncThunk("comment/getComments", async () => {
  const res = await axios.get(API_URL);
  const response = res.data.comments;
  return response;
});

export const getCommentsByPostId = createAsyncThunk("comment/getCommentsByPostId", async (postId) => {
  const res = await axios.get(`http://localhost:5000/comments/post/${postId}`);
  const response = res.data;
  return response;
});

export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ comment, post }) => {
    const res = await axios.post(API_URL, {
      comment, post
    });
    const response = await res.data;
    return response;
  }
);


export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (id) => {
    await axios.delete(API_URL + id);
    return id;
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    isLoading: false,
    isError: "",
  },
  extraReducers: {
    // GET COMMENTS
    [getComments.pending]: (state) => {
      state.isLoading = true;
    },
    [getComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
      state.isError = "";
    },
    [getComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.comments = [];
      state.isError = action.error.message;
    },

    // GET COMMENTS BY POST ID
    [getCommentsByPostId.pending]: (state) => {
      state.isLoading = true;
    },
    [getCommentsByPostId.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
      state.isError = "";
    },
    [getCommentsByPostId.rejected]: (state, action) => {
      state.isLoading = false;
      state.comments = [];
      state.isError = action.error.message;
    },

    // CREATE CATEGORY
    [createComment.pending]: (state) => {
      state.isLoading = true;
    },
    [createComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = state.comments.push(action.payload);
    },
    [createComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    // DELETE CATEGORY
    [deleteComment.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = state.comments.filter(
        (item) => item._id !== action.payload
      );
    },
    [deleteComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

export default commentSlice.reducer;
