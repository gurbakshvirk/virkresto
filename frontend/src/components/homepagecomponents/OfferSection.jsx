import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const OffersSection = () => {


  const API = import.meta.env.VITE_API_URL;



  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  //  Fetch Active Offers
  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      const { data } = await axios.get(`${API}/api/offers/active`);
      console.log("OFFERS DATA:", data);
      setOffers(data);
    } catch (err) {
      console.error("Failed to load offers", err);
    }
  };



  return (
    <section
      // ref={sectionRef}
      className="py-24 px-6 md:px-16 bg-gradient-to-r from-yellow-400 to-yellow-100"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div
          //  ref={headingRef}
          className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Special Offers
          </h2>
          <p className="mt-4 text-gray-700">
            Grab exclusive deals before they’re gone
          </p>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {offers.map((offer, index) => (
            <div
              key={offer._id}
              ref={el => cardsRef.current[index] = el}
              className="bg-white rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <span className="text-yellow-500 font-semibold uppercase tracking-wide">
                Limited Time
              </span>

              <h3 className="text-4xl font-bold text-gray-900 mt-4">
                {offer.discountType === "percentage"
                  ? `${offer.discountValue}% OFF`
                  : `₹${offer.discountValue} OFF`}
              </h3>

              <p className="mt-3 text-gray-600">
                {offer.description}
              </p>

              {/* Show Products Included */}
              <div className="mt-4">
                <p className="font-semibold text-sm text-gray-700 mb-1">
                  Valid On:
                </p>

                {offer.products.slice(0, 3).map(p => (
                  <p key={p._id} className="text-sm text-gray-600">
                    • {p.name}
                  </p>
                ))}
              </div>

              <button
                onClick={() =>
                  navigate("/menu", {
                    state: {
                      offerId: offer._id,
                      offerProducts: offer.products.map(p => p._id)
                    }
                  })
                }
                className="mt-6 bg-yellow-400 text-black px-5 py-2 rounded-full font-medium hover:bg-yellow-300 transition"
              >
                Order Now
              </button>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default OffersSection;
