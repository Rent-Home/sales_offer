import { Link } from "react-router-dom";

function Navbar() {

  const handleNotificationClick = () => {

    if (!("Notification" in window)) {
      alert("Your browser does not support notifications.");
      return;
    }

    if (Notification.permission === "granted") {
      alert("✅ Notifications are already enabled.");
      return;
    }

    if (Notification.permission === "denied") {
      alert(
        "Notifications are blocked.\n\nPlease enable them from your browser settings."
      );
      return;
    }

    // Trigger our popup instead of requesting permission directly
    window.dispatchEvent(new Event("openNotificationModal"));
  };

  return (
    <header className="navbar">

      <div className="container navbar-container">

        <Link to="/" className="logo">
          salesOffer.in
        </Link>

        <nav className="menu">

          <Link to="/">Home</Link>

          <Link to="/business/login">
            Business Login
          </Link>

          <Link to="/business/register">
            Register
          </Link>

          <button
            className="notification-bell"
            onClick={handleNotificationClick}
            title="Enable Notifications"
          >
            🔔Notify Me
          </button>

        </nav>

        <div className="mobile-menu">
          ☰
        </div>

      </div>

    </header>
  );
}

export default Navbar;