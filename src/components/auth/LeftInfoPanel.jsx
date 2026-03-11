import { useEffect, useState } from "react";

const slides = [
  {
    image: "/images/auth-bg-1.png",
    text: "Safe, peaceful homes designed for senior comfort",
  },
  {
    image: "/images/auth-bg-2.png",
    text: "Independence with care always within reach",
  },
  // Placeholder re-using image 1 until image 3 is generated
  {
    image: "/images/auth-bg-3.png",
    text: "Communities built on dignity, trust, and warmth",
  },
];

export default function LeftInfoPanel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-full w-full bg-slate-900 overflow-hidden">
      {/* Background Images with Fade Transition */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === index ? "opacity-100" : "opacity-0"
            }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Soft Teal/Green Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-12 lg:p-16 text-white">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">
          NestCare Living
        </h1>

        <div className="h-24"> {/* Fixed height to prevent jump */}
          <p className="text-xl font-medium max-w-md leading-relaxed opacity-95 transition-all duration-500">
            {slides[index].text}
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20">
          <ul className="space-y-4 text-base font-medium opacity-90">
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
              Senior-friendly verified homes
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
              Trusted by families & builders
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</span>
              Designed for safety & dignity
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
