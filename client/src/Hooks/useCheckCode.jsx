import { useState } from "react";
import userService from "../Services/user.services";

export const useCheckCode = () => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const sendCode = async (code, email) => {
            setLoading(true);
            setError(null);
            try {
                  const response = await userService.checkCodeInEmail({ code: code, email: email });
                  setData(response);
            } catch (err) {
                  setError(err);
            } finally {
                  setLoading(false);
            }
      };

      return { sendCode, data, loading, error };
};
