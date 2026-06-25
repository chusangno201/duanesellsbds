import React from "react";
import Footer from "../component/Footer";
import Header from "../component/Header";

export default function SellHome() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1f1f1f]">
        <Header />
      
      {/* HERO */}
      <section className="relative h-[60vh] flex items-center justify-center text-center bg-gray-100">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sell Your Home With Confidence
          </h1>
          <p className="text-gray-600 mb-6">
            Get top value with expert guidance and powerful marketing strategies
          </p>
          <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800">
            Get Free Home Valuation
          </button>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          Why Sell With Us
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-xl hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">
              Accurate Pricing
            </h3>
            <p className="text-gray-600 text-sm">
              We analyze the market to price your home competitively.
            </p>
          </div>

          <div className="p-6 border rounded-xl hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">
              Professional Marketing
            </h3>
            <p className="text-gray-600 text-sm">
              High-quality photos, listings, and online exposure.
            </p>
          </div>

          <div className="p-6 border rounded-xl hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">
              Expert Negotiation
            </h3>
            <p className="text-gray-600 text-sm">
              We help you get the best deal possible.
            </p>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="bg-gray-50 py-16 px-6 md:px-20">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          Selling Process
        </h2>

        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[
            "Consultation",
            "Pricing & Listing",
            "Marketing",
            "Close the Deal",
          ].map((step, index) => (
            <div key={index} className="p-6">
              <div className="text-2xl font-bold mb-2">
                0{index + 1}
              </div>
              <p className="text-gray-600">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Ready to Sell?
        </h2>
        <p className="text-gray-600 mb-6">
          Let’s get your home sold at the best price.
        </p>
        <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800">
          Contact an Agent
        </button>
      </section>

  
      <Footer />
    </div>
  );
}