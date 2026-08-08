import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../services/supabase";
import BusinessHeader from "../components/BusinessHeader";

function EditOffer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    offer_title: "",
    offer_description: "",
    category: "",
    valid_from: "",
    valid_to: "",
  });

  useEffect(() => {
    loadOffer();
  }, []);

  async function loadOffer() {
    const { data, error } = await supabase
      .from("offers")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert(error.message);
      navigate("/business/my-offers");
      return;
    }

    setForm({
      offer_title: data.offer_title,
      offer_description: data.offer_description,
      category: data.category,
      valid_from: data.valid_from,
      valid_to: data.valid_to,
    });
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("offers")
      .update({
        offer_title: form.offer_title,
        offer_description: form.offer_description,
        category: form.category,
        valid_from: form.valid_from,
        valid_to: form.valid_to,
        // Send edited offer for approval again
  status: "Pending",
  is_edited: true,
      })
      .eq("id", id);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
  "Your offer has been updated and sent for admin approval."
);

navigate("/business/my-offers");
  }

  return (
     <>
    <BusinessHeader
      backTo="/business/my-offers"
      backText="My Offers"
    />
    <div className="form-page">
      <div className="form-card">

        <h1>Edit Offer</h1>

        <form onSubmit={handleSubmit}>

          <input
            name="offer_title"
            value={form.offer_title}
            onChange={handleChange}
            placeholder="Offer Title"
          />

          <textarea
            rows="5"
            name="offer_description"
            value={form.offer_description}
            onChange={handleChange}
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
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
            {loading ? "Updating..." : "Update Offer"}
          </button>

        </form>

      </div>
    </div>
    </>
  );
}

export default EditOffer;