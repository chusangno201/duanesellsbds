import React from "react";

export default function Homepage() {
  return (
    <section>
       {/* LIST */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  
  {/* CARD 1 */}
  <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition">
    <img src="/listhouse2.jpg" className="w-full h-64 object-cover" />
    <div className="p-5">
      <p className="text-blue-600 font-medium">
        3258 Richards Drive, Snellville, GA 30039
      </p>

      
      <p className="text-red-500 text-2xl font-bold">$2,150</p>
 <p className="text-green-600 text-sm mt-1">Available NOW</p>
      <h3 className="font-bold text-lg mt-2">
        NEWLY RENOVATED: 3 Bedroom Ranch i...
      </h3>
      

      <div className="flex gap-6 mt-4 text-gray-600">
        <span className="flex items-center gap-1">
          <i className="ri-hotel-bed-line"></i> 3 Beds
        </span>
        <span className="flex items-center gap-1">
          <i className="ri-showers-line"></i> 2 Baths
        </span>
      </div>

      <div className="flex gap-4 mt-5 ">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          DETAILS
        </button>
        <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg">
          APPLY
        </button>
      </div>
    </div>
  </div>

  {/* CARD 2 */}
  <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition">
    <img src="/listhouse7.jpg" className="w-full h-64 object-cover" />
    <div className="p-5">
      <p className="text-blue-600 font-medium">
        4529 Thompson Mill Road, Buford, GA 30518
      </p>

      <p className="text-red-500 text-2xl font-bold">$2,250</p>

      <p className="text-green-600 text-sm mt-1">Available NOW</p>

      <h3 className="font-bold text-lg mt-2">
        Nice 2-story house in the City of BUFOR...
      </h3>

      <div className="flex gap-6 mt-4 text-gray-600">
        <span className="flex items-center gap-1">
          <i className="ri-hotel-bed-line"></i> 3 Beds
        </span>
        <span className="flex items-center gap-1">
          <i className="ri-showers-line"></i> 2 Baths
        </span>
      </div>

      <div className="flex gap-4 mt-5">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          DETAILS
        </button>
        <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg">
          APPLY
        </button>
      </div>
    </div>
  </div>

  {/* CARD 3 */}
  <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition">
    <img src="/listhouse.jpg" className="w-full h-64 object-cover" />
    <div className="p-5">
      <p className="text-blue-600 font-medium">
        2690 Tucker Valley Road, Tucker, GA 30084
      </p>


      <p className="text-red-500 text-2xl font-bold">$1,450</p>

      <p className="text-green-600 text-sm mt-1">Available NOW</p>

      <h3 className="font-bold text-lg mt-2">
        Newly RENOVATED 2-bedroom...
      </h3>

      <div className="flex gap-6 mt-4 text-gray-600">
        <span className="flex items-center gap-1">
          <i className="ri-hotel-bed-line"></i> 2 Beds
        </span>
        <span className="flex items-center gap-1">
          <i className="ri-showers-line"></i> 1 Baths
        </span>
      </div>

      <div className="flex gap-4 mt-5">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          DETAILS
        </button>
        <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg">
          APPLY
        </button>
      </div>
    </div>
  </div>

</div>
    </section>
  );
}