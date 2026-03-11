import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { providersData } from '../data/providersData';

const ProviderProfile = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const provider = providersData.find(p => p.id === parseInt(providerId));

  if (!provider) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-500">
        Provider not found
      </div>
    );
  }

  return (
    <div className="bg-slate-50 py-14 animate-fade-in">
      <div className="max-w-7xl mx-auto px-6">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-slate-600 hover:text-slate-900"
        >
          ← Back to Providers
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-[0_6px_24px_rgba(15,23,42,0.08)] p-8 mb-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">

            <img
              src={provider.photo}
              alt={provider.name}
              className="w-32 h-32 rounded-2xl object-cover"
            />

            <div className="flex-1">
              <h1 className="text-2xl font-semibold mb-1">
                {provider.name}
              </h1>
              <p className="text-slate-500 mb-4">
                {provider.role}
              </p>

              <div className="flex flex-wrap gap-3">
                {provider.verified && (
                  <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                    ✓ Police Verified
                  </span>
                )}
                <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                  Certified Professional
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-amber-100 text-amber-700">
                  Senior-Care Trained
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left */}
          <div className="lg:col-span-2 space-y-8">

            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-3">
                About {provider.name}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {provider.name} is a dedicated professional with {provider.experience} of experience in {provider.role}.
                Known for a compassionate and reliable approach, they have successfully completed over{' '}
                <strong>{provider.reviews * 5}</strong> sessions with high satisfaction from seniors and families.
              </p>
            </section>

            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">
                Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-3">
                {provider.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 rounded-full bg-slate-100 text-sm text-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-2">
                Languages Spoken
              </h2>
              <p className="text-slate-600">
                {provider.languages.join(', ')}
              </p>
            </section>

            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">
                Reviews
              </h2>

              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-semibold text-green-600">
                  {provider.rating}
                </span>
                <span className="text-amber-400 text-lg">★★★★★</span>
                <span className="text-sm text-slate-500">
                  ({provider.reviews} reviews)
                </span>
              </div>

              <p className="text-slate-600 italic">
                “Excellent service! Very patient and understanding with my father. Highly recommended.”
              </p>
            </section>
          </div>

          {/* Right / Booking */}
          <div>
            <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-[0_10px_30px_rgba(15,23,42,0.12)]">
              <h3 className="text-lg font-semibold mb-4">
                Book Service
              </h3>

              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-slate-500">
                  Price per session
                </span>
                <span className="text-xl font-semibold text-blue-600">
                  {provider.price}
                </span>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => navigate('/booking', { state: { provider } })}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium transition"
                >
                  Book Now
                </button>

                <button
                  className="w-full border border-slate-300 hover:bg-slate-100 py-2.5 rounded-xl font-medium"
                >
                  Call for Assistance
                </button>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                Free cancellation up to 2 hours before booking.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;
