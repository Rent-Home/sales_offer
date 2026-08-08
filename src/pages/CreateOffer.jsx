import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { useBusinessAuth } from "../context/BusinessAuthContext";
import BusinessHeader from "../components/BusinessHeader";

function CreateOffer() {
  const { user } = useBusinessAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    offer_title: "",
    offer_description: "",
    category: "",
    valid_from: "",
    valid_to: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !form.offer_title ||
      !form.offer_description ||
      !form.category ||
      !form.valid_from ||
      !form.valid_to
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (form.valid_to < form.valid_from) {
      setError("Valid To date cannot be earlier than Valid From.");
      return;
    }

    setLoading(true);

    console.log("User from BusinessAuth:", user);

    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();
    console.log("BusinessAuth User ID:", user.id);
    console.log("User from Supabase Auth:", authUser);
    const { error } = await supabase
      .from("offers")
      .insert({
        business_id: user.id,
        offer_title: form.offer_title,
        offer_description: form.offer_description,
        category: form.category,
        valid_from: form.valid_from,
        valid_to: form.valid_to,
      });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess("Offer submitted successfully!");

    setTimeout(() => {
      navigate("/business/dashboard");
    }, 1200);
  }

  return (

    <>
      <BusinessHeader
        backTo="/business/dashboard"
        backText="Dashboard"
      />
      <div className="form-page">
        <div className="form-card">

          <h1>Create Offer</h1>
          <p>Create a new offer for your customers.</p>

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          {success && (
            <div className="success-box">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <input
              name="offer_title"
              placeholder="Offer Title"
              value={form.offer_title}
              onChange={handleChange}
            />

            <textarea
              name="offer_description"
              placeholder="Offer Description"
              rows="5"
              value={form.offer_description}
              onChange={handleChange}
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option>Restaurant</option>
              <option>Fashion</option>
              <option>Electronics</option>
              <option>Medical</option>
              <option>Salon</option>
              <option>Grocery</option>
              <option>Education</option>
              <option>Other</option>
            </select>

            <label>Valid From</label>

            <input
              type="date"
              name="valid_from"
              value={form.valid_from}
              onChange={handleChange}
            />

            <label>Valid To</label>

            <input
              type="date"
              name="valid_to"
              value={form.valid_to}
              onChange={handleChange}
            />

            <button
              className="primary-btn"
              disabled={loading}
            >
              {loading ? "Saving..." : "Create Offer"}
            </button>

          </form>

        </div>
      </div>
    </>
  );
}

export default CreateOffer;