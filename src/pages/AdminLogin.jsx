import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "../services/supabase";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    // Login with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    // Check if this user is an admin
    const { data: adminData, error: adminError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (adminError || !adminData) {
      await supabase.auth.signOut();
      setLoading(false);
      setError("Access denied. You are not an administrator.");
      return;
    }

    setLoading(false);
    navigate("/admin/dashboard");
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="form-container">

          <h2>Admin Login</h2>

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                placeholder="Enter Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </button>

          </form>

          <br />

          <p>
            Business Owner?{" "}
            <Link to="/business/login">
              Login Here
            </Link>
          </p>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default AdminLogin;