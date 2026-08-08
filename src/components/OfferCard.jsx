function OfferCard({
  shop,
  title,
  description,
  category,
  endDate,
  mobile,
  latitude,
  longitude,
}) {

  const mapsUrl =
    latitude && longitude
      ? `https://www.google.com/maps?q=${latitude},${longitude}`
      : null;

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

      <div className="offer-actions">

        {mobile && (
          <a
            href={`tel:${mobile}`}
            className="call-btn"
          >
            📞 Call Now
          </a>
        )}

        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="direction-btn"
          >
            📍 Directions
          </a>
        )}

      </div>

    </div>
  );
}

export default OfferCard;