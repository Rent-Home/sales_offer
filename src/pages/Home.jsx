import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import OfferCard from "../components/OfferCard";

function Home() {

  const offers = [
    {
      id: 1,
      shop: "ABC Fashion",
      title: "Flat 50% OFF",
      description: "Flat 50% OFF on all Men's Clothing.",
      category: "Fashion",
      endDate: "28 Jul 2026",
    },
    {
      id: 2,
      shop: "Pizza Hub",
      title: "Buy 1 Get 1 Free",
      description: "Buy One Medium Pizza and Get One Free.",
      category: "Restaurant",
      endDate: "27 Jul 2026",
    },
    {
      id: 3,
      shop: "Patel Electronics",
      title: "₹5000 OFF",
      description: "₹5000 Discount on Selected Air Conditioners.",
      category: "Electronics",
      endDate: "30 Jul 2026",
    },
    {
      id: 4,
      shop: "Raj Grocery",
      title: "10% OFF",
      description: "10% OFF on Monthly Grocery Shopping.",
      category: "Grocery",
      endDate: "29 Jul 2026",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="container">

        <section className="hero">
          <h1>Discover the Best Local Deals in Anand</h1>

          <p>Browse the latest offers from local businesses.</p>

          <SearchBar />
        </section>

        <section className="categories">
          <button className="category-btn">All</button>
          <button className="category-btn">Restaurant</button>
          <button className="category-btn">Fashion</button>
          <button className="category-btn">Electronics</button>
          <button className="category-btn">Grocery</button>
        </section>

        <h2>Latest Offers</h2>

        <div className="offer-grid">
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              shop={offer.shop}
              title={offer.title}
              description={offer.description}
              category={offer.category}
              endDate={offer.endDate}
            />
          ))}
        </div>

        <div
          style={{
            textAlign: "center",
            margin: "40px 0",
          }}
        >
          <button className="btn">
            🔔 Enable Notifications
          </button>
        </div>

      </div>

      <Footer />
    </>
  );
}

export default Home;