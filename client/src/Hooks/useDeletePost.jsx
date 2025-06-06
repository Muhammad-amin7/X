import { useState } from "react";
import postService from "../Services/posts.services";

export const useDeletePost = () => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const deletePost = async (id) => {
            setLoading(true);
            setError(null);
            try {
                  const response = await postService.deletePost(id);
                  setData(response);
            } catch (err) {
                  setError(err);
            } finally {
                  setLoading(false);
            }
      };

      return { deletePost, data, loading, error };
};
