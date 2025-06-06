import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../Services/post/post.slice.js'
import userReducer from '../Services/user/user.slice.js'
export default configureStore({
      reducer: {
            posts: postsReducer,
            user: userReducer,
      }
})