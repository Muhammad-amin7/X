import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./user.services";

const initialState = {
      owner: {},
      loading: false,
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
                        state.owner = action.payload.info;
                  })
                  .addCase(fetchUser.rejected, (state, action) => {
                        localStorage.removeItem('token');
                        state.loading = false;
                        state.error = action.error?.message || 'Something went wrong';
                  })
      }
})

export const { clearError } = userSlice.actions;
export default userSlice.reducer;