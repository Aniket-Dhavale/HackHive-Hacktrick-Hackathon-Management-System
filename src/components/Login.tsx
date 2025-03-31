import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function Login() {
  const [authToken, setAuthToken] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setAuthToken(token);
      localStorage.setItem("token", token);
      
      // Get the stored redirect path or default to home
      const redirectPath = localStorage.getItem("redirectPath") || "/";
      localStorage.removeItem("redirectPath"); // Clear the stored path
      navigate(redirectPath);
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Hackathon Hub</h2>
        <p className="text-gray-600 mb-6">Login to participate in exciting hackathons!</p>

        {authToken ? (
          <div className="text-green-600 font-medium">
            <p>Authenticated ✅</p>
            <p className="text-gray-500 text-sm mt-2">Redirecting...</p>
          </div>
        ) : (
          <a
            href="http://localhost:8080/auth/google"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300 inline-flex items-center justify-center"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="Google Logo"
              className="w-5 h-5 mr-2"
            />
            Login with Google
          </a>
        )}
      </div>
    </div>
  );
}

export default Login;
