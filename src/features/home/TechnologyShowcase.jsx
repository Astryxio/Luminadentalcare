import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, NavLink } from "react-router-dom";
import { 
  ShieldCheck, 
  Star, 
  Activity, 
  Zap, 
  ArrowRight, 
  ChevronRight,
  Clock,
  Users,
  Award,
  Sparkles,
  ChevronDown,
  ChevronUp
} from "lucide-react";

import Tech1 from "../../assets/home/technologyshowcase/tech1.webp";
import Tech2 from "../../assets/home/technologyshowcase/tech2.webp";
import Tech3 from "../../assets/home/technologyshowcase/tech3.webp";
import Tech4 from "../../assets/home/technologyshowcase/tech4.webp";
import Tech5 from "../../assets/home/technologyshowcase/tech5.webp";
import Tech6 from "../../assets/home/technologyshowcase/tech6.webp";
import Tech7 from "../../assets/home/technologyshowcase/tech7.webp";
import Tech8 from "../../assets/home/technologyshowcase/tech8.webp";
import Tech9 from "../../assets/home/technologyshowcase/tech9.webp";
import Tech10 from "../../assets/home/technologyshowcase/tech10.webp";


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

// --- TECHNOLOGY SECTION COMPONENTS ---

const TechCard = ({ tech, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ref, isRevealed] = useReveal(index * 100);

  // Split description into short and long
  const words = tech.description.split(" ");
  const isLong = words.length > 25;
  const shortDesc = isLong ? words.slice(0, 25).join(" ") + "..." : tech.description;

  return (
    <div 
      ref={ref}
      className={`relative group bg-[#ffffff] rounded-2xl p-6 border border-[#e2e8f0] hover:border-[#0d9488]/30 hover:shadow-2xl hover:shadow-[#0f766e]/10 transition-all duration-500 flex flex-col h-full hover:-translate-y-1
      ${isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      {/* Gradient Top Border on Hover */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0d9488] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl"></div>

      <div className="flex items-start gap-4 mb-4">
        {/* Small Tech Image */}
        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#f1f5f9] bg-[#f8fafc] group-hover:border-[#ccfbf1] transition-colors">
           <img src={tech.image} alt={tech.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div>
           <h4 className="text-lg font-bold text-[#0f172a] font-serif leading-tight mb-1 group-hover:text-[#0f766e] transition-colors">{tech.title}</h4>
           <span className="text-[10px] font-bold uppercase tracking-widest text-[#0d9488] bg-[#f0fdfa] px-2 py-1 rounded-full">{tech.category}</span>
        </div>
      </div>

      <div className="relative text-[#64748b] text-sm font-light leading-relaxed grow flex flex-col">
         <p className="break-words">
            {isExpanded ? tech.description : shortDesc}
         </p>
         
         {isLong && (
           <button 
             onClick={() => setIsExpanded(!isExpanded)}
             className="mt-auto pt-4 text-[#0f766e] font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:text-[#134e4a] transition-colors focus:outline-none group/btn"
           >
             {isExpanded ? (
               <>Read Less <ChevronUp size={14} className="group-hover/btn:-translate-y-0.5 transition-transform" /></>
             ) : (
               <>Read More <ChevronDown size={14} className="group-hover/btn:translate-y-0.5 transition-transform" /></>
             )}
           </button>
         )}
      </div>
    </div>
  );
};

const TechnologyShowcase = () => {
  const technologies = [
     {
    id: 1,
    title: "CBCT 3D Imaging",
    category: "Diagnostics",
    image: Tech1,
    description:
      "Cone Beam Computed Tomography (CBCT) provides a comprehensive 3D view of your oral anatomy. Unlike traditional 2D X-rays, this advanced imaging technology allows us to visualize bone structure, tooth orientation, and nerve pathways with sub-millimeter accuracy. This is crucial for planning complex procedures like implants, root canals, and surgical extractions, ensuring successful outcomes with minimal invasiveness."
  },
  {
    id: 2,
    title: "iTero Intraoral Scanner",
    category: "Digital Impression",
    image: Tech2,
    description:
      "Say goodbye to messy, uncomfortable traditional impression goop. The iTero scanner captures thousands of images per second to create a highly accurate, 3D digital map of your teeth and gums. This technology integrates seamlessly with Invisalign planning and restorative lab work, resulting in better-fitting crowns, bridges, and aligners with significantly reduced turnaround times."
  },
  {
    id: 3,
    title: "CEREC Primescan",
    category: "CAD/CAM",
    image: Tech3,
    description:
      "Our Chairside Economical Restoration of Esthetic Ceramics (CEREC) system allows us to design, mill, and place ceramic crowns in a single visit. Using CAD/CAM technology, we create restorations that match the natural strength and color of your teeth. No temporary crowns, no follow-up appointments—just a permanent, high-quality solution in a matter of hours."
  },
  {
    id: 4,
    title: "Waterlase iPlus",
    category: "Laser Dentistry",
    image: Tech4,
    description:
      "The Waterlase iPlus combines laser energy with a gentle spray of water to perform a wide range of dental procedures without the heat, vibration, and pressure of a drill. This often eliminates the need for anesthesia, reduces bleeding, and accelerates healing times."
  },
  {
    id: 5,
    title: "Digital Smile Design",
    category: "Cosmetic Planning",
    image: Tech5,
    description:
      "Digital Smile Design (DSD) allows us to plan your smile makeover virtually before touching a single tooth, ensuring predictable and aesthetically precise results."
  },
  {
    id: 6,
    title: "Formlabs 3D Printing",
    category: "Fabrication",
    image: Tech6,
    description:
      "Our in-house medical-grade 3D printers fabricate surgical guides, night guards, and temporary restorations with extreme precision and reduced turnaround times."
  },
  {
    id: 7,
    title: "Pearl AI Diagnostics",
    category: "Artificial Intelligence",
    image: Tech7,
    description:
      "AI-assisted radiograph analysis highlights cavities, bone loss, and calculus with enhanced diagnostic accuracy and patient clarity."
  },
  {
    id: 8,
    title: "Piezosurgery",
    category: "Ultrasonic Surgery",
    image: Tech8,
    description:
      "Ultrasonic micro-vibrations allow precise bone cutting while protecting soft tissues, reducing trauma and accelerating recovery."
  },
  {
    id: 9,
    title: "VELscope Vx",
    category: "Cancer Screening",
    image: Tech9,
    description:
      "Fluorescence-based oral tissue screening enables early detection of abnormalities and pre-cancerous changes."
  },
  {
    id: 10,
    title: "EMS Airflow",
    category: "Hygiene",
    image: Tech10,
    description:
      "Guided Biofilm Therapy gently removes plaque and biofilm using warm water, air, and erythritol powder for superior comfort."
  }
];


  return (
    <section className="py-24 bg-[#f8fafc] border-t border-[#e2e8f0]">
      <div className="container mx-auto px-6 max-w-7xl">
         <div className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#0f766e] uppercase mb-4 block">Innovation</span>
            <h2 className="text-3xl md:text-5xl font-medium text-[#0f172a] font-serif">Advanced Technology</h2>
            <p className="text-[#64748b] mt-4 max-w-2xl mx-auto font-light">
               We invest in the world's most sophisticated dental technologies to provide care that is safer, faster, and more precise.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
               <TechCard key={tech.id} tech={tech} index={index} />
            ))}
         </div>
      </div>
    </section>
  );
};

// --- MAIN PAGE COMPONENT ---
const QualityServices = () => {
  // Use faster delays (200ms) so it doesn't look like lag
  const [textRef, textRevealed] = useReveal(200);
  const [imgRef, imgRevealed] = useReveal(400); 
  
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
      img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1974&auto=format&fit=crop",
      icon: <ShieldCheck />
    },
    {
      id: "2",
      slug: "smile-design",
      title: "Smile Architecture",
      subtitle: "Aesthetics",
      desc: "Microscopic veneers and digital previews. We engineer aesthetics that are indistinguishable from natural teeth.",
      features: ["Digital Mockups", "Veneers", "Whitening"],
      img: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=2070&auto=format&fit=crop",
      icon: <Star />
    },
    {
      id: "3",
      slug: "implant-dentistry",
      title: "Bionic Restoration",
      subtitle: "Restoration",
      desc: "Guided surgery for permanent replacement. Titanium implants that restore 99% of original function.",
      features: ["Guided Surgery", "Bone Grafting", "Lifetime Warranty"],
      img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop",
      icon: <Activity />
    },
    {
      id: "4",
      slug: "orthodontics",
      title: "Invisible Alignment",
      subtitle: "Orthodontics",
      desc: "High-clarity aligners with accelerated movement technology. Perfect alignment without the metal wires.",
      features: ["Clear Aligners", "Retainers", "Remote Monitoring"],
      img: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=2070&auto=format&fit=crop",
      icon: <Zap />
    }
  ];

  return (
    <div className="font-sans bg-[#f8fafc] text-[#0f172a] overflow-hidden selection:bg-[#134e4a] selection:text-[#ffffff]">
      
      {/* =========================================
           1. HERO SECTION - Split Layout (Restored)
          ========================================= */}
      <section className="relative pt-24 pb-16 px-6 bg-[#ffffff] z-20 overflow-hidden rounded-b-[3rem] shadow-sm">
        <div className="container mx-auto max-w-[1600px]">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Text Side - Slide from LEFT */}
            <div 
                ref={textRef}
                className={`w-full lg:w-1/2 text-left transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] transform 
                ${textRevealed ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}
            >
                <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-[#f8fafc] rounded-full border border-[#f1f5f9]">
                    <span className="w-2 h-2 rounded-full bg-[#14b8a6] animate-pulse"></span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b]">Clinical Excellence</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-[#0f172a] leading-[1.05] mb-8 font-serif tracking-tight">
                    The Art of <br/>
                    <span className="italic text-[#134e4a]">Bio-Aesthetic</span> Precision.
                </h1>
                
                <p className="text-[#64748b] text-sm md:text-lg leading-relaxed mb-10 max-w-lg font-light border-l-2 border-[#f1f5f9] pl-6">
                    We combine robotic accuracy with human artistry to engineer health and confidence. Experience the future of dental care.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button className="group relative overflow-hidden px-8 py-4 bg-[#0f172a] text-[#ffffff] text-xs font-bold uppercase tracking-widest transition-all hover:bg-[#134e4a] rounded-full shadow-lg hover:shadow-xl">
                        <span className="relative z-10 flex items-center gap-2">
                           Know More About Us <ChevronRight size={14} />
                        </span>
                    </button>
                    
                    <button className="group px-8 py-4 bg-[#ffffff] border border-[#e2e8f0] text-[#0f172a] text-xs font-bold uppercase tracking-widest hover:bg-[#f8fafc] transition-all rounded-full flex items-center justify-center gap-2">
                         Event List
                    </button>
                </div>
            </div>

            {/* Image Side - Slide from RIGHT */}
            <div 
                ref={imgRef}
                className={`w-full lg:w-1/2 relative transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] transform 
                ${imgRevealed ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}
            >
                <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] w-full shadow-2xl shadow-[#e2e8f0]/50">
                    <img 
                        src="https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=2069&auto=format&fit=crop" 
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[1.5s]"
                        alt="Clinical Precision"
                    />
                    
                    {/* Floating Trust Badge */}
                    <div className="absolute bottom-8 left-8 bg-[#ffffff]/95 backdrop-blur-md p-5 rounded-2xl flex items-center gap-4 shadow-xl border border-[#ffffff]/50 animate-float hidden md:flex">
                        <div className="w-12 h-12 rounded-full bg-[#f0fdfa] flex items-center justify-center text-[#0f766e]">
                             <Sparkles size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase text-[#94a3b8] tracking-wider mb-1">Patient Rating</p>
                            <div className="flex items-center gap-1">
                                <span className="text-lg font-bold text-[#0f172a] font-serif">5.0/5</span>
                                <div className="flex text-[#fbbf24]">
                                    {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="currentColor" />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
           2. MAIN SERVICES GRID
          ========================================= */}
      <section className="py-24 bg-[#ffffff] relative">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-50"></div>
        <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
          
          <div className="mb-20 text-center">
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#0f766e] uppercase mb-4 block">Our Expertise</span>
                <h2 className="text-3xl md:text-5xl font-medium text-[#0f172a] font-serif">Clinical Protocols</h2>
                <div className="w-20 h-1 bg-[#134e4a] mx-auto mt-6 rounded-full"></div>
          </div>

          {/* THE GRID: Professional Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((item, index) => (
              <ServiceCard key={item.id} item={item} index={index} />
            ))}
          </div>

        </div>
      </section>

      {/* =========================================
           3. TECHNOLOGY SHOWCASE (REPLACED STATS BAR)
          ========================================= */}
      <TechnologyShowcase />

      {/* =========================================
           4. MINIMAL CTA
          ========================================= */}
      <section className="py-24 bg-[#134e4a] text-[#ffffff] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#115e59]/20 transform skew-x-12"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-light mb-10 leading-tight font-serif">
            Ready to <span className="italic font-normal text-[#99f6e4]">transform</span> your smile?
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <NavLink 
              to="/appointment" 
              className="px-10 py-4 bg-[#ffffff] text-[#042f2e] text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#f0fdfa] hover:scale-105 transition-all shadow-xl"
            >
              Book Consultation
            </NavLink>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const StatsBar = () => {
    const [ref, isRevealed] = useReveal(200);

    return (
        <section ref={ref} className={`relative w-full bg-[#cbd5e1] overflow-hidden border-t border-[#ffffff]/5 transition-all duration-1000 ${isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            
            {/* Background Grid / Noise */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
            <div className="absolute inset-0 bg-radial-gradient from-[#134e4a]/20 to-transparent opacity-50"></div>

            <div className="container mx-auto max-w-[1600px] relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y divide-white/5 md:divide-y-0">
                    
                    <StatCard 
                        val={99.9} 
                        suffix="%" 
                        label="Clinical Success" 
                        subLabel="Verified accuracy across all robotic procedures."
                        icon={<ShieldCheck />}
                        inView={isRevealed}
                    />

                    <StatCard 
                        val={10} 
                        suffix="µm" 
                        label="Precision" 
                        subLabel="Sub-micron accuracy in veneer placements."
                        icon={<Microscope />}
                        inView={isRevealed}
                    />

                    <StatCard 
                        val={12} 
                        suffix="" 
                        label="Master Clinicians" 
                        subLabel="Elite specialists with 20+ years avg experience."
                        icon={<Users />}
                        inView={isRevealed}
                    />

                    <StatCard 
                        val={18} 
                        suffix="+" 
                        label="Global Patents" 
                        subLabel="Pioneering technologies in bio-aesthetics."
                        icon={<Globe />}
                        inView={isRevealed}
                    />

                </div>
            </div>
        </section>
    );
};

export default TechnologyShowcase;