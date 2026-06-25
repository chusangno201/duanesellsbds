import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <section>
      <footer className="relative text-white">
        {/* BACKGROUND */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1505761671935-60b3a7427bad')",
          }}
        ></div>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-blue-900/80"></div>

        {/* CONTENT */}
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-12">
            {/* CONTACT */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Contact us</h3>

              <div className="space-y-4 text-gray-200">
                <p> 1010 Village Park Lane, Suite 100 Greensboro, GA 30642</p>
                <p> (770)-314-0104</p>
                <p>info@houseduane.com</p>
              </div>
            </div>

            {/* USEFUL LINKS */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Useful links</h3>

              <div className="grid grid-cols-2 gap-3 text-gray-200">
                <Link to="#" className="hover:text-white">
                  Home
                </Link>
                <Link to="#" className="hover:text-white">
                  Residential
                </Link>
                <Link to="#" className="hover:text-white">
                  Commercial
                </Link>
                <Link to="#" className="hover:text-white">
                  Management
                </Link>
                <Link to="#" className="hover:text-white col-span-2">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* SUBSCRIBE */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Subscribe to our newsletter
              </h3>

              <p className="text-gray-300 mb-4 text-sm">
                Be the first one to know about discounts, offers and events
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg text-black outline-none"
                />
                <button className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-semibold">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-white/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            {/* SOCIAL */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300">
                Follow us on Social Media:
              </span>

              <div className="flex gap-3">
                <div className="bg-white/20 p-2 rounded-full hover:bg-white/40 cursor-pointer">
                  <FaFacebookF />
                </div>
                <div className="bg-white/20 p-2 rounded-full hover:bg-white/40 cursor-pointer">
                  <FaInstagram />
                </div>
              </div>
            </div>

            {/* COPYRIGHT */}
            <p className="text-sm text-gray-300 text-center">
              © {new Date().getFullYear()} NDIMAXIM Real Estate | Designed by
              You
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
