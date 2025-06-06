import { useContext, useState } from "react";
import postService from "../Services/posts.services";
import { Context } from "../Context/Context";

export const useGetPosts = () => {
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const [data, setData] = useState([])
      const { ContentLimit, } = useContext(Context)
      const [hasMore, setHasMore] = useState(true);
      const getPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                  const response = await postService.getPosts(ContentLimit);
                  if (response.data.length < ContentLimit) {
                        setHasMore(false);
                  }
                  setData(response.data)
            } catch (err) {
                  setError(err);
            } finally {
                  setLoading(false);
            }
      }

      return { getPosts, data, loading, error, hasMore };
};
