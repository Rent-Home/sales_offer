import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function BusinessRegister() {

    return (

        <>

            <Navbar />

            <div className="container">

                <div className="form-container">

                    <h2>Register Business</h2>

                    <div className="form-group">
                        <label>Shop Name</label>

                        <input
                            type="text"
                            placeholder="ABC Fashion"
                        />
                    </div>

                    <div className="form-group">
                        <label>Owner Name</label>

                        <input
                            type="text"
                            placeholder="Ajay"
                        />
                    </div>

                    <div className="form-group">
                        <label>Mobile</label>

                        <input
                            type="text"
                            placeholder="9876543210"
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="abc@gmail.com"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="********"
                        />
                    </div>

                    <button className="btn">

                        Register

                    </button>

                    <br />
                    <br />

                    <p>

                        Already Registered?

                        {" "}

                        <Link to="/business/login">

                            Login

                        </Link>

                    </p>

                </div>

            </div>

            <Footer />

        </>

    );

}

export default BusinessRegister;