import React from "react";
import { Link } from "react-router-dom";

const topAgents = [
  {
    name: "Duane Sells",
    title: "Luxury Real Estate Advisor",
    portfolio: "$812M",
    image: "/sells-Duane.jpeg",
    link: "/duane-sells",
    description:
      "Duane Sells is recognized for leading high-value property transactions with a strong reputation in luxury real estate, strategic investment guidance, and client-focused service.",
  },
  {
    name: "Branson Morris",
    title: "Senior Realtor",
    portfolio: "$35M",
    image: "/1000020860.jpg",
    link: "/",
    description:
      "Branson Morris specializes in residential and commercial real estate, helping clients secure the right opportunities through market expertise, negotiation strength, and personalized support.",
  },
  {
    name: "Denise Parker",
    title: "Residential Property Specialist",
    portfolio: "$28M",
    image: "/Denise.jpg",
    link: "/",
    description:
      "Denise Parker is known for her design insight, home presentation expertise, and commitment to guiding buyers and sellers through smooth and rewarding property transitions.",
  },
  {
    name: "Michelle Gilley",
    title: "Residential Property Specialist",
    portfolio: "$8M",
    image: "/",
    link: "/Mechelle",
    description:
      ".",
  },
];

export default function Near() {
  return (
    <section className="bg-gray-100 py-20 px-6 md:px-12">
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Top Home Selling Experts
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed">
          Explore our leading real estate professionals with proven success in
          luxury homes, residential sales, and premium property investments.
        </p>
      </div>

      {/* AGENTS LIST */}
      <div className="max-w-6xl mx-auto space-y-8">
        {topAgents.map((agent, index) => (
          <Link to={agent.link} key={index}>
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 p-6 flex flex-col md:flex-row gap-6 items-start">
              <img
                src={agent.image}
                alt={agent.name}
                className="w-24 h-24 object-cover rounded-xl"
              />

              <div className="flex-1">
                <h4 className="text-xl md:text-2xl font-semibold text-gray-900">
                  {agent.name}
                </h4>

                <p className="text-gray-500 font-medium mb-1">{agent.title}</p>

                <p className="text-red-500 font-semibold mb-3">
                  Portfolio Value: {agent.portfolio}
                </p>

                <p className="text-gray-600 leading-relaxed">
                  {agent.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}