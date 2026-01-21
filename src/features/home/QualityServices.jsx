import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { 
  ShieldCheck, 
  Star, 
  Activity, 
  Zap, 
  ArrowRight,
} from "lucide-react";

 

// Intersection Observer Hook
const useReveal = (delay = 0, threshold = 0.1) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
            setIsRevealed(true);
        }, delay); 
        observer.disconnect();
      }
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay, threshold]);
  return [ref, isRevealed];
};

// --- COMPONENTS ---

const ServiceCard = ({ item, index }) => {
  // Snappy, professional staggered delay
  const [ref, isRevealed] = useReveal(100 + (index * 100), 0.1);

  return (
    <div 
      ref={ref}
      className={`group flex flex-col bg-[#ffffff] rounded-[2rem] border border-[#e2e8f0] overflow-hidden hover:shadow-2xl hover:shadow-[#0f766e]/10 transition-all duration-700 ease-out h-full hover:-translate-y-2
      ${isRevealed ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}`}
    >
      {/* Image Area */}
      <div className="relative h-60 overflow-hidden">
        <div className="absolute inset-0 bg-[#f1f5f9] animate-pulse" style={{ display: isRevealed ? 'none' : 'block' }}></div>
        <img 
          src={item.img} 
          alt={item.title}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105
          ${isRevealed ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
        />
        <div className="absolute top-4 left-4 bg-[#ffffff]/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-[#ffffff]/50 text-[#0f766e]">
           {React.cloneElement(item.icon, { size: 24, className: "text-[#0f172a]" })}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col grow relative">
        <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#0d9488] uppercase">
                0{index + 1}
            </span>
            <div className="h-[1px] bg-[#ccfbf1] flex-grow"></div>
        </div>
        
        <h3 className="text-2xl font-medium text-[#0f172a] font-serif mb-3 group-hover:text-[#134e4a] transition-colors">
          {item.title}
        </h3>
        
        <p className="text-[#64748b] text-sm leading-relaxed mb-8 font-light grow break-words">
          {item.desc}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mt-auto">
            {item.features.slice(0, 3).map((feature, i) => (
                <span key={i} className="px-3 py-1 bg-[#f0fdfa] border border-[#ccfbf1] rounded-full text-[10px] font-bold text-[#0f766e] uppercase tracking-wide">
                    {feature}
                </span>
            ))}
        </div>
        
        <div className="mt-8 pt-4 border-t border-[#f8fafc]">
            <NavLink to={`/services/${item.id}/${item.slug}`} className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#0f172a] hover:text-[#0f766e] transition-colors group/link">
                <span>View Protocol</span>
                <div className="w-8 h-8 rounded-full bg-[#f1f5f9] flex items-center justify-center group-hover/link:bg-[#0f766e] group-hover/link:text-[#ffffff] transition-all">
                    <ArrowRight size={14} />
                </div>
            </NavLink>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
const QualityServices = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  const services = [
    {
      id: "1",
      slug: "general-care",
      title: "Preventive & Diagnostics",
      subtitle: "Diagnostics",
      desc: "Advanced AI-assisted imaging to detect early signs of decay. Focused on longevity through minimal intervention.",
      features: ["AI Scanning", "3D X-Rays", "Bio-Screening"],
      img: "/serviceimages/service1.webp",
      icon: <ShieldCheck />
    },
    {
      id: "2",
      slug: "smile-design",
      title: "Smile Architecture",
      subtitle: "Aesthetics",
      desc: "Microscopic veneers and digital previews. We engineer aesthetics that are indistinguishable from natural teeth.",
      features: ["Digital Mockups", "Veneers", "Whitening"],
      img: "/serviceimages/service2.webp",
      icon: <Star />
    },
    {
      id: "3",
      slug: "implant-dentistry",
      title: "Bionic Restoration",
      subtitle: "Restoration",
      desc: "Guided surgery for permanent replacement. Titanium implants that restore 99% of original function.",
      features: ["Guided Surgery", "Bone Grafting", "Lifetime Warranty"],
      img:"/serviceimages/service3.webp",
      icon: <Activity />
    },
    {
      id: "4",
      slug: "Orthodontics",
      title: "Invisible Alignment",
      subtitle: "Orthodontics",
      desc: "High-clarity aligners with accelerated movement technology. Perfect alignment without the metal wires.",
      features: ["Clear Aligners", "Retainers", "Remote Monitoring"],
      img:  "/serviceimages/service4.webp",
      icon: <Zap />
    }
  ];


  return (
    <div className="font-sans bg-[#f8fafc] text-[#0f172a] overflow-hidden selection:bg-[#134e4a] selection:text-[#ffffff]">
      
      {/* =========================================
           2. MAIN SERVICES GRID
          ========================================= */}
    <section className="py-24 bg-[#f8fafc] relative">

        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-50"></div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          
          <div className="mb-24 text-center max-w-3xl mx-auto">
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#0f766e] uppercase mb-4 block">Our Expertise</span>
                <h2 className="text-4xl md:text-5xl font-medium text-[#0f172a] font-serif tracking-tight mb-6">Clinical Protocols</h2>
                <p className="text-[#64748b] font-light text-lg">
                  Experience a curated selection of advanced dental treatments designed for longevity, aesthetics, and optimal health.
                </p>
                <div className="w-16 h-1 bg-[#134e4a] mx-auto mt-8 rounded-full opacity-20"></div>
          </div>

          {/* THE GRID: Professional Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {services.map((item, index) => (
              <ServiceCard key={item.id} item={item} index={index} />
            ))}
          </div>

        </div>
      </section>

     <section className="pb-24 pt-8 text-center bg-[#f8fafc]">
        <NavLink
          to="/services"
          className="
            group
            inline-flex items-center justify-center gap-3
            px-10 py-4
            bg-[#ffffff] border border-[#e2e8f0]
            text-[#0f172a]
            text-xs font-bold uppercase tracking-widest
            rounded-full
            shadow-sm hover:shadow-xl hover:border-[#ccfbf1] hover:text-[#0f766e]
            transition-all duration-300 transform hover:-translate-y-1
          "
        >
          <span>Explore All Services</span>
          <ArrowRight size={14} className="text-[#0d9488] group-hover:translate-x-1 transition-transform" />
        </NavLink>
    </section>

    </div>
  );
};
export default QualityServices;