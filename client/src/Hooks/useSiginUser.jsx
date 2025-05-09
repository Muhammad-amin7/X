import { useState } from "react";
import userService from "../Services/user.services";

export const useSiginUser = () => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const sendPassword = async (pas) => {
            setLoading(true);
            setError(null);
            try {
                  const email = localStorage.getItem('email')
                  const password = pas.password
                  const response = await userService.siginUser({ email, password });
                  if (response.access_token) {
                        localStorage.setItem("token", response.access_token)
                  }
                  setData(response);
            } catch (err) {
                  setError(err);
            } finally {
                  setLoading(false);
            }
      };

      return { sendPassword, data, loading, error };
};
