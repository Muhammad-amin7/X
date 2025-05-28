import { useState } from "react";
import postService from "../Services/posts.services";

export const useCreatePost = () => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const sendData = async (data) => {
            console.log(data);
            
            setLoading(true);
            setError(null);
            try {
                  const response = await postService.createPost(data);
                  setData(response);
            } catch (err) {
                  setError(err);
            } finally {
                  setLoading(false);
            }
      };

      return { sendData, data, loading, error };
};
