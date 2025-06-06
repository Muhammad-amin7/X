import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../utils/apiRequest";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async ({ limit }) =>
      apiRequest({ url: `/posts/${Number(limit)}` })
);

export const createPost = createAsyncThunk("posts/createPost", async (body) =>
      apiRequest({
            method: "post",
            url: "/posts",
            data: body,
            contentType: "multipart/form-data",
      })
);

export const deletePost = createAsyncThunk('posts/deletePost', async (postId) =>
      apiRequest({
            method: "delete",
            url: `/post/${postId}`
      })
);

export const likePost = createAsyncThunk("posts/likePost", async (postId) =>
      apiRequest({ url: `/posts/like/${postId}` })
);

export const fetchComments = createAsyncThunk("posts/fetchComments", async ({ postId, limit }) =>
      apiRequest({ url: `/posts/comment/${postId}${limit ? `/${limit}` : ""}` })
);

export const createComment = createAsyncThunk("posts/commentPost", async (body) =>
      apiRequest({
            method: "post",
            url: "/posts/comment",
            data: body,
      })
);

export const fetchBookmarks = createAsyncThunk("posts/bookmarks", async () =>
      apiRequest({ url: `/bookmarks` })
);

export const addBookmark = createAsyncThunk("posts/bookmarks", async () =>
      apiRequest({ method: "put", url: `/bookmarks` })
);