import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      console.log("JWT Token:", token);
      localStorage.setItem("token", token); // Save token for future requests
      navigate("/"); // Redirect user to a protected route
    } else {
      console.error("No token found in URL");
      navigate("/"); // Redirect back if no token
    }
  }, [navigate]);

  return <h2>Redirecting...</h2>;
}