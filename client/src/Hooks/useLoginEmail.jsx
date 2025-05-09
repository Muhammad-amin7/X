import { useState } from "react";
import userService from "../Services/user.services";

export const useLoginEmail = () => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const sendEmail = async (em) => {
            setLoading(true);
            setError(null);
            try {
                  const email = em.email
                  const response = await userService.loginEmail({ email });
                  console.log(response);
                  
                  setData(response);
            } catch (err) {
                  setError(err);
            } finally {
                  setLoading(false);
            }
      };

      return { sendEmail, data, loading, error };
};
