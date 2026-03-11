import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PropertyGrid = () => {
  const locationState = useLocation().state || {};
  const { type, location } = locationState;
  const navigate = useNavigate();

  const properties = [
    {
      id: 1,
      image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Property+1',
      type: '2 BHK Flat',
      price: type === 'rent' ? '₹25,000 / month' : '₹85 Lakhs',
      area: '1200 sqft',
      location: `${location || 'Mumbai'} · Andheri West`,
      status: 'Ready to Move',
    },
    {
      id: 2,
      image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Property+2',
      type: '3 BHK Villa',
      price: type === 'rent' ? '₹45,000 / month' : '₹1.5 Crores',
      area: '1800 sqft',
      location: `${location || 'Mumbai'} · Juhu`,
      status: 'Ready to Move',
    },
    {
      id: 3,
      image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Property+3',
      type: '1 BHK Studio',
      price: type === 'rent' ? '₹18,000 / month' : '₹55 Lakhs',
      area: '650 sqft',
      location: `${location || 'Mumbai'} · Goregaon`,
      status: 'Ready to Move',
    },
  ];

  return (
    <div className="bg-slate-50 py-14 animate-fade-in">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-slate-600 hover:text-slate-900"
        >
          ← Back
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-10">
          {type === 'rent' ? 'Properties for Rent' : 'Properties for Sale'} in{' '}
          <span className="text-blue-600">{location}</span>
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="
                bg-white
                rounded-2xl
                overflow-hidden
                shadow-[0_6px_24px_rgba(15,23,42,0.08)]
                hover:shadow-[0_12px_36px_rgba(15,23,42,0.12)]
                hover:-translate-y-1
                transition-all
                duration-200
              "
            >
              {/* Image */}
              <img
                src={property.image}
                alt={property.type}
                className="w-full h-48 object-cover"
              />

              {/* Details */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">
                    {property.type}
                  </h3>
                  <span className="text-blue-600 font-semibold">
                    {property.price}
                  </span>
                </div>

                <p className="text-sm text-slate-500 mb-3">
                  📍 {property.location}
                </p>

                <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                  <span>{property.area}</span>
                  <span className="text-green-600 font-medium">
                    ● {property.status}
                  </span>
                </div>

                <button
                  className="
                    w-full
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    py-2.5
                    rounded-xl
                    font-medium
                    transition
                  "
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyGrid;
