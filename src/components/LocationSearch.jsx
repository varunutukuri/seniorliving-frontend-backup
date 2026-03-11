import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import mumbaiIcon from '../assets/icons/mumbai.png';
import delhiIcon from '../assets/icons/delhi.png';
import bengaluruIcon from '../assets/icons/bengaluru.png';
import hyderabadIcon from '../assets/icons/hyderabad.png';
import chandigarhIcon from '../assets/icons/chandigarh.png';
import ahmedabadIcon from '../assets/icons/ahmedabad.png';
import puneIcon from '../assets/icons/pune.png';
import chennaiIcon from '../assets/icons/chennai.png';
import kolkataIcon from '../assets/icons/kolkata.png';
import kochiIcon from '../assets/icons/kochi.png';

const LocationSearch = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleLocationSelect = (location) => {
    navigate('/options', { state: { location } });
  };

  const popularCities = [
    { name: 'Mumbai', icon: mumbaiIcon },
    { name: 'Delhi-NCR', icon: delhiIcon },
    { name: 'Bengaluru', icon: bengaluruIcon },
    { name: 'Hyderabad', icon: hyderabadIcon },
    { name: 'Chandigarh', icon: chandigarhIcon },
    { name: 'Ahmedabad', icon: ahmedabadIcon },
    { name: 'Pune', icon: puneIcon },
    { name: 'Chennai', icon: chennaiIcon },
    { name: 'Kolkata', icon: kolkataIcon },
    { name: 'Kochi', icon: kochiIcon },
  ];

  const handleSearch = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      handleLocationSelect(query);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 px-6">
      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-[0_6px_24px_rgba(15,23,42,0.08)] p-5 flex items-center gap-4">
        <span className="text-slate-400 text-lg">🔍</span>
        <input
          type="text"
          placeholder="Search for your city"
          className="w-full text-base outline-none placeholder:text-slate-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      {/* Popular Cities */}
      <div className="mt-10">
        <h4 className="text-sm font-semibold text-slate-600 mb-5 tracking-wide">
          POPULAR CITIES
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {popularCities.map((city) => (
            <div
              key={city.name}
              onClick={() => handleLocationSelect(city.name)}
              className="
                cursor-pointer 
                bg-white 
                rounded-2xl 
                p-4 
                flex 
                flex-col 
                items-center 
                gap-3
                shadow-[0_4px_16px_rgba(15,23,42,0.06)]
                hover:shadow-[0_10px_28px_rgba(15,23,42,0.1)]
                hover:-translate-y-1
                transition-all 
                duration-200
              "
            >
              <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center">
                <img
                  src={city.icon}
                  alt={city.name}
                  className="w-8 h-8 object-contain"
                />
              </div>

              <span className="text-sm font-medium text-slate-700">
                {city.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
