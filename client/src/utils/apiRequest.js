import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const apiRequest = async ({ method = "get", url, data = null, contentType = "application/json" }) => {
      try {
            const headers = {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "Content-Type": contentType,
            };

            const response = await axios({
                  method,
                  url: `${baseUrl}${url}`,
                  ...(data && { data }),
                  headers,
            });

            console.log(response.data);
            return response.data;

      } catch (error) {
            console.log(error);
            throw new Error("API request failed");
      }
};
