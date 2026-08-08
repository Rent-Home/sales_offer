import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import BusinessHeader from "../components/BusinessHeader";

function Campaigns() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    loadOffers();
  }, []);

  // ==================================================
  // LOAD ACTIVE APPROVED OFFERS
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
        valid_from,
        valid_to,
        business_id,
        businesses (
          business_name
        )
      `)
      .eq("status", "Approved")
      .gte("valid_to", today)
      .order("valid_to", {
        ascending: true,
      });

    if (error) {
      console.error(error);

      setMessage(error.message);
      setMessageType("error");
      setOffers([]);
    } else {
      setOffers(data || []);
    }

    setLoading(false);
  }


  // ==================================================
  // NOTIFY VISITORS
  // ==================================================

  async function notifyVisitors(offer) {

    const businessName =
      offer.businesses?.business_name ||
      "Local Business";

    const confirmed = window.confirm(
      `Send notification to all subscribers about:\n\n` +
      `🏪 ${businessName}\n` +
      `🔥 ${offer.offer_title}\n\n` +
      `This notification will be sent to all subscribed visitors.`
    );

    if (!confirmed) {
      return;
    }

    setSending(offer.id);
    setMessage("");
    setMessageType("");

    try {

      // ==================================================
      // ALWAYS CREATE A NEW CAMPAIGN
      // ==================================================
      //
      // This is intentional.
      //
      // Same offer can be promoted multiple times:
      //
      // Offer
      //   ↓
      // Campaign #1
      //
      // Same offer
      //   ↓
      // Campaign #2
      //
      // Same offer
      //   ↓
      // Campaign #3
      //
      // ==================================================

      const { data: newCampaign, error: createError } =
        await supabase
          .from("campaigns")
          .insert({
            offer_id: offer.id,

            business_id:
              offer.business_id,

            // Notification title
            title:
              `🏪 ${businessName} — ${offer.offer_title}`,

            // Notification body
            message:
              offer.offer_description ||
              "A new offer is available on Buzz!",

            // IMPORTANT:
            // Opens Home.jsx and tells it which offer
            // should be displayed.
            url:
              `/?offer=${offer.id}`,

            status: "Draft",

            send_count: 0,

            last_recipients: 0,

            last_sent: 0,

            last_failed: 0,
          })
          .select()
          .single();

      if (createError) {
        throw createError;
      }

      if (!newCampaign) {
        throw new Error(
          "Campaign could not be created."
        );
      }


      // ==================================================
      // CALL EDGE FUNCTION
      // ==================================================

      const {
        data: result,
        error: functionError,
      } = await supabase.functions.invoke(
        "send-push-notification",
        {
          body: {
            type: "campaign",
            campaign_id:
              newCampaign.id,
          },
        }
      );


      if (functionError) {
        throw functionError;
      }


      if (!result?.success) {
        throw new Error(
          result?.error ||
            "Notification failed."
        );
      }


      // ==================================================
      // SUCCESS
      // ==================================================

      setMessage(
        `🔔 Notification sent successfully! ${result.sent} visitors notified.`
      );

      setMessageType("success");

      await loadOffers();

    } catch (error) {

      console.error(
        "Campaign notification error:",
        error
      );

      setMessage(
        error?.message ||
          "Failed to send notification."
      );

      setMessageType("error");

    } finally {

      setSending(null);

    }
  }


  // ==================================================
  // UI
  // ==================================================

  return (
    <>
      <div className="admin-page">

        {/* HEADER */}

        <div className="admin-header">

          <h1>
            📢 Promotional Notifications
          </h1>

          <p>
            Notify visitors about active offers.
          </p>

        </div>


        {/* MESSAGE */}

        {message && (
          <div
            className={
              messageType === "error"
                ? "error-box"
                : "success-box"
            }
          >
            {message}
          </div>
        )}


        {/* LOADING */}

        {loading ? (

          <p>
            Loading active offers...
          </p>

        ) : offers.length === 0 ? (

          /* NO OFFERS */

          <div className="action-card">

            <div>

              <h3>
                No Active Offers
              </h3>

              <p>
                There are currently no approved
                active offers available for
                notification.
              </p>

            </div>

          </div>

        ) : (

          /* OFFERS */

          <div>

            {offers.map(
              (offer) => (

                <div
                  className="action-card"
                  key={offer.id}
                  style={{
                    marginBottom:
                      "15px",
                  }}
                >

                  <div
                    style={{
                      flex: 1,
                    }}
                  >

                    {/* BUSINESS */}

                    <p
                      style={{
                        marginBottom:
                          "6px",
                        color:
                          "#64748b",
                      }}
                    >
                      🏪{" "}
                      <strong>
                        {
                          offer.businesses
                            ?.business_name ||
                          "Unknown Business"
                        }
                      </strong>
                    </p>


                    {/* TITLE */}

                    <h3>
                      🔥{" "}
                      {offer.offer_title}
                    </h3>


                    {/* DESCRIPTION */}

                    <p>
                      {
                        offer.offer_description
                      }
                    </p>


                    {/* CATEGORY */}

                    <p>
                      <strong>
                        Category:
                      </strong>{" "}
                      {offer.category}
                    </p>


                    {/* VALIDITY */}

                    <p>
                      <strong>
                        Valid Until:
                      </strong>{" "}
                      {offer.valid_to}
                    </p>


                    {/* NOTIFICATION PREVIEW */}

                    <div
                      style={{
                        marginTop:
                          "15px",
                        padding:
                          "12px 15px",
                        background:
                          "#f8fafc",
                        borderRadius:
                          "10px",
                        border:
                          "1px solid #e2e8f0",
                      }}
                    >

                      <small
                        style={{
                          color:
                            "#64748b",
                        }}
                      >
                        Notification Preview
                      </small>

                      <div
                        style={{
                          marginTop:
                            "6px",
                          fontWeight:
                            "600",
                        }}
                      >
                        🏪{" "}
                        {
                          offer.businesses
                            ?.business_name ||
                          "Local Business"
                        }{" "}
                        —{" "}
                        {
                          offer.offer_title
                        }
                      </div>

                      <div
                        style={{
                          marginTop:
                            "4px",
                          color:
                            "#475569",
                        }}
                      >
                        {
                          offer.offer_description ||
                          "A new offer is available on Buzz!"
                        }
                      </div>

                    </div>


                    {/* BUTTON */}

                    <button
                      className="btn"
                      disabled={
                        sending ===
                        offer.id
                      }
                      onClick={() =>
                        notifyVisitors(
                          offer
                        )
                      }
                      style={{
                        marginTop:
                          "18px",
                      }}
                    >

                      {sending ===
                      offer.id
                        ? "Sending..."
                        : "🔔 Notify Visitors"}

                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>
    </>
  );
}

export default Campaigns;