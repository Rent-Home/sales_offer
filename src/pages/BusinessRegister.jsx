import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

function BusinessRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    business_name: "",
    owner_name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !form.business_name ||
      !form.owner_name ||
      !form.mobile ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (form.mobile.length !== 10) {
      alert("Enter valid mobile number.");
      return;
    }

    try {
      setLoading(true);

      // Create Auth User
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (error) throw error;

      // Insert Business Profile
      const { error: profileError } = await supabase
        .from("businesses")
        .insert({
          id: data.user.id,
          business_name: form.business_name,
          owner_name: form.owner_name,
          mobile: form.mobile,
        });

      if (profileError) throw profileError;

      alert("Registration Successful!");

      navigate("/business/dashboard");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">

      <div className="form-card">

        <h1>Business Registration</h1>

        <p>Create your business account</p>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            name="business_name"
            placeholder="Business Name"
            value={form.business_name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="owner_name"
            placeholder="Owner Name"
            value={form.owner_name}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <button
            className="primary-btn"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <div className="form-footer">

          Already have an account?

          <Link to="/business/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default BusinessRegister;