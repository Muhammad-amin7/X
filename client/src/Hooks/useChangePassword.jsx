import { useState } from "react";
import userService from "../Services/user.services";

export const useChangePassword = () => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const sendPassword = async (email, password) => {
            setLoading(true);
            setError(null);
            try {
                  const response = await userService.newPassword({ email, password });
                  setData(response);
            } catch (err) {
                  setError(err);
            } finally {
                  setLoading(false);
            }
      };

      return { sendPassword, data, loading, error };
};
