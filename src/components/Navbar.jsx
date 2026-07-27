import { Link } from "react-router-dom";

function Navbar() {
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
        </nav>

        <div className="mobile-menu">
          ☰
        </div>

      </div>
    </header>
  );
}

export default Navbar;