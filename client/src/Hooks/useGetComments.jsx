import { useState } from "react";
import postService from "../Services/posts.services";

export const useGetComment = () => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const getFunc = async (info) => {
            console.log("is working");

            setLoading(true);
            setError(null);
            try {
                  const response = await postService.getComment(info);
                  setData(response);
                  console.log(response)
            } catch (err) {
                  setError(err);
            } finally {
                  setLoading(false);
            }
      };

      return { getFunc, data, loading, error };
};
