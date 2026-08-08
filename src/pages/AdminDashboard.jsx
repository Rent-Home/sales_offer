import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import BusinessHeader from "../components/BusinessHeader";
import "../styles/adminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [businessCount, setBusinessCount] = useState(0);
  const [approvedTotal, setApprovedTotal] = useState(0);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const today = new Date().toISOString().split("T")[0];

    // Total Approved Counter
    const { data: stats } = await supabase
      .from("admin_stats")
      .select("approved_offers_count")
      .eq("id", 1)
      .single();

    setApprovedTotal(stats?.approved_offers_count || 0);

    // Pending Offers
    const { count: pending } = await supabase
      .from("offers")
      .select("*", { count: "exact", head: true })
      .eq("status", "Pending");

    // Live Offers (Approved + Not Expired)
    const { count: approved } = await supabase
      .from("offers")
      .select("*", { count: "exact", head: true })
      .eq("status", "Approved")
      .gte("valid_to", today);

    // Businesses
    const { count: businesses } = await supabase
      .from("businesses")
      .select("*", { count: "exact", head: true });

    setPendingCount(pending || 0);
    setApprovedCount(approved || 0);
    setBusinessCount(businesses || 0);
  }

  return (
    <>
      <BusinessHeader />

      <div className="admin-page">

        {/* Header */}

        <div className="admin-header">
          <h1>🛡 Admin Dashboard</h1>

          <p>
            Manage offers and businesses from one place.
          </p>
        </div>


        {/* Statistics */}

        <div className="stats-grid">

          <div className="stat-card pending">

            <div className="stat-icon">
              🟡
            </div>

            <div className="stat-content">

              <h3>
                Pending Offers
              </h3>

              <h2>
                {pendingCount}
              </h2>

              <span>
                Needs Review
              </span>

            </div>

          </div>


          <div className="stat-card approved">

            <div className="stat-icon">
              🟢
            </div>

            <div className="stat-content">

              <h3>
                Live Offers
              </h3>

              <h2>
                {approvedCount}
              </h2>

              <span>
                Currently Live
              </span>

            </div>

          </div>


          <div className="stat-card business">

            <div className="stat-icon">
              🏪
            </div>

            <div className="stat-content">

              <h3>
                Businesses
              </h3>

              <h2>
                {businessCount}
              </h2>

              <span>
                Registered
              </span>

            </div>

          </div>

        </div>


        {/* Quick Actions */}

        <div className="section-title">
          Quick Actions
        </div>


        {/* Pending Offers */}

        <div
          className="action-card"
          onClick={() =>
            navigate("/admin/pending-offers")
          }
        >

          <div>

            <h3>
              📝 Review Pending Offers
            </h3>

            <p>
              Review, approve or reject newly
              submitted offers.
            </p>

            <div className="mini-counter">

              <span>
                Total Offers Approved
              </span>

              <strong>
                {approvedTotal}
              </strong>

            </div>

          </div>

          <div className="arrow">
            →
          </div>

        </div>


        {/* Promotional Campaigns */}

        <div
          className="action-card"
          onClick={() =>
            navigate("/admin/campaigns")
          }
        >

          <div>

            <h3>
              📢 Promotional Campaigns
            </h3>

            <p>
              Create and send promotional
              notifications to visitors.
            </p>

          </div>

          <div className="arrow">
            →
          </div>

        </div>


      </div>
    </>
  );
}

export default AdminDashboard;