import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminLogin() {

    return (

        <>

            <Navbar />

            <div className="container">

                <div className="form-container">

                    <h2>Admin Login</h2>

                    <div className="form-group">

                        <label>Username</label>

                        <input
                            type="text"
                            placeholder="Admin Username"
                        />

                    </div>

                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Password"
                        />

                    </div>

                    <button className="btn">

                        Login

                    </button>

                </div>

            </div>

            <Footer />

        </>

    );

}

export default AdminLogin;