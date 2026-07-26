import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Dashboard() {

    return (

        <>

            <Navbar />

            <div className="container">

                <h1
                    style={{
                        marginTop: "30px"
                    }}
                >
                    Business Dashboard
                </h1>

                <br />

                <Link
                    className="btn"
                    to="/business/create-offer"
                >
                    + Create New Offer
                </Link>

                <br />
                <br />

                <div className="offer-card">

                    <h3>

                        Flat 50% OFF

                    </h3>

                    <p>

                        Status :
                        <strong> Approved</strong>

                    </p>

                    <p>

                        Valid Till :
                        {" "}
                        28 Jul 2026

                    </p>

                </div>

                <br />

                <div className="offer-card">

                    <h3>

                        Buy 1 Get 1

                    </h3>

                    <p>

                        Status :
                        <strong> Pending</strong>

                    </p>

                    <p>

                        Valid Till :
                        {" "}
                        30 Jul 2026

                    </p>

                </div>

            </div>

            <Footer />

        </>

    );

}

export default Dashboard;