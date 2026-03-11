import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { servicesData } from '../data/servicesData';

const ServiceDetail = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const service = servicesData[categoryId];

  if (!service) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-500">
        Service not found
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
          ← Back to Services
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-[0_6px_24px_rgba(15,23,42,0.08)] p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
              {service.icon}
            </div>

            <div>
              <h1 className="text-2xl font-semibold mb-2">
                {service.title}
              </h1>
              <p className="text-slate-600 max-w-2xl leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8">

            {/* Covered */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">
                What is covered
              </h2>
              <ul className="space-y-2 text-slate-600">
                {service.covered.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-600 font-semibold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Not Covered */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">
                What is not covered
              </h2>
              <ul className="space-y-2 text-slate-600">
                {service.notCovered.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-red-500 font-semibold">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">
                What we need from you
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {service.requirements.map((req, index) => (
                  <div
                    key={index}
                    className="bg-slate-100 rounded-xl p-4 flex flex-col items-center gap-2 text-center"
                  >
                    <span className="text-2xl">{req.icon}</span>
                    <span className="text-sm text-slate-700">
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN – SERVICE OPTIONS */}
          <div>
            <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-[0_10px_30px_rgba(15,23,42,0.12)]">
              <h2 className="text-lg font-semibold mb-6">
                Select a Service
              </h2>

              <div className="space-y-4">
                {service.options.map((option) => (
                  <div
                    key={option.id}
                    className="border border-slate-200 rounded-xl p-4 hover:border-blue-400 transition"
                  >
                    <div className="mb-3">
                      <h3 className="font-semibold">
                        {option.name}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {option.duration}
                      </p>
                      <p className="text-blue-600 font-semibold mt-1">
                        {option.price}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        navigate(`/services/${categoryId}/providers`)
                      }
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium transition"
                    >
                      Select
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
