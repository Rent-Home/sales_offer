import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

function PendingOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOffers();
  }, []);

  async function loadOffers() {
    setLoading(true);

    const { data, error } = await supabase
      .from("offers")
      .select(`
        *,
        businesses (
          business_name
        )
      `)
      .eq("status", "Pending")
      .order("created_at", { ascending: false });

    if (!error) {
      setOffers(data);
    }

    setLoading(false);
  }

  async function approveOffer(id, isEdited) {

  // Step 1: Approve the offer
  const { error } = await supabase
    .from("offers")
    .update({
      status: "Approved",
      is_edited: false,
    })
    .eq("id", id);

  if (error) {
    alert("Failed to approve offer.");
    return;
  }

  // Increment counter ONLY for brand new offers
  if (!isEdited) {

    const { data: stats, error: statsError } = await supabase
      .from("admin_stats")
      .select("approved_offers_count")
      .eq("id", 1)
      .single();

    if (!statsError) {

      await supabase
        .from("admin_stats")
        .update({
          approved_offers_count:
            stats.approved_offers_count + 1,
        })
        .eq("id", 1);

    }

  }

  loadOffers();
}

  async function rejectOffer(id) {
    const { error } = await supabase
      .from("offers")
      .update({
        status: "Rejected",
        is_edited: false,
      })
      .eq("id", id);

    if (!error) {
      loadOffers();
    }
  }

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Pending Offers</h1>

      {offers.length === 0 ? (
        <p>No pending offers.</p>
      ) : (
        offers.map((offer) => (
          <div
            key={offer.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "8px",
            }}
          >
            {offer.is_edited ? (
              <div
                style={{
                  display: "inline-block",
                  background: "#fef3c7",
                  color: "#92400e",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: "600",
                  marginBottom: "12px",
                }}
              >
                ✏️ Updated Offer
              </div>
            ) : (
              <div
                style={{
                  display: "inline-block",
                  background: "#dbeafe",
                  color: "#1d4ed8",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: "600",
                  marginBottom: "12px",
                }}
              >
                🆕 New Offer
              </div>
            )}

            <p>
              <strong>Business:</strong>{" "}
              {offer.businesses?.business_name}
            </p>

            <p>
              <strong>Category:</strong> {offer.category}
            </p>

            <p>{offer.offer_description}</p>

            <button
              className="btn"
              onClick={() => approveOffer(offer.id,offer.is_edited)}
            >
              Approve
            </button>

            <button
              className="btn"
              style={{
                marginLeft: "10px",
                background: "#ef4444",
              }}
              onClick={() => rejectOffer(offer.id)}
            >
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default PendingOffers;