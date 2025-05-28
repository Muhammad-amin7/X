import { useState } from "react";
import postService from "../Services/posts.services";

export const useAddComment = () => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const send = async (message) => {
            setLoading(true);
            setError(null);
            try {
                  const response = await postService.comment(message);
                  setData(response);
                  console.log(response)
            } catch (err) {
                  setError(err);
            } finally {
                  setLoading(false);
            }
      };

      return { send, data, loading, error };
};
