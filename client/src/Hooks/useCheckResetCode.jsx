import { useState } from "react";
import userService from "../Services/user.services";

export const useCheckResetCode = () => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);

      const sendResetCode = async (email, code) => {
            setLoading(true);
            setError(null);
            try {
                  const response = await userService.resetCode({ email, code });
                  setData(response);
            } catch (err) {
                  setError(err);
            } finally {
                  setLoading(false);
            }
      };

      return { sendResetCode, data, loading, error };
};
