import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import OfferCard from "../components/OfferCard";
import { supabase } from "../services/supabase";
import NotificationModal from "../components/NotificationModal";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [showNotificationModal, setShowNotificationModal] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  // Offer opened from notification
  const [selectedOffer, setSelectedOffer] =
    useState(null);

  const [offerLoading, setOfferLoading] =
    useState(false);


  // ==================================================
  // LOAD OFFERS
  // ==================================================

  async function loadOffers() {
    setLoading(true);

    const today =
      new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("offers")
      .select(`
        id,
        offer_title,
        offer_description,
        category,
        valid_to,
        businesses (
          business_name,
          mobile,
          latitude,
          longitude
        )
      `)
      .eq("status", "Approved")
      .gte("valid_to", today)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Error loading offers:",
        error
      );
    } else {
      setOffers(data || []);
    }

    setLoading(false);
  }


  // ==================================================
  // INITIAL LOAD + AUTO REFRESH
  // ==================================================

  useEffect(() => {
    loadOffers();

    const interval = setInterval(() => {
      loadOffers();
    }, 15000);

    return () => {
      clearInterval(interval);
    };
  }, []);


  // ==================================================
  // OPEN OFFER FROM NOTIFICATION URL
  // ==================================================

  useEffect(() => {
    const offerId = searchParams.get("offer");

    if (!offerId) {
      return;
    }

    loadSpecificOffer(offerId);
  }, [searchParams]);


  // ==================================================
  // LOAD SPECIFIC OFFER
  // ==================================================

  async function loadSpecificOffer(offerId) {
    setOfferLoading(true);

    const { data, error } = await supabase
      .from("offers")
      .select(`
        id,
        offer_title,
        offer_description,
        category,
        valid_from,
        valid_to,
        status,
        businesses (
          business_name,
          mobile,
          latitude,
          longitude
        )
      `)
      .eq("id", offerId)
      .eq("status", "Approved")
      .single();

    if (error || !data) {
      console.error(
        "Offer not found:",
        error
      );

      setOfferLoading(false);

      alert(
        "This offer is no longer available."
      );

      // Remove ?offer=... from URL
      setSearchParams({});

      return;
    }

    setSelectedOffer(data);

    setOfferLoading(false);
  }


  // ==================================================
  // CLOSE SPECIFIC OFFER
  // ==================================================

  function closeOffer() {
    setSelectedOffer(null);

    // Remove ?offer=UUID
    setSearchParams({});
  }


  // ==================================================
  // NOTIFICATION POPUP
  // ==================================================

  useEffect(() => {
    if (
      typeof Notification !== "undefined" &&
      Notification.permission !== "default"
    ) {
      return;
    }

    const timer = setTimeout(() => {
      setShowNotificationModal(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);


  // ==================================================
  // OPEN NOTIFICATION MODAL EVENT
  // ==================================================

  useEffect(() => {
    const openModal = () => {
      setShowNotificationModal(true);
    };

    window.addEventListener(
      "openNotificationModal",
      openModal
    );

    return () => {
      window.removeEventListener(
        "openNotificationModal",
        openModal
      );
    };
  }, []);


  // ==================================================
  // CATEGORIES
  // ==================================================

  const categories = useMemo(() => {
    const unique = [
      ...new Set(
        offers.map(
          (offer) => offer.category
        )
      ),
    ];

    return [
      "All",
      ...unique,
    ];
  }, [offers]);


  // ==================================================
  // FILTER OFFERS
  // ==================================================

  const filteredOffers = offers.filter(
    (offer) => {

      const categoryMatch =
        selectedCategory === "All" ||
        offer.category === selectedCategory;

      const search =
        searchTerm.toLowerCase();

      const searchMatch =
        offer.offer_title
          ?.toLowerCase()
          .includes(search) ||

        offer.offer_description
          ?.toLowerCase()
          .includes(search) ||

        offer.category
          ?.toLowerCase()
          .includes(search) ||

        offer.businesses?.business_name
          ?.toLowerCase()
          .includes(search);

      return (
        categoryMatch &&
        searchMatch
      );
    }
  );


  // ==================================================
  // UI
  // ==================================================

  return (
    <>
      <Navbar />


      {/* ==============================================
          MAIN HOME PAGE
      ============================================== */}

      <div className="container">

        {/* HERO */}

        <section className="hero">

          <h1>
            Discover the Best Local Deals
            in Anand
          </h1>

          <p>
            Browse the latest offers from
            local businesses.
          </p>

          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

        </section>


        {/* CATEGORIES */}

        <section className="categories">

          {categories.map(
            (category) => (

              <button
                key={category}
                className={`category-btn ${
                  selectedCategory === category
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setSelectedCategory(
                    category
                  )
                }
              >
                {category}
              </button>

            )
          )}

        </section>


        {/* OFFERS HEADER */}

        <div className="offers-header">

          <div>
            <h2>
              Latest Offers
            </h2>
          </div>

          {!loading && (
            <span className="offer-count">

              Showing{" "}
              {filteredOffers.length}{" "}

              offer
              {filteredOffers.length !== 1
                ? "s"
                : ""}

            </span>
          )}

        </div>


        {/* OFFERS */}

        {loading ? (

          <p>
            Loading offers...
          </p>

        ) : filteredOffers.length === 0 ? (

          <p>
            No offers available.
          </p>

        ) : (

          <div className="offer-grid">

            {filteredOffers.map(
              (offer) => (

                <OfferCard
                  key={offer.id}

                  shop={
                    offer.businesses
                      ?.business_name
                  }

                  title={
                    offer.offer_title
                  }

                  description={
                    offer.offer_description
                  }

                  category={
                    offer.category
                  }

                  endDate={
                    offer.valid_to
                  }

                  mobile={
                    offer.businesses?.mobile
                  }

                  latitude={
                    offer.businesses
                      ?.latitude
                  }

                  longitude={
                    offer.businesses
                      ?.longitude
                  }
                />

              )
            )}

          </div>
        )}

      </div>


      {/* ==============================================
          NOTIFICATION PERMISSION MODAL
      ============================================== */}

      <NotificationModal
        open={
          showNotificationModal
        }
        onClose={() =>
          setShowNotificationModal(
            false
          )
        }
      />


      {/* ==============================================
          SPECIFIC OFFER MODAL
      ============================================== */}

      {selectedOffer && (

        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0, 0, 0, 0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >

          <div
            style={{
              background: "white",
              borderRadius: "18px",
              width: "100%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "30px",
              position: "relative",
            }}
          >

            {/* CLOSE BUTTON */}

            <button
              onClick={closeOffer}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                width: "40px",
                height: "40px",
                border: "none",
                borderRadius: "50%",
                background: "#f1f5f9",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              ✕
            </button>


            {/* BUSINESS NAME */}

            <div
              style={{
                color: "#64748b",
                fontSize: "15px",
                marginBottom: "10px",
              }}
            >
              🏪{" "}
              {selectedOffer.businesses
                ?.business_name ||
                "Local Business"}
            </div>


            {/* OFFER TITLE */}

            <h1>
              🔥{" "}
              {selectedOffer.offer_title}
            </h1>


            {/* CATEGORY */}

            <span
              style={{
                display: "inline-block",
                background: "#f1f5f9",
                padding: "6px 12px",
                borderRadius: "20px",
                marginTop: "8px",
                marginBottom: "20px",
              }}
            >
              {selectedOffer.category}
            </span>


            {/* DESCRIPTION */}

            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.7",
              }}
            >
              {
                selectedOffer
                  .offer_description
              }
            </p>


            {/* VALIDITY */}

            <div
              style={{
                marginTop: "25px",
                padding: "18px",
                background: "#f8fafc",
                borderRadius: "12px",
              }}
            >

              <strong>
                Offer Validity
              </strong>

              <p
                style={{
                  marginBottom: 0,
                }}
              >
                {
                  selectedOffer
                    .valid_from
                }

                {" → "}

                {
                  selectedOffer
                    .valid_to
                }
              </p>

            </div>


            {/* ACTION BUTTONS */}

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "25px",
              }}
            >

              {selectedOffer.businesses
                ?.mobile && (

                <a
                  href={`tel:${selectedOffer.businesses.mobile}`}
                  className="primary-btn"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  📞 Call Business
                </a>

              )}


              {selectedOffer.businesses
                ?.latitude &&
                selectedOffer.businesses
                  ?.longitude && (

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedOffer.businesses.latitude},${selectedOffer.businesses.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="secondary-btn"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  📍 View Location
                </a>

              )}

            </div>

          </div>

        </div>

      )}


      {/* ==============================================
          OFFER LOADING
      ============================================== */}

      {offerLoading && (

        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(255, 255, 255, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
          }}
        >

          <h3>
            Loading offer...
          </h3>

        </div>

      )}


      <Footer />

    </>
  );
}

export default Home;