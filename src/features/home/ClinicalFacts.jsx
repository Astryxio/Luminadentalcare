import React, { useEffect, useState, useRef } from "react";
import { Trophy, Users, Heart, Activity } from "lucide-react";
import facts from "./../../assets/home/facts.webp";

// --- CUSTOM HOOK FOR ANIMATING NUMBERS ---
const useCounter = (end, duration = 2000, startAnimation) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [end, duration, startAnimation]);

  return count;
};

const StatCard = ({ number, suffix, label, subLabel, inView, icon: Icon }) => {
  const count = useCounter(number, 2000, inView);

  return (
    <div className="group relative p-8 bg-[#ffffff] rounded-[2rem] border border-[#e2e8f0] hover:border-[#0d9488]/30 hover:shadow-2xl hover:shadow-[#0f766e]/10 transition-all duration-700 ease-out hover:-translate-y-2 overflow-hidden">
      {/* Gradient Top Border on Hover */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0d9488] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="flex flex-col items-center text-center relative z-10">
        {Icon && (
            <div className="mb-6 p-4 bg-[#f0fdfa] rounded-2xl text-[#0f766e] group-hover:scale-110 transition-transform duration-500 border border-[#ccfbf1]">
                <Icon size={32} strokeWidth={1.5} />
            </div>
        )}
        <h2 className="text-5xl md:text-6xl font-serif text-[#0f172a] mb-2 tracking-tight group-hover:text-[#134e4a] transition-colors">
          {count}{suffix}
        </h2>
        <p className="text-[#0d9488] text-xs font-bold tracking-[0.2em] uppercase mb-3">
          {label}
        </p>
        <p className="text-[#64748b] text-sm font-light leading-relaxed max-w-[240px]">
          {subLabel}
        </p>
      </div>
    </div>
  );
};

const ClinicalFacts = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 bg-[#f8fafc] border-t border-[#e2e8f0] overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* HEADING */}
        <div className="text-center mb-16">
          <span className="text-[#0f766e] text-[10px] font-bold tracking-[0.3em] uppercase block mb-4">
            Trusted Care
          </span>

          <h1 className="text-4xl md:text-5xl font-medium font-serif text-[#0f172a] leading-tight">
            Precision in Every <span className="italic text-[#134e4a]">Detail</span>
          </h1>

          <p className="text-[#64748b] mt-6 max-w-2xl mx-auto text-sm md:text-base font-light">
            Designed with clarity, transparency, and patient comfort at the core of every decision.
          </p>
        </div>

        {/* IMAGE BLOCK */}
        <div className="relative mb-20 overflow-hidden rounded-[2.5rem] group shadow-2xl shadow-[#e2e8f0]">
          <img
            src={facts}
            alt="Clinical Environment"
            className="w-full h-[420px] object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-40" />
          
          {/* Floating Badge */}
           <div className="absolute bottom-8 left-8 bg-[#ffffff]/95 backdrop-blur-md p-6 rounded-2xl hidden md:flex items-center gap-5 shadow-xl border border-[#ffffff]/50 animate-float">
                <div className="w-14 h-14 rounded-full bg-[#f0fdfa] flex items-center justify-center text-[#0f766e]">
                        <Activity size={28} />
                </div>
                <div>
                    <p className="text-[10px] font-bold uppercase text-[#94a3b8] tracking-wider mb-1">Clinical Excellence</p>
                    <p className="text-xl font-serif text-[#0f172a] leading-none">Top Rated Facility</p>
                </div>
           </div>
        </div>

        {/* FACTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard
            number={10}
            suffix="+"
            label="Years of Practice"
            subLabel="Consistent clinical care and patient trust."
            inView={inView}
            icon={Trophy}
          />
          <StatCard
            number={25}
            suffix="K"
            label="Cases Managed"
            subLabel="Across preventive, restorative, and cosmetic care."
            inView={inView}
            icon={Users}
          />
          <StatCard
            number={100}
            suffix="%"
            label="Patient Focus"
            subLabel="Commitment to comfort, clarity, and outcomes."
            inView={inView}
            icon={Heart}
          />
        </div>

      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ClinicalFacts;
