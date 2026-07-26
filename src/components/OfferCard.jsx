function OfferCard({
  shop,
  title,
  description,
  category,
  endDate,
}) {
  return (
    <div className="offer-card">

      <h3>{shop}</h3>

      <h2>{title}</h2>

      <p>{description}</p>

      <span className="category">
        {category}
      </span>

      <p className="expiry">
        Valid Till : {endDate}
      </p>

    </div>
  );
}

export default OfferCard;