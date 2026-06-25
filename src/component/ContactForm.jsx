import React, { useState } from "react";
import CapybaraLoader from "./CapybaraLoader";

export default function ContactForm() {

  // ===== STATE =====
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ===== SUBMIT =====
  const handleSubmit = (e) => {
    e.preventDefault();

    // bật loading
    setLoading(true);

    // giả lập gửi dữ liệu (API)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // ẩn thông báo sau 3s
      setTimeout(() => setSuccess(false), 5000);
    }, 2000);
  };

  return (
    <div className="bg-gray-100 py-16 px-6 md:px-16 min-h-screen">

      {/* ✅ CAPYBARA LOADING */}
      {loading && <CapybaraLoader />}

      {/* TITLE */}
      <p className="text-gray-500 mb-2">Home / Contact Us</p>

      <h2 className="text-4xl font-bold text-blue-900 mb-10">
        LET'S CONNECT
      </h2>

      {/* SUCCESS MESSAGE */}
      {success && (
        <div className="max-w-7xl mx-auto mb-6 bg-green-500 text-white px-6 py-4 rounded-xl">
          ✅ Message sent successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto"
      >

        {/* LEFT FORM */}
        <div>
          <h3 className="text-xl font-bold mb-2">Send Us A Message</h3>

          <p className="text-gray-500 mb-6">
            We Always Ready To Open New Doors
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Name"
              className="p-4 rounded-xl border outline-none" />

            <input type="email" placeholder="Email"
              className="p-4 rounded-xl border outline-none" />

            <select className="p-4 rounded-xl border outline-none">
              <option>Residential For Rent</option>
              <option>Buy House</option>
              <option>Sell House</option>
            </select>

            <input type="text" placeholder="Phone number"
              className="p-4 rounded-xl border outline-none" />
          </div>

          <textarea
            placeholder="Message"
            rows="6"
            className="w-full mt-4 p-4 rounded-xl border outline-none"
          />

          <div className="flex items-start gap-3 mt-4 text-sm text-gray-600">
            <input type="checkbox" className="mt-1" />
            <p>
              By checking this box, you agree to receive SMS messages.
            </p>
          </div>

          {/* BUTTON SUBMIT */}
          <button
            type="submit"
            className="mt-6 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold"
          >
            SEND MESSAGE
          </button>
        </div>

        {/* RIGHT INFO */}
        <div className="lg:border-l lg:pl-8 space-y-8">
          <div>
            <h3 className="font-bold text-lg mb-2">Call Us</h3>
            <p className="flex items-center gap-3 text-blue-600">
              <i className="ri-phone-line text-xl"></i>
            (770)-314-0104

            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">Visit Us</h3>
            <p className="flex items-center gap-3 text-blue-600">
              <i className="ri-map-pin-line text-xl"></i>
          1010 Village Park Lane, Suite 100 Greensboro, GA 30642 
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">Mail Us</h3>
            <p className="flex items-center gap-3 text-blue-600">
              <i className="ri-mail-line text-xl"></i>
             info@houseduane.com

            </p>
          </div>

          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl">
            OUR PRIVACY POLICY
          </button>
        </div>

      </form>
    </div>
  );
}