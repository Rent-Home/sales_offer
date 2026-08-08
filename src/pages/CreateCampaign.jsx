import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

function CreateCampaign() {

  const navigate = useNavigate();

  const [businesses, setBusinesses] = useState([]);

  const [form, setForm] = useState({
    business_id: "",
    title: "",
    message: "",
    url: "/",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBusinesses();
  }, []);

  async function loadBusinesses() {

    const { data, error } = await supabase
      .from("businesses")
      .select("id, business_name")
      .order("business_name");

    if (error) {
      console.error(error);
      setError(error.message);
      return;
    }

    setBusinesses(data || []);
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {

    e.preventDefault();

    setError("");

    if (!form.business_id) {
      setError("Please select a business.");
      return;
    }

    if (!form.title.trim()) {
      setError("Campaign title is required.");
      return;
    }

    if (!form.message.trim()) {
      setError("Campaign message is required.");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("campaigns")
      .insert({
        business_id: form.business_id,
        title: form.title,
        message: form.message,
        url: form.url || "/",
        status: "Draft",
      });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    navigate("/admin/campaigns");
  }

  return (

    <div className="admin-page">

      <h1>Create Promotional Campaign</h1>

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="form-card"
      >

        <div className="form-group">

          <label>Business</label>

          <select
            name="business_id"
            value={form.business_id}
            onChange={handleChange}
          >

            <option value="">
              Select Business
            </option>

            {businesses.map((business) => (

              <option
                key={business.id}
                value={business.id}
              >
                {business.business_name}
              </option>

            ))}

          </select>

        </div>


        <div className="form-group">

          <label>Campaign Title</label>

          <input
            type="text"
            name="title"
            placeholder="🔥 Weekend Sale!"
            value={form.title}
            onChange={handleChange}
          />

        </div>


        <div className="form-group">

          <label>Message</label>

          <textarea
            name="message"
            rows="5"
            placeholder="Get 30% OFF this weekend!"
            value={form.message}
            onChange={handleChange}
          />

        </div>


        <div className="form-group">

          <label>Notification URL</label>

          <input
            type="text"
            name="url"
            placeholder="/"
            value={form.url}
            onChange={handleChange}
          />

        </div>


        <button
          type="submit"
          className="btn"
          disabled={loading}
        >
          {loading
            ? "Creating..."
            : "Create Campaign"}
        </button>

      </form>

    </div>
  );
}

export default CreateCampaign;