import React, { useState } from "react";

export default function Feature() {
  const [type, setType] = useState("Buy");
  const [location, setLocation] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");

  const handleSearch = () => {
  window.open(
    "https://duanesells.georgiamls.com/idxsearch/",
    "_blank"
  );
};

  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div>
          <h2 className="text-4xl font-bold text-blue-900 mb-6">
            Find Your Dream Home
          </h2>

          <p className="text-gray-600 leading-8 mb-10">
            Search thousands of homes for sale across Georgia.
            Find properties by city, bedrooms, bathrooms, and more.
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-wrap items-end gap-4">

            {/* TYPE */}
            <div className="flex flex-col min-w-[180px]">
              <label className="font-semibold text-sm mb-2">
                Property Type
              </label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border rounded-lg p-3"
              >
                <option value="Buy">Buy</option>
                <option value="Rent">Rent</option>
              </select>
            </div>

            {/* LOCATION */}
            <div className="flex flex-col min-w-[180px]">
              <label className="font-semibold text-sm mb-2">
                Location
              </label>

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border rounded-lg p-3"
              >
                <option value="">Select Location</option>
                <option value="Atlanta">Atlanta</option>
                <option value="Alpharetta">Alpharetta</option>
                <option value="Roswell">Roswell</option>
                <option value="Marietta">Marietta</option>
                <option value="Duluth">Duluth</option>
                <option value="Buford">Buford</option>
                <option value="Lake Oconee">Lake Oconee</option>
              </select>
            </div>

            {/* BEDS */}
            <div className="flex flex-col min-w-[140px]">
              <label className="font-semibold text-sm mb-2">
                Beds
              </label>

              <select
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className="border rounded-lg p-3"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>

            {/* BATHS */}
            <div className="flex flex-col min-w-[140px]">
              <label className="font-semibold text-sm mb-2">
                Baths
              </label>

              <select
                value={baths}
                onChange={(e) => setBaths(e.target.value)}
                className="border rounded-lg p-3"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleSearch}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition"
            >
              EXPLORE NOW
            </button>

          </div>
        </div>

        {/* RIGHT */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <img
              src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
              alt=""
              className="rounded-2xl h-40 w-full object-cover"
            />

            <img
              src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c"
              alt=""
              className="rounded-2xl h-56 w-full object-cover"
            />
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              alt=""
              className="rounded-2xl h-full w-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}