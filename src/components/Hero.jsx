import React from 'react';
import heroBg from '../assets/hero-bg.png';

const Hero = () => {
  return (
    <section
      className="relative min-h-[85vh] flex items-center"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark + Warm overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/50 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-2xl text-white">

          {/* Trust badge */}
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm mb-6">
            ✔ India’s Trusted Senior Living Platform
          </span>

          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Live in care your <br />
            <span className="text-blue-300">family will love</span>
          </h1>

          <p className="mt-5 text-lg text-slate-200 leading-relaxed">
            Verified senior-friendly homes designed for comfort, safety,
            and peace of mind — helping families make confident decisions.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-medium transition">
              Browse Homes
            </button>

            <button className="bg-white/10 hover:bg-white/20 text-white px-7 py-3 rounded-xl font-medium backdrop-blur transition">
              List Your Property
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex gap-6 text-sm text-slate-200">
            <span className="flex items-center gap-2 text-green-400">✔ 500+ Verified</span>
            <span className="flex items-center gap-2 text-green-400">✔ Accessibility Checked</span>
            <span className="flex items-center gap-2 text-amber-400">★ 4.8/5 Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
