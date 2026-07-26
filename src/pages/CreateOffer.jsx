import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CreateOffer() {

    return (

        <>

            <Navbar />

            <div className="container">

                <div className="form-container">

                    <h2>Create New Offer</h2>

                    <div className="form-group">

                        <label>Offer Title</label>

                        <input
                            type="text"
                            placeholder="Flat 50% OFF"
                        />

                    </div>

                    <div className="form-group">

                        <label>Description</label>

                        <textarea
                            rows="5"
                            placeholder="Write complete offer..."
                        ></textarea>

                    </div>

                    <div className="form-group">

                        <label>Category</label>

                        <select>

                            <option>Restaurant</option>

                            <option>Fashion</option>

                            <option>Electronics</option>

                            <option>Grocery</option>

                            <option>Medical</option>

                            <option>Furniture</option>

                            <option>Others</option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>Start Date</label>

                        <input type="date"/>

                    </div>

                    <div className="form-group">

                        <label>End Date</label>

                        <input type="date"/>

                    </div>

                    <button className="btn">

                        Submit Offer

                    </button>

                </div>

            </div>

            <Footer />

        </>

    );

}

export default CreateOffer;