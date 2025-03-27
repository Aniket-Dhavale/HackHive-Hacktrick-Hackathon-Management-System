import { useEffect, useState } from "react";

function AuthButton() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Convert to boolean
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsAuthenticated(false); // Update state
    window.location.reload(); // Refresh page
  };

  return (
    <>
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="text-red-600 hover:text-red-900 px-3 py-2 rounded-lg text-sm font-medium"
        >
          Logout
        </button>
      ) : (
        <a
          href="http://localhost:8080/auth/google"
          className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium"
        >
          Sign In
        </a>
      )}
    </>
  );
}

export default AuthButton;
