import { useState } from "react";
import userService from "../Services/user.services";

export const useCheckExistedEmail = () => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const sendEmail = async (email) => {
            setLoading(true);
            setError(null);
            try {
                  const response = await userService.isExistedEmail({ email: email });
                  setData(response);
            } catch (err) {
                  setError(err);
            } finally {
                  setLoading(false);
            }
      };

      return { sendEmail, data, loading, error };
};
