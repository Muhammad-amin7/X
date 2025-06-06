import { useState } from "react";
import userService from "../Services/user.services";

export const useUsersProfile = () => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const sendId = async (id) => {
            setLoading(true);
            setError(null);
            try {
                  const response = await userService.usersProfile(id);
                  setData(response)
            } catch (err) {
                  setError(err);
            } finally {
                  setLoading(false);
            }
      };

      return { sendId, data, loading, error };
};
