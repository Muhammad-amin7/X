import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, followUser } from "./user.services";

const initialState = {
      owner: {},
      users: {},
      loading: false,
      followLoading: false,
      error: null,
};

const userSlice = createSlice({
      name: 'users',
      initialState,
      reducers: {
            clearError(state) {
                  state.error = null;
            },
      },
      extraReducers: (builder) => {
            builder
                  .addCase(fetchUser.pending, (state) => {
                        state.loading = true;
                        state.error = null;
                  })
                  .addCase(fetchUser.fulfilled, (state, action) => {
                        state.loading = false;
                        if (action.payload.owner) {
                              state.owner = action.payload.info;
                        }
                        state.users[action.payload.info._id] = { ...action.payload.info, owner: action.payload.owner };
                  })
                  .addCase(fetchUser.rejected, (state, action) => {
                        // localStorage.removeItem('token');
                        state.loading = false;
                        state.error = action.error?.message || 'Something went wrong';
                  })
                  .addCase(followUser.pending, (state) => {
                        state.followLoading = true;
                        state.error = null;
                  })
                  .addCase(followUser.fulfilled, (state, action) => {
                        state.followLoading = false;
                        if (action.payload.hasFollowing) {
                              if (state.users[action.payload.userId]) {
                                    state.users[action.payload.userId].hasFollowed = false;
                                    state.users[action.payload.userId].followers = state.users[action.payload.userId].followers.filter(follower => follower.user_id !== action.payload.ownerId);
                              }
                        } else {
                              if (state.users[action.payload.userId]) {
                                    state.users[action.payload.userId].hasFollowed = true;
                                    state.users[action.payload.userId].followers.push({ user_id: action.payload.ownerId });
                              }
                        }
                  })
                  .addCase(followUser.rejected, (state, action) => {
                        state.followLoading = false;
                        state.error = action.error?.message || 'Something went wrong';
                  });
      }
})

export const { clearError } = userSlice.actions;
export default userSlice.reducer;