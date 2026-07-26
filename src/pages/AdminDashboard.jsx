import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminDashboard() {

    const offers = [

        {
            id:1,
            shop:"ABC Fashion",
            title:"Flat 50% OFF",
            status:"Pending"
        },

        {
            id:2,
            shop:"Pizza Hub",
            title:"Buy 1 Get 1",
            status:"Pending"
        }

    ];

    return (

        <>

            <Navbar />

            <div className="container">

                <h1
                    style={{marginTop:"30px"}}
                >

                    Admin Dashboard

                </h1>

                <br/>

                {

                    offers.map((offer)=>(

                        <div
                            className="offer-card"
                            key={offer.id}
                        >

                            <h3>{offer.shop}</h3>

                            <h2>{offer.title}</h2>

                            <p>Status : {offer.status}</p>

                            <br/>

                            <button className="btn">

                                Approve

                            </button>

                            {" "}

                            <button
                                className="btn"
                                style={{
                                    background:"#dc2626"
                                }}
                            >

                                Reject

                            </button>

                            {" "}

                            <button
                                className="btn"
                                style={{
                                    background:"#16a34a"
                                }}
                            >

                                Send Notification

                            </button>

                        </div>

                    ))

                }

            </div>

            <Footer />

        </>

    );

}

export default AdminDashboard;