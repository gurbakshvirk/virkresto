import { FaUtensils, FaLeaf, FaHeart } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 pt-32 pb-20 px-6">

      {/* HERO */}
      <div className="max-w-6xl mx-auto text-center mb-16">

        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          About Delieat
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          At Delieat, we believe food is more than just a meal — it's an
          experience. Our kitchen brings together authentic flavors, fresh
          ingredients, and a passion for culinary excellence.
        </p>

      </div>


      {/* STORY SECTION */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-20">

        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
          className="rounded-3xl shadow-lg object-cover w-full h-[420px]"
          alt="restaurant"
        />

        <div>

          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            Our Story
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            Delieat started with a simple mission: to serve food that
            makes people happy. From traditional flavors to modern cuisine,
            every dish we prepare is crafted with love and attention.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Our chefs combine experience and creativity to bring you a
            memorable dining experience whether you're enjoying a quick
            meal, celebrating with friends, or ordering online.
          </p>

        </div>

      </div>


      {/* VALUES */}
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-semibold text-center mb-12">
          What Makes Us Special
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition">

            <FaUtensils className="text-4xl text-orange-500 mx-auto mb-4" />

            <h3 className="text-xl font-semibold mb-3">
              Delicious Food
            </h3>

            <p className="text-gray-600">
              Our menu features carefully crafted dishes made with
              premium ingredients and authentic recipes.
            </p>

          </div>


          <div className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition">

            <FaLeaf className="text-4xl text-green-500 mx-auto mb-4" />

            <h3 className="text-xl font-semibold mb-3">
              Fresh Ingredients
            </h3>

            <p className="text-gray-600">
              We prioritize freshness by sourcing the best ingredients
              for every meal we serve.
            </p>

          </div>


          <div className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition">

            <FaHeart className="text-4xl text-red-500 mx-auto mb-4" />

            <h3 className="text-xl font-semibold mb-3">
              Passion for Food
            </h3>

            <p className="text-gray-600">
              Cooking is our passion. Every dish is prepared with
              dedication to taste and presentation.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default About;