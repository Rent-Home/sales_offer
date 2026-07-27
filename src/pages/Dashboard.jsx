import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { useBusinessAuth } from "../context/BusinessAuthContext";

function Dashboard() {
  const { user } = useBusinessAuth();
  const navigate = useNavigate();

  const [business, setBusiness] = useState(null);

  useEffect(() => {
    loadBusiness();
  }, []);

  async function loadBusiness() {
    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!error) {
      setBusiness(data);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/business/login");
  }

  return (
    <div className="dashboard-page">

      <div className="dashboard-card">

        <h1>
          Welcome {business?.business_name || "Business"} 👋
        </h1>

        <p>
          Manage your offers from here.
        </p>

        <div className="dashboard-buttons">

          <button
            className="primary-btn"
            onClick={() => navigate("/business/create-offer")}
          >
            + Create Offer
          </button>

          <button
            className="secondary-btn"
           onClick={() => navigate("/business/my-offers")}
          >
            My Offers
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;