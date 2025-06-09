import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiRequest } from "../../utils/apiRequest"

export const fetchUser = createAsyncThunk("user/fetchUser", async (id) =>
      apiRequest({
            url: id ? `/user/${id}` : `/user/owner`,
      })
)

export const followUser = createAsyncThunk("user/followUser", async (id) =>
      apiRequest({
            url: `/follow/${id}`,
            method: "POST"
      })
)