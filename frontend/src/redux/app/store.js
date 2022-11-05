import { configureStore } from '@reduxjs/toolkit';
import categorySlice from '../features/categorySlice';
import commentSlice from '../features/commentSlice';
import postSlice from '../features/postSlice';

export const store = configureStore({
  reducer: {
    category: categorySlice,
    comment: commentSlice,
    post: postSlice,
  },
});
