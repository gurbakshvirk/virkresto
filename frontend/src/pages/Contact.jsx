import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 pt-32 pb-20 px-6">

      {/* TITLE */}
      <div className="text-center mb-16">

        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Contact Us
        </h1>

        <p className="text-gray-600 max-w-xl mx-auto">
          We'd love to hear from you. Reach out for reservations,
          catering inquiries, or feedback.
        </p>

      </div>


      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* CONTACT INFO */}
        <div className="space-y-6">

          <div className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-2xl p-6 flex items-center gap-4 shadow-md">

            <FaPhoneAlt className="text-orange-500 text-xl" />

            <div>
              <p className="font-semibold">Phone</p>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>

          </div>


          <div className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-2xl p-6 flex items-center gap-4 shadow-md">

            <FaEnvelope className="text-red-500 text-xl" />

            <div>
              <p className="font-semibold">Email</p>
              <p className="text-gray-600">contact@virkresto.com</p>
            </div>

          </div>


          <div className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-2xl p-6 flex items-center gap-4 shadow-md">

            <FaMapMarkerAlt className="text-green-500 text-xl" />

            <div>
              <p className="font-semibold">Location</p>
              <p className="text-gray-600">
                Ludhiana, Punjab, India
              </p>
            </div>

          </div>

        </div>


        {/* CONTACT FORM */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-xl">

          <form className="space-y-5">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Contact;