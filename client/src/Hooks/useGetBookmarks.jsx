import { useCallback, useState } from "react";
import postService from "../Services/posts.services";

export const useGetBookmarks = () => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const getFunc = useCallback(async (info) => {

            setLoading(true);
            setError(null);
            try {
                  const response = await postService.bookmarks(info);
                  setData(response);
                  console.log(response)
            } catch (err) {
                  setError(err);
            } finally {
                  setLoading(false);
            }
      }, []);

      return { getFunc, data, loading, error };
};
