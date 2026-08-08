import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { useBusinessAuth } from "../context/BusinessAuthContext";

function BusinessHeader({ backTo, backText }) {
  const navigate = useNavigate();
  const { user } = useBusinessAuth();

  const [businessName, setBusinessName] = useState("");

  useEffect(() => {
    loadBusiness();
  }, []);

  async function loadBusiness() {
    if (!user) return;

    const { data } = await supabase
      .from("businesses")
      .select("business_name")
      .eq("id", user.id)
      .single();

    if (data) {
      setBusinessName(data.business_name);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate("/business/login");
  }

  return (
    <header className="business-header">

      <div className="header-left">
        {backTo ? (
          <button
            className="header-back-btn"
            onClick={() => navigate(backTo)}
          >
            ← {backText}
          </button>
        ) : (
          <div style={{ width: "120px" }} />
        )}
      </div>

      <h2 className="logo">
        Sales Offer
      </h2>

      <div className="header-right">

        <span className="business-name">
          👤 {businessName}
        </span>

        <button
          className="header-logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default BusinessHeader;