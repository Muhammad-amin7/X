import { useContext, useState } from "react";
import postService from "../Services/posts.services";
import { useEffect } from "react";
import { Context } from "../Context/Context";

export const useGetPosts = () => {
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const { Contents, setContents } = useContext(Context)

      const getPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                  const response = await postService.getPosts();
                  setContents(response)
            } catch (err) {
                  setError(err);
            } finally {
                  setLoading(false);
            }
      };

      useEffect(() => { getPosts() }, [])
      return { loading, error };
};
