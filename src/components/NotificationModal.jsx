import NotificationButton from "./NotificationButton";

function NotificationModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="notification-overlay">
      <div className="notification-modal">

        <div className="notification-icon">
          🔔
        </div>

        <h2>Never Miss Local Deals!</h2>

        <p>
          Get instant notifications whenever new offers are posted by
          businesses near you.
        </p>

        <NotificationButton
          onSuccess={onClose}
        />

        <button
          className="later-btn"
          onClick={onClose}
        >
          Maybe Later
        </button>

      </div>
    </div>
  );
}

export default NotificationModal;