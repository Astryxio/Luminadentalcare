// Import necessary React hooks
import { useEffect, useState } from "react";
// Import routing components from react-router-dom
import { useParams, NavLink } from "react-router-dom";
// Import icon components from lucide-react
import { ArrowLeft, CheckCircle2, Star, Calendar } from "lucide-react";

// Import service data from the local file
import services from "./services.data"; // ✅ v2 source

// Define the ServiceDetails component
const ServiceDetails = () => {
  // Extract the service ID and slug from the URL parameters
  const { id, slug } = useParams();
  // State to control the hero section's active state for animations
  const [heroActive, setHeroActive] = useState(false);

  const service = services.find((item) => item.id === Number(id) && item.slug === slug);

  useEffect(() => {
    // Scroll to the top of the page on mount
    window.scrollTo(0, 0);
    setTimeout(() => setHeroActive(true), 100);
  }, []);


  // Intersection Observer for scroll animations (Correct way for lists)
  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
            }
          });
        },
      { threshold: 0.1 }
    );

    const hiddenElements = document.querySelectorAll(".reveal-on-scroll");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [service]);

  // Mapping of service slugs to image paths
  const imageMap = {
    "general-care": "/serviceimages/service1.webp",
    "smile-design": "/serviceimages/service2.webp",
    "implant-dentistry": "/serviceimages/service3.webp",
        "Orthodontics": "/serviceimages/service4.webp"

  };



  if (!service) {
    return (
      <div className="min-h-screen bg-[#ffffff] text-[#0f172a] flex flex-col items-center justify-center text-center px-4 font-sans">
        <h2 className="text-4xl font-serif mb-6">Service Not Found</h2>
        <NavLink to="/services">
          <button className="px-8 py-3 bg-[#0f172a] text-[#ffffff] rounded-full hover:bg-[#134e4a] transition-all font-bold text-xs uppercase tracking-widest shadow-xl">
            Return to Registry
          </button>
        </NavLink>
      </div>
    );
  }

  return (
    <div className="bg-[#ffffff] text-[#0f172a] min-h-screen font-sans selection:bg-[#0f766e] selection:text-[#ffffff] overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-[#f8fafc] -z-10 rounded-b-[3rem]" />
        
        <div className="max-w-7xl mx-auto relative">
            <NavLink 
            to="/services" 
            className={`absolute -top-16 left-0 flex items-center gap-2 text-[#64748b] hover:text-[#0f766e] font-bold uppercase text-xs tracking-widest transition-all duration-300 z-20 ${heroActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
            >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <ArrowLeft size={14} /> <span>Back to Registry</span>
            </div>
            </NavLink>

            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                {/* Text Content */}
                <div className="flex-1 text-center lg:text-left z-10">
                    <div className={`transition-all duration-1000 delay-100 ${heroActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <span className="inline-block py-1.5 px-4 rounded-full bg-[#f0fdfa] text-[#0f766e] text-[10px] font-bold tracking-[0.2em] uppercase mb-6 border border-[#ccfbf1]">
                            Clinical Protocol
                        </span>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium font-serif text-[#0f172a] leading-[1.1] mb-6 tracking-tight">
                            {service.title}
                        </h1>
                        <p className="text-lg text-[#64748b] leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                            {service.description}
                        </p>
                    </div>
                </div>

                {/* Image Content */}
                <div className={`flex-1 w-full relative transition-all duration-1000 delay-300 ${heroActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
                    <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100 aspect-[4/3] group">
                        <img
                        src={imageMap[service.slug]}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
                        />
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#f0fdfa] rounded-full -z-10 blur-2xl opacity-60"></div>
                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#ccfbf1] rounded-full -z-10 blur-3xl opacity-60"></div>
                </div>
            </div>
        </div>
      </div>

      {/* 1. CANDIDATES SECTION */}
      <section className="py-24 bg-[#ffffff] relative">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
                <div className="lg:w-1/3 lg:sticky lg:top-32 reveal-on-scroll">
                    <span className="text-[#0f766e] font-bold tracking-widest uppercase text-xs mb-3 block">Indications</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-[#0f172a] mb-6 leading-tight">
                        Is this treatment <br/> <span className="italic text-[#64748b]">right for you?</span>
                    </h2>
                    <p className="text-[#64748b] font-light leading-relaxed">
                        Our protocols are tailored for specific clinical indications. Review the criteria to understand if you are an ideal candidate.
                    </p>
                </div>

                <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.candidates?.map((item, idx) => (              
                    <div key={idx} className="reveal-on-scroll stagger-item group p-8 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#0f766e]/30 hover:shadow-lg hover:shadow-[#0f766e]/5 transition-all duration-300">
                        <div className="w-10 h-10 rounded-full bg-[#ffffff] border border-[#e2e8f0] flex items-center justify-center text-[#0f766e] mb-4 shadow-sm group-hover:scale-110 transition-transform">
                            <Star size={18} />
                        </div>
                        <h3 className="text-lg font-bold text-[#0f172a]">{item}</h3>
                    </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* 2. PROCEDURE FLOW (Timeline) */}
      <section className="py-24 bg-[#f8fafc] border-y border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 reveal-on-scroll">
                <span className="text-[#0f766e] font-bold tracking-widest uppercase text-xs mb-3 block">The Process</span>
                <h2 className="text-3xl md:text-5xl font-serif text-[#0f172a]">Treatment Roadmap</h2>
            </div>
            
            <div className="relative max-w-5xl mx-auto">
              {/* Vertical Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[#cbd5e1] md:-translate-x-1/2"></div>

              <div className="space-y-12 md:space-y-24">
                {service.steps?.map((step, index) => (
                    <div key={index} className={`reveal-on-scroll stagger-item relative flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-8 md:gap-0`}>
                        
                        {/* Timeline Dot */}
                        <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#ffffff] border-[3px] border-[#0f766e] z-10 mt-6 md:mt-8 shadow-[0_0_0_4px_rgba(248,250,252,1)]"></div>

                        {/* Content Box */}
                        <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                            <span className="text-6xl font-serif text-[#e2e8f0] font-bold absolute -top-8 opacity-50 select-none z-0">0{index + 1}</span>
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-[#0f172a] mb-3">{step.title}</h3>
                                <p className="text-[#64748b] font-light leading-relaxed text-sm md:text-base">{step.desc}</p>
                            </div>
                        </div>
                        
                        {/* Empty side for spacing */}
                        <div className="hidden md:block w-1/2"></div>
                    </div>
                ))}
              </div>
            </div>
        </div>
      </section>

      {/* 3. BENEFITS */}
      <section className="py-24 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 reveal-on-scroll">
                <h2 className="text-3xl md:text-4xl font-serif text-[#0f172a]">Clinical Advantages</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {service.benefits?.map((benefit, idx) => (
                <div key={idx} className="reveal-on-scroll stagger-item p-8 rounded-2xl bg-[#ffffff] border border-[#e2e8f0] hover:border-[#ccfbf1] hover:bg-[#f0fdfa] transition-all duration-300 group text-center">                
                    <div className="w-12 h-12 mx-auto bg-[#f1f5f9] rounded-full flex items-center justify-center text-[#64748b] mb-6 group-hover:bg-[#0f766e] group-hover:text-[#ffffff] transition-colors">
                        <CheckCircle2 size={20} />
                    </div>
                    <p className="text-sm font-bold text-[#0f172a] uppercase tracking-wide">{benefit}</p>
                </div>
                ))}
            </div>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-[3rem] bg-[#134e4a] text-center py-20 px-6 shadow-2xl reveal-on-scroll">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#ffffff]/5 to-transparent"></div>
                
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-serif text-[#ffffff] mb-8">
                        Begin your transformation.
                    </h2>
                    <p className="text-[#ccfbf1] mb-10 font-light text-lg">
                        Schedule a consultation with our specialists to discuss your specific case.
                    </p>
                    <NavLink to="/appointment" className="inline-flex items-center gap-3 px-8 py-4 bg-[#ffffff] text-[#134e4a] rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#f0fdfa] hover:scale-105 transition-all shadow-lg">
                        <Calendar size={16} /> Book Appointment
                    </NavLink>
                </div>
            </div>
        </div>
      </section>

      <style>{`
        /* The CSS that powers the futuristic reveals */
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Stagger logic for list items */
        .stagger-item:nth-child(1) { transition-delay: 100ms; }
        .stagger-item:nth-child(2) { transition-delay: 200ms; }
        .stagger-item:nth-child(3) { transition-delay: 300ms; }
        .stagger-item:nth-child(4) { transition-delay: 400ms; }
        .stagger-item:nth-child(5) { transition-delay: 500ms; }
        .stagger-item:nth-child(6) { transition-delay: 600ms; }
      `}</style>
    </div>
  );
};

export default ServiceDetails;