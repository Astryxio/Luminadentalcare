import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Stethoscope, 
  ShieldCheck, 
  Sparkles, 
  Activity, 
  Clock, 
  ChevronRight,
  ArrowUpRight,
  Zap,
  Microscope,
  Database
} from "lucide-react";

// =========================================
// 1. CONSTANTS & DATA
// =========================================

const DENTAL_PROCEDURES = [
  {
    id: "cos-01",
    title: "Laser Teeth Whitening",
    category: "Cosmetic",
    description: "Using proprietary cold-laser technology to brighten enamel by up to 8 shades in a single session with zero sensitivity.",
    duration: "45 mins",
    successRate: "99.8%"
  },
  {
    id: "imp-02",
    title: "Zirconia Implants",
    category: "Surgery",
    description: "Bio-compatible, metal-free implants that integrate perfectly with your bone structure for a natural feel and look.",
    duration: "90 mins",
    successRate: "98.5%"
  },
  {
    id: "ortho-03",
    title: "Clear-Align AI",
    category: "Preventive",
    description: "Digital orthodontics using AI-driven progress tracking to straighten teeth 40% faster than traditional methods.",
    duration: "15 mins (scan)",
    successRate: "99.5%"
  },
  {
    id: "gen-04",
    title: "Digital Oral Screening",
    category: "General",
    description: "Advanced 3D mapping of your oral cavity to detect early signs of decay or structural weakness before they become issues.",
    duration: "30 mins",
    successRate: "100%"
  },
  {
    id: "sur-05",
    title: "Robotic Root Canal",
    category: "Surgery",
    description: "Micro-precision robotic endodontics ensuring complete canal sterilization with minimal tissue disturbance and faster healing.",
    duration: "60 mins",
    successRate: "99.1%"
  },
  {
    id: "cos-06",
    title: "Ven-Ultra Porcelain",
    category: "Cosmetic",
    description: "Ultra-thin nanoceramic veneers crafted with 5-axis milling for perfect edge adaptation and natural light translucency.",
    duration: "120 mins",
    successRate: "99.9%"
  },
  {
    id: "gen-07",
    title: "Molecular Cleaning",
    category: "General",
    description: "Deep periodontal therapy using molecular-level air polishing to remove 100% of biofilm without touching the tooth surface.",
    duration: "40 mins",
    successRate: "100%"
  },
  {
    id: "ortho-08",
    title: "Smart Retainers",
    category: "Preventive",
    description: "Bluetooth-enabled retainers that track wear time and pressure, alerting your specialist via cloud-sync for real-time monitoring.",
    duration: "20 mins",
    successRate: "99.7%"
  }
];

// =========================================
// 2. SUBCOMPONENTS
// =========================================

/**
 * ServiceCard Component
 * Displays individual service details with hover effects and entrance animation.
 */
const ServiceCard = memo(({ service, index, revealed }) => {
  const navigate = useNavigate();

  const getServiceIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'cosmetic': return <Sparkles className="w-5 h-5" />;
      case 'surgery': return <Activity className="w-5 h-5" />;
      case 'preventive': return <ShieldCheck className="w-5 h-5" />;
      case 'general': return <Microscope className="w-5 h-5" />;
      default: return <Stethoscope className="w-5 h-5" />;
    }
  };

  const handleBook = useCallback(() => {
    navigate("/appointment", { state: { serviceId: service.id } });
  }, [navigate, service.id]);

  return (
    <div 
      className={`
        group relative flex flex-col h-full bg-[#ffffff] border border-[#e2e8f0] rounded-[2rem] overflow-hidden
        transition-all duration-700 cubic-bezier(0.2, 0.8, 0.2, 1)
        hover:border-[#0d9488]/30 hover:shadow-2xl hover:shadow-[#0f766e]/10 hover:-translate-y-2
        ${revealed ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Gradient Top Border on Hover */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0d9488] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="p-8 flex flex-col h-full">
        {/* Header: Icon & Category */}
        <div className="flex items-start justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#f0fdfa] border border-[#ccfbf1] flex items-center justify-center text-[#0f766e] group-hover:scale-110 transition-transform duration-500 shadow-sm">
            {getServiceIcon(service.category)}
          </div>
          <span className="px-3 py-1 rounded-full bg-[#f0fdfa] border border-[#ccfbf1] text-[10px] font-bold uppercase tracking-widest text-[#0d9488]">
            {service.category}
          </span>
        </div>

        {/* Content */}
        <div className="mb-6 flex-grow">
          <h3 className="text-2xl font-medium text-[#0f172a] font-serif mb-3 group-hover:text-[#134e4a] transition-colors leading-tight">
            {service.title}
          </h3>
          <p className="text-[#64748b] text-sm leading-relaxed font-light">
            {service.description}
          </p>
        </div>

        {/* Technical Data Grid */}
        <div className="grid grid-cols-2 gap-4 py-4 border-t border-[#f1f5f9] mb-6">
          <div>
            <div className="flex items-center text-[10px] font-bold text-[#94a3b8] mb-1 uppercase tracking-wider">
              <Clock className="w-3 h-3 mr-1.5" />
              Duration
            </div>
            <div className="font-mono text-sm text-[#0f172a] font-medium">
              {service.duration}
            </div>
          </div>
          <div>
            <div className="flex items-center text-[10px] font-bold text-[#94a3b8] mb-1 uppercase tracking-wider">
              <Zap className="w-3 h-3 mr-1.5" />
              Precision
            </div>
            <div className="font-mono text-sm text-[#0f172a] font-medium">
              {service.successRate}
            </div>
          </div>
        </div>

        {/* Action */}
        <button 
          onClick={handleBook}
          className="w-full mt-auto py-3.5 px-4 rounded-xl bg-[#f8fafc] text-[#0f172a] text-xs font-bold uppercase tracking-widest border border-[#e2e8f0] hover:bg-[#134e4a] hover:text-[#ffffff] hover:border-[#134e4a] transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-sm"
        >
          Book Procedure
          <ArrowUpRight className="w-4 h-4 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
        </button>
      </div>
    </div>
  );
});

/**
 * HeaderSection Component
 * Displays the main title and description.
 */
const HeaderSection = memo(({ home, revealed }) => {
  const navigate = useNavigate();

  return (
    <section className="pt-24 pb-16 px-6 lg:px-12 border-b border-[#e2e8f0]/60 bg-[#ffffff]/50 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className={`max-w-3xl transition-all duration-1000 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#14b8a6] shadow-[0_0_8px_rgba(20,184,166,0.4)] animate-pulse" />
              <span className="text-xs font-mono text-[#64748b] uppercase tracking-widest">System Operational • 2026 Protocol</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium font-serif tracking-tight text-[#0f172a] mb-6 leading-[1.1]">
              {home ? "Precision Oral Design" : "Full Clinical Registry"}
            </h1>
            
            <p className="text-lg text-[#64748b] max-w-2xl leading-relaxed font-light">
              Advanced biological artistry driven by robotics and data. 
              Experience the new standard in automated, high-fidelity dental care.
            </p>
          </div>

          {home && (
            <div className={`transition-all duration-1000 delay-200 ${revealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <button 
                onClick={() => navigate("/services")}
                className="hidden lg:flex items-center gap-2 text-sm font-bold text-[#0f766e] hover:text-[#134e4a] transition-colors uppercase tracking-widest border-b border-[#0f766e]/20 hover:border-[#0f766e] pb-1"
              >
                View Registry <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

/**
 * CTASection Component
 * Displays the bottom call-to-action area.
 */
const CTASection = memo(({ revealed }) => {
  const navigate = useNavigate();

  return (
    <div className={`mt-24 bg-[#134e4a] rounded-[2.5rem] p-8 lg:p-16 text-[#ffffff] relative overflow-hidden shadow-2xl transition-all duration-1000 delay-300 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
      <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
        <Database className="w-64 h-64" />
      </div>
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl lg:text-4xl font-medium font-serif mb-6 tracking-tight">Diagnosis Required?</h2>
          <p className="text-[#ccfbf1] text-lg mb-8 max-w-md leading-relaxed font-light">
            Initialize a consultation with our AI-assisted diagnostic team. 
            Priority slots available for complex surgical cases.
          </p>
          <button 
            onClick={() => navigate("/contact")}
            className="px-8 py-4 bg-[#ffffff] hover:bg-[#f0fdfa] text-[#134e4a] rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-lg flex items-center gap-3 active:scale-95"
          >
            Initialize Diagnostic
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 lg:gap-8">
            {[
              { label: "Patient Index", value: "98.2" },
              { label: "Wait Time", value: "0m" },
              { label: "Robotic Precision", value: "100%" },
              { label: "Global Rating", value: "A+" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-[#ffffff]/5 border border-[#ffffff]/10 p-6 rounded-2xl backdrop-blur-md hover:bg-[#ffffff]/10 transition-colors cursor-default">
                <div className="text-2xl lg:text-3xl font-mono font-bold mb-1">{stat.value}</div>
                <div className="text-xs text-[#99f6e4] uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
});

// =========================================
// 3. MAIN COMPONENT
// =========================================

const ServicesList = ({ home }) => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setServices(DENTAL_PROCEDURES);
      setLoading(false);
      // Trigger entrance animation shortly after loading
      setTimeout(() => setRevealed(true), 100);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const displayedServices = useMemo(() => {
    return home ? services.slice(0, 4) : services;
  }, [services, home]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc]">
        <div className="w-16 h-16 border-4 border-[#e2e8f0] border-t-[#0d9488] rounded-full animate-spin mb-6" />
        <p className="text-sm font-mono text-[#94a3b8] uppercase tracking-widest animate-pulse">Initializing Database...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen text-[#0f172a] font-sans selection:bg-[#134e4a] selection:text-[#ffffff]">
      
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.4]" 
           style={{ backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="relative z-10">
        
        <HeaderSection home={home} revealed={revealed} />

        {/* Services Grid */}
        <section className="py-16 px-6 lg:px-12">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
              {displayedServices.map((service, idx) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  index={idx}
                  revealed={revealed}
                />
              ))}
            </div>

            {/* Footer / CTA Block */}
            {!home && <CTASection revealed={revealed} />}

            {/* Mobile View All Button (Home only) */}
            {home && (
               <div className={`mt-16 text-center lg:hidden transition-all duration-1000 delay-500 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                 <button 
                    onClick={() => navigate("/services")}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#ffffff] border border-[#e2e8f0] rounded-full text-[#0f172a] text-xs font-bold uppercase tracking-widest shadow-sm hover:shadow-md transition-all active:scale-95"
                  >
                    View Full Registry <ChevronRight className="w-4 h-4" />
                 </button>
               </div>
            )}
          </div>
        </section>
      </div>

      {/* Global Animations */}
      <style>{`
        @keyframes slide-up {
          0% { transform: translateY(40px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default ServicesList;
