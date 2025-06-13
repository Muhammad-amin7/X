import { createSlice } from "@reduxjs/toolkit";
import { createComment, createPost, deletePost, fetchBookmarks, fetchComments, fetchFollowingsPost, fetchPosts, likePost } from "./post.services";

const initialState = {
      // post
      posts: [],
      loading: false,
      createPostLoading: false,
      // followings post
      followingsPosts: [],
      followingsPostsLoading: false,
      // comment
      comments: {},
      commentsLoading: false,
      // bookmark
      bookmarks: [],
      bookmarksLoading: false,
      // error
      error: null,
};

const postsSlice = createSlice({
      name: "posts",
      initialState,
      reducers: {
            clearError(state) {
                  state.error = null;
            },
      },
      extraReducers: (builder) => {
            builder
                  // Get posts
                  .addCase(fetchPosts.pending, (state) => {
                        state.loading = true;
                  })
                  .addCase(fetchPosts.fulfilled, (state, action) => {
                        state.loading = false;
                        state.posts = action.payload.data;
                  })
                  .addCase(fetchPosts.rejected, (state, action) => {
                        state.loading = false;
                        state.error = action.error.message;
                  })

                  // get followings post
                  .addCase(fetchFollowingsPost.pending, (state) => {
                        state.followingsPostsLoading = true;
                  })
                  .addCase(fetchFollowingsPost.fulfilled, (state, action) => {
                        state.followingsPostsLoading = false;
                        state.followingsPosts = action.payload.posts
                        console.log(action.payload.posts)
                  })
                  .addCase(fetchFollowingsPost.rejected, (state, action) => {
                        state.followingsPostsLoading = false;
                        state.error = action.error.message;
                  })

                  // create post
                  .addCase(createPost.pending, (state) => {
                        state.createPostLoading = true;
                  })
                  .addCase(createPost.fulfilled, (state, action) => {
                        state.posts.unshift(action.payload.data[0]);
                        state.createPostLoading = false;
                  })
                  .addCase(createPost.rejected, (state, action) => {
                        state.error = action.error.message;
                        state.createPostLoading = false;
                  })

                  // delete post
                  .addCase(deletePost.fulfilled, (state, action) => {
                        state.posts = state.posts.filter((post) => post.content._id !== action.payload._id);
                  })

                  .addCase(deletePost.rejected, (state, action) => {
                        state.error = action.error.message;
                  })

                  // like post
                  .addCase(likePost.fulfilled, (state, action) => {
                        const { likes, liked } = action.payload
                        const postIndex = state.posts.findIndex((post) => post.content._id === action.payload.postId)
                        state.posts[postIndex].content = { ...state.posts[postIndex].content, likes: likes, isLiked: liked }
                  })

                  // fetch comments
                  .addCase(fetchComments.pending, (state) => {
                        state.commentsLoading = true;
                  })

                  .addCase(fetchComments.fulfilled, (state, action) => {
                        state.commentsLoading = false;
                        const id = action.payload.postId
                        state.comments[id] = action.payload.data
                  })

                  // create comment
                  .addCase(createComment.fulfilled, (state, action) => {
                        const { postId, data } = action.payload
                        state.comments[postId].unshift(data)
                  })

                  // fetch bookmarks
                  .addCase(fetchBookmarks.pending, (state) => {
                        state.bookmarksLoading = true
                  })
                  .addCase(fetchBookmarks.fulfilled, (state, action) => {
                        state.bookmarksLoading = false
                        state.bookmarks = action.payload
                  })
                  .addCase(fetchBookmarks.rejected, (state, action) => {
                        state.error = action.error.message;
                        state.createPostLoading = false;
                  })
      },
});

export const { clearError } = postsSlice.actions;
export default postsSlice.reducer;