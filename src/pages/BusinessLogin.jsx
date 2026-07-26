import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function BusinessLogin() {
    return (
        <>
            <Navbar />

            <div className="container">

                <div className="form-container">

                    <h2>Business Login</h2>

                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter Email"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter Password"
                        />
                    </div>

                    <button className="btn">
                        Login
                    </button>

                    <br />
                    <br />

                    <p>
                        Don't have an account?
                        {" "}
                        <Link to="/business/register">
                            Register Here
                        </Link>
                    </p>

                </div>

            </div>

            <Footer />
        </>
    );
}

export default BusinessLogin;