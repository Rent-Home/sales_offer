import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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

    // Open our notification popup
    window.dispatchEvent(new Event("openNotificationModal"));

    // Close mobile menu
    setMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header>
      <div className="container navbar-container">

        {/* LOGO */}
        <Link
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          Local-Offer.in
        </Link>

        {/* DESKTOP MENU */}
        <nav className="menu">

          <Link to="/">
            Home
          </Link>

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
            🔔 Notify Me
          </button>

        </nav>

        {/* MOBILE HAMBURGER */}
        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* MOBILE DROPDOWN */}
        {menuOpen && (
          <nav className="mobile-dropdown">

            <Link
              to="/"
              onClick={closeMenu}
            >
              Home
            </Link>

            <Link
              to="/business/login"
              onClick={closeMenu}
            >
              Business Login
            </Link>

            <Link
              to="/business/register"
              onClick={closeMenu}
            >
              Register
            </Link>

            <button
              className="mobile-notification-btn"
              onClick={handleNotificationClick}
            >
              🔔 Notify Me
            </button>

          </nav>
        )}

      </div>
    </header>
  );
}

export default Navbar;