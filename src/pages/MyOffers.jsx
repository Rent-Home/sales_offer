import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { useBusinessAuth } from "../context/BusinessAuthContext";
import BusinessHeader from "../components/BusinessHeader";

function MyOffers() {
  const { user } = useBusinessAuth();
  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOffers();
  }, []);

  async function loadOffers() {
    const { data, error } = await supabase
      .from("offers")
      .select("*")
      .eq("business_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) {
      setOffers(data);
    }

    setLoading(false);
  }

 async function deleteOffer(id) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this offer?"
  );

  if (!confirmDelete) return;

  const { error } = await supabase
    .from("offers")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    alert(error.message);
    return;
  }

  loadOffers();
}

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Loading...</h2>;
  }

  return (
    <>
    <BusinessHeader
      backTo="/business/dashboard"
      backText="Dashboard"
    />
    <div className="offers-page">

      <div className="offers-header">
        <h1>My Offers</h1>

        <button
          className="primary-btn"
          onClick={() => navigate("/business/create-offer")}
        >
          + New Offer
        </button>
      </div>

      {offers.length === 0 ? (
        <div className="empty-card">
          <h3>No Offers Yet</h3>
          <p>Create your first offer.</p>
        </div>
      ) : (
        offers.map((offer) => (
          <div className="offer-item" key={offer.id}>

            <h2>{offer.offer_title}</h2>

            <p>{offer.offer_description}</p>

            <div className="offer-meta">

              <span>{offer.category}</span>

              <span>{offer.status}</span>

              <span>
                {offer.valid_from} → {offer.valid_to}
              </span>

            </div>

            <div className="offer-actions">

              <button
                className="secondary-btn"
                onClick={() => navigate(`/business/edit-offer/${offer.id}`)}
              >
                Edit
              </button>

              <button
                className="logout-btn"
                onClick={() => deleteOffer(offer.id)}
              >
                Delete
              </button>

            </div>

          </div>
        ))
      )}

    </div>
     </>
  );
}

export default MyOffers;