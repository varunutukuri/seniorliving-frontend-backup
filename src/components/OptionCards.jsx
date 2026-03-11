import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OptionCards = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cityName = location.state?.location || 'your city';

  const handleOptionSelect = (id) => {
    if (id === 'services') {
      navigate('/services', { state: { location: cityName } });
    } else {
      const type = id === 'rent' ? 'rent' : 'sale';
      navigate('/properties', { state: { type, location: cityName } });
    }
  };

  const options = [
    {
      id: 'own',
      title: 'Own the Home',
      subtitle: 'Purchase verified senior-friendly homes',
      icon: '🏠',
      accent: 'blue',
    },
    {
      id: 'rent',
      title: 'Rent a Home',
      subtitle: 'Comfortable and flexible rental options',
      icon: '🔑',
      accent: 'green',
    },
    {
      id: 'services',
      title: 'Use Services',
      subtitle: 'Daily care, assistance, and support',
      icon: '🤝',
      accent: 'amber',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 animate-fade-in">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-3xl font-semibold mb-3">
          What are you looking for in <span className="text-blue-600">{cityName}</span>?
        </h2>
        <p className="text-slate-500">
          Choose one option to continue
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleOptionSelect(option.id)}
            className="
              cursor-pointer
              bg-white
              rounded-2xl
              p-8
              text-center
              shadow-[0_6px_24px_rgba(15,23,42,0.08)]
              hover:shadow-[0_12px_36px_rgba(15,23,42,0.12)]
              hover:-translate-y-1
              transition-all
              duration-200
            "
            role="button"
            tabIndex={0}
          >
            {/* Icon */}
            <div
              className={`mx-auto mb-6 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl
                ${
                  option.accent === 'blue'
                    ? 'bg-blue-100'
                    : option.accent === 'green'
                    ? 'bg-green-100'
                    : 'bg-amber-100'
                }
              `}
            >
              {option.icon}
            </div>

            <h3 className="text-xl font-semibold mb-2">
              {option.title}
            </h3>

            <p className="text-slate-500 text-sm leading-relaxed">
              {option.subtitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionCards;
