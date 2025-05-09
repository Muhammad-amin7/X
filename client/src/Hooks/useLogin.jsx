import { useState } from "react";
import userService from "../Services/user.services";

export const useLogin = () => {
      // const navigate = useNavigate()
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const sendPassword = async (pas) => {
            setLoading(true);
            setError(null);
            try {
                  const email = localStorage.getItem('login_email')
                  const password = pas.password
                  const response = await userService.loginPassword({ password, email });
                  if (response.ok) {
                        localStorage.removeItem('login_email')
                        localStorage.setItem("token", response.access_token)
                  }
                  console.log(response);

                  setData(response);
            } catch (err) {
                  setError(err);
            } finally {
                  setLoading(false);
            }
      };

      return { sendPassword, data, loading, error };
};
