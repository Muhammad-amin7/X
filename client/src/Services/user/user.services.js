import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiRequest } from "../../utils/apiRequest"

export const fetchUser = createAsyncThunk("user/fetchUser", async () =>
      apiRequest({
            url: "/user/token",
      })
)