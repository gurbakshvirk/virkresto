const Footer = () => {
  return (
    <footer className="bg-white border-t-1 border-black  px-6 py-16 text-black md:px-20">

      <div className="grid gap-12 md:grid-cols-3">

        {/* Brand */}
        <div>
          <h1 className="text-3xl font-bold">DeliEat</h1>
          <p className="mt-4 max-w-sm text-sm text-black">
            Serving delicious food with passion. Dine in, takeaway, or order online
            and experience quality like never before.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
          <ul className="space-y-3 text-black">
            <li className="hover:text-black transition cursor-pointer">Home</li>
            <li className="hover:text-black transition cursor-pointer">About Us</li>
            <li className="hover:text-black transition cursor-pointer">Reservations</li>
            <li className="hover:text-black transition cursor-pointer">Order Online</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Contact Us</h2>
          <ul className="space-y-3 text-black">
            <li>📍 New Delhi, India</li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ contact@delieat.com</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="mt-16 border-t-1 border-black pt-6 text-center text-sm text-black">
        © {new Date().getFullYear()} DeliEat. All rights reserved.
      </div>

    </footer>
  )
}

export default Footer
