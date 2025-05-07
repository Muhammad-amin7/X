import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SaveToken() {
      const location = useLocation();
      const navigate = useNavigate()

      useEffect(() => {
            const searchParams = new URLSearchParams(location.search);
            const token = searchParams.get("token");
            if (token) {
                  localStorage.setItem("token", token);
                  navigate("/home")
            } else {
                  navigate("/")
            }
      }, [location]);

      return null;
}
