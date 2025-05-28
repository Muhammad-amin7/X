import { useState } from "react";
import postService from "../Services/posts.services";

export const useAddLike = () => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const sendId = async (postId) => {
            setLoading(true);
            setError(null);
            try {
                  const response = await postService.like(postId);
                  setData(response);
                  console.log(data)
            } catch (err) {
                  setError(err);
            } finally {
                  setLoading(false);
            }
      };

      return { sendId, data, loading, error };
};
