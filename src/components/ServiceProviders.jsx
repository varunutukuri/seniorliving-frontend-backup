import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { providersData } from '../data/providersData';
import { servicesData } from '../data/servicesData';

const ServiceProviders = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const service = servicesData[categoryId];

  const providers = providersData.filter(
    (p) => p.serviceId === categoryId
  );

  return (
    <div className="bg-slate-50 py-14 animate-fade-in">
      <div className="max-w-7xl mx-auto px-6">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-slate-600 hover:text-slate-900"
        >
          ← Back to Options
        </button>

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold mb-2">
            Verified Professionals
          </h1>
          <p className="text-slate-500">
            Select a trusted expert for {service?.title}
          </p>
        </div>

        {/* Providers Grid */}
        {providers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className="
                  bg-white
                  rounded-2xl
                  p-6
                  shadow-[0_6px_24px_rgba(15,23,42,0.08)]
                  hover:shadow-[0_12px_36px_rgba(15,23,42,0.12)]
                  hover:-translate-y-1
                  transition-all
                  duration-200
                "
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={provider.photo}
                    alt={provider.name}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {provider.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {provider.role}
                    </p>

                    <div className="flex items-center gap-2 text-sm mt-1">
                      <span className="text-amber-400">★</span>
                      <span className="font-medium">
                        {provider.rating}
                      </span>
                      <span className="text-slate-400">
                        ({provider.reviews})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Verified */}
                {provider.verified && (
                  <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                    ✓ CareConnect Verified
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div className="bg-slate-100 rounded-xl p-3 text-center">
                    <p className="text-slate-500">Experience</p>
                    <p className="font-semibold">{provider.experience}</p>
                  </div>
                  <div className="bg-slate-100 rounded-xl p-3 text-center">
                    <p className="text-slate-500">Availability</p>
                    <p className="font-semibold text-green-600">
                      {provider.availability}
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {provider.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-blue-600">
                    {provider.price}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/provider/${provider.id}`)
                      }
                      className="px-4 py-2 text-sm border border-slate-300 rounded-xl hover:bg-slate-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() =>
                        navigate('/booking', {
                          state: { provider, service },
                        })
                      }
                      className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-500 py-20">
            No providers found for this category yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceProviders;
