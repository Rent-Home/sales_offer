import { Navigate } from "react-router-dom";
import { useBusinessAuth } from "../context/BusinessAuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useBusinessAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          fontWeight: "600",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/business/login" replace />;
  }

  return children;
}

export default ProtectedRoute;