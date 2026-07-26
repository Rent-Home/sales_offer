import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container nav-content">

        <Link to="/" className="logo">
          salesOffer.in
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>

          <Link to="/business/login">
            Business Login
          </Link>

          <Link to="/business/register">
            Register
          </Link>

          <Link to="/admin/login">
            Admin
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;