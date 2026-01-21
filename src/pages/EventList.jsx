import React, { useState, useEffect, useCallback, memo } from "react";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  Stethoscope,
  Activity,
  ChevronDown,
  ChevronUp,
  Loader2,
  Check
} from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

// =========================================
// 1. ASSET IMPORTS
// =========================================
import Eventhero from "../assets/events/eventhero.webp";
import Event1 from "../assets/events/event1.webp";
import Event2 from "../assets/events/event2.webp";
import Event3 from "../assets/events/event3.webp";
import Event4 from "../assets/events/event4.webp";
import Event5 from "../assets/events/event5.webp";
import Event6 from "../assets/events/event6.webp";
import Event7 from "../assets/events/event7.webp";
import Event8 from "../assets/events/event8.webp";
import Event9 from "../assets/events/event9.webp";
import Event10 from "../assets/events/Event10.webp";
import Event11 from "../assets/events/event11.webp";
import Event12 from "../assets/events/event12.webp";
import Event13 from "../assets/events/event13.webp";
import Event14 from "../assets/events/event14.webp";
import Event15 from "../assets/events/event15.webp";

// =========================================
// 2. CONSTANTS & DATA
// =========================================

const EVENTS_PER_PAGE = 6;
const CATEGORIES = ["All", "Workshop", "Seminar", "Community", "Elite", "Exhibition"];

const ALL_EVENTS = [
  {
  id: 1,
  category: "Workshop",
  title: "Digital Smile Design Live",
  date: "Oct 24, 2024",
  time: "10:00 AM",
  location: "Chicago, IL",
  description: "Witness the future of aesthetics with a live demonstration of 3D facial scanning and smile architecture. Our experts will guide you through the complete digital workflow, from initial scan to final prosthetic fabrication, highlighting how biometric data integration ensures superior fit and aesthetic harmony.",
  image: Event1,
  color: "teal"
},
{
  id: 2,
  category: "Seminar",
  title: "AI in Oral Diagnostics",
  date: "Nov 02, 2024",
  time: "02:00 PM",
  location: "Naperville, IL",
  description: "Exploring how predictive algorithms are identifying dental pathologies years before they manifest. This seminar covers the latest breakthroughs in machine learning models that analyze historical patient data to forecast caries risk, periodontal disease progression, and potential orthodontic shifts.",
  image: Event2,
  color: "blue"
},
{
  id: 3,
  category: "Community",
  title: "Kids' Bright Smiles Day",
  date: "Nov 15, 2024",
  time: "09:00 AM",
  location: "Evanston, IL",
  description: "A fun-filled educational day teaching the next generation the art of oral hygiene and preventative care. Through interactive games, augmented reality brushing guides, and friendly competitions, we aim to instill lifelong healthy habits in children, making dental visits a source of excitement rather than anxiety.",
  image: Event3,
  color: "teal"
},
{
  id: 4,
  category: "Elite",
  title: "Implantology Masterclass",
  date: "Dec 05, 2024",
  time: "08:30 AM",
  location: "Oak Brook, IL",
  description: "An exclusive deep dive into micron-level precision for dental implants using 3D bio-printing. Learn about the newest biocompatible materials and surgical guides that reduce recovery time by up to 40%, setting a new standard for implant success rates globally.",
  image: Event4,
  color: "blue"
},
{
  id: 5,
  category: "Wellness",
  title: "Holistic Dental Fair",
  date: "Dec 12, 2024",
  time: "11:00 AM",
  location: "Hinsdale, IL",
  description: "Understanding the connection between oral health and systemic wellness with our top specialists. We explore the oral-systemic link, discussing how gum health impacts cardiovascular stability, diabetes management, and overall longevity in a holistic healthcare framework.",
  image: Event5,
  color: "teal"
},
{
  id: 6,
  category: "Screening",
  title: "Free Oral Cancer Check",
  date: "Dec 20, 2024",
  time: "All Day",
  location: "Aurora, IL",
  description: "A philanthropic initiative providing advanced fluorescence screenings to the general public. Early detection saves lives; our team will be using non-invasive VELscope technology to identify tissue abnormalities that are invisible to the naked eye.",
  image: Event6,
  color: "blue"
},
{
  id: 7,
  category: "Exhibition",
  title: "4K VR Smile Preview",
  date: "Jan 10, 2025",
  time: "01:00 PM",
  location: "Schaumburg, IL",
  description: "Test drive our V-Smile simulator and see your transformation in a high-fidelity virtual world. Patients can now 'try on' their new smiles in 4K VR before a single procedure is performed, ensuring complete satisfaction with the planned aesthetic outcome.",
  image: Event7,
  color: "teal"
},
{
  id: 8,
  category: "Workshop",
  title: "Pain-Aware™ Tech Demo",
  date: "Jan 18, 2025",
  time: "03:30 PM",
  location: "Elmhurst, IL",
  description: "Learning the science behind smart anesthesia and drill-free laser dentistry protocols. Discover how computer-controlled delivery systems and hard-tissue lasers are eliminating the vibration and noise of traditional drills, revolutionizing patient comfort.",
  image: Event8,
  color: "blue"
},
{
  id: 9,
  category: "Gala",
  title: "10-Year Legacy Gala",
  date: "Feb 01, 2025",
  time: "07:00 PM",
  location: "Barrington, IL",
  description: "Celebrating a decade of transformation and 100k+ smiles with our elite patients and team. A black-tie evening featuring keynote speeches from global dental pioneers, awards for clinical excellence, and a look ahead at our 2030 vision.",
  image: Event9,
  color: "teal"
},
{
  id: 10,
  category: "Workshop",
  title: "Advanced Porcelain Artistry",
  date: "Feb 14, 2025",
  time: "10:00 AM",
  location: "Downers Grove, IL",
  description: "A session dedicated to the hand-crafted aesthetics of ultra-thin veneers and crowns. Watch master ceramists layer porcelain to mimic the translucency and texture of natural enamel, creating restorations that are indistinguishable from real teeth.",
  image: Event10,
  color: "blue"
},
{
  id: 11,
  category: "Summit",
  title: "International Bio-Safety Summit",
  date: "Mar 05, 2025",
  time: "09:00 AM",
  location: "Deerfield, IL",
  description: "Global leaders discuss the next evolution of clinical sterilization and safety protocols. Topics include UV-C disinfection robotics, advanced air filtration systems, and the implementation of hospital-grade sterility in private dental practices.",
  image: Event11,
  color: "teal"
},
{
  id: 12,
  category: "Seminar",
  title: "Teledentistry for Seniors",
  date: "Mar 20, 2025",
  time: "11:00 AM",
  location: "Skokie, IL",
  description: "Bridging the gap for elderly care through remote monitoring and virtual consultations. We demonstrate how IoT-enabled intraoral cameras allow seniors to receive high-quality triage and follow-up care from the comfort of their homes.",
  image: Event12,
  color: "blue"
},
{
  id: 13,
  category: "Community",
  title: "Global Smile Reach",
  date: "Apr 10, 2025",
  time: "08:00 AM",
  location: "Glenview, IL",
  description: "Recruiting clinicians for our international mission providing care to underserved regions. Join our mobile dental unit as we travel to remote areas to provide essential restorative and surgical care to populations with limited access to dentistry.",
  image: Event13,
  color: "teal"
},
{
  id: 14,
  category: "Seminar",
  title: "Ethics in Modern Dentistry",
  date: "Apr 25, 2025",
  time: "04:00 PM",
  location: "Wheaton, IL",
  description: "An open dialogue on the balance between corporate dentistry and patient-first ethics. A roundtable discussion on maintaining clinical autonomy and personalized care standards in an increasingly consolidated healthcare landscape.",
  image: Event14,
  color: "blue"
},
{
  id: 15,
  category: "Exhibition",
  title: "Dental Tech Expo 2025",
  date: "May 12, 2025",
  time: "09:00 AM",
  location: "Joliet, IL",
  description: "A showcase of the latest robotic surgery tools and AI integration in daily practice. Experience hands-on demos of microrobotic assistants that enhance surgical precision and reduce procedure times for complex endodontic and implant cases.",
  image: Event15,
  color: "teal"
}
];


// =========================================
// 3. SUBCOMPONENTS
// =========================================

/**
 * EventCard Component
 * Reusable card for displaying event details with expand/collapse functionality.
 */
const EventCard = memo(({ event, index, revealed, isExpanded, onToggleExpand }) => {
  const isTeal = event.color === 'teal';
  
  return (
    <div 
      className={`
        group bg-[#ffffff] rounded-[2rem] overflow-hidden border border-[#e2e8f0]
        ${revealed ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-20 opacity-0 blur-sm'}
        hover:border-[#0d9488]/30 hover:shadow-2xl hover:shadow-[#0f766e]/10 hover:-translate-y-2
        transition-all duration-700 cubic-bezier(0.2, 0.8, 0.2, 1) flex flex-col will-change-transform
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Gradient Top Border on Hover */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0d9488] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30" />

      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-[#0f172a]/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-1000 cubic-bezier(0.2, 0.8, 0.2, 1) group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 z-20">
          <span className={`
            px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-[#ffffff] shadow-sm backdrop-blur-md
            ${isTeal ? 'bg-[#10b981]/90' : 'bg-[#0f766e]/90'}
          `}>
            {event.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-[11px] font-bold text-[#94a3b8] mb-4 uppercase tracking-wider">
          <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[#0f766e]" /> {event.date}</span>
          <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#0f766e]" /> {event.time}</span>
        </div>
        
        <h3 className="text-2xl font-medium text-[#0f172a] font-serif mb-3 group-hover:text-[#134e4a] transition-colors leading-tight">
          {event.title}
        </h3>
        
        <p className="text-[#64748b] text-sm leading-relaxed mb-4 font-light">
          {isExpanded 
            ? event.description 
            : `${event.description.slice(0, 100)}${event.description.length > 100 ? '...' : ''}`}
        </p>

        {event.description.length > 100 && (
          <button 
            onClick={() => onToggleExpand(event.id)}
            className="mb-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#0f766e] hover:text-[#134e4a] transition-colors group/btn"
          >
            {isExpanded ? (
              <>Show Less <ChevronUp size={12} className="group-hover/btn:-translate-y-0.5 transition-transform" /></>
            ) : (
              <>Learn More <ChevronDown size={12} className="group-hover/btn:translate-y-0.5 transition-transform" /></>
            )}
          </button>
        )}

        <div className="mt-auto pt-6 border-t border-[#f1f5f9] flex items-center text-xs font-bold text-[#64748b]">
          <MapPin size={14} className="text-[#94a3b8] mr-2" /> 
          {event.location}
        </div>
      </div>
    </div>
  );
});

/**
 * HeroSection Component
 * Displays the page title and hero image with entrance animations.
 */
const HeroSection = memo(() => (
  <section className="relative h-[60vh] flex items-center justify-center bg-[#0f172a] overflow-hidden">
    {/* Background Image with Darker Overlay */}
    <div className="absolute inset-0 z-0">
      <img 
        src={Eventhero} 
        className="w-full h-full object-cover opacity-90 animate-slow-zoom" 
        alt="Dental Office"
      />
      {/* Professional Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/30 via-[#0f172a]/10 to-[#f8fafc]" />
    </div>

    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-10">
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0f766e]/10 border border-[#0f766e]/20 backdrop-blur-md text-[#174a44] text-[14px] uppercase tracking-[0.25em] font-bold mb-8 animate-fade-in">
        <span className="w-1.5 h-1.5 rounded-full bg-[hsl(172,63%,10%)] animate-pulse"></span>
        Global Symposium 2026
      </span>
      <h1 className="text-5xl md:text-7xl font-medium font-serif text-[#ffffff] mb-6 tracking-tight animate-slide-up leading-tight drop-shadow-lg">
        CLINICAL <span className="italic text-[#174a44]">EVENTS</span>
      </h1>
    </div>
  </section>
));

/**
 * FilterBar Component
 * Handles category selection and page info display.
 */
const FilterBar = memo(({ categories, activeCategory, onSelectCategory, currentPage, totalPages }) => (
  <section className="container mx-auto px-6 -mt-20 relative z-20">
    <div className="bg-[#ffffff]/80 backdrop-blur-xl border border-[#ffffff]/40 p-2 md:p-4 rounded-2xl shadow-xl shadow-[#e2e8f0]/50 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in-up">
      
      {/* Functional Filter Buttons */}
      <div className="flex flex-nowrap overflow-x-auto md:flex-wrap items-center justify-start md:justify-start gap-2 w-full md:w-auto pb-2 md:pb-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`
              px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300
              ${activeCategory === cat 
                ? "bg-[#0f172a] text-[#ffffff] shadow-lg shadow-[#0f172a]/20 scale-105" 
                : "text-[#64748b] hover:text-[#0f766e] hover:bg-[#f0fdfa]"}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-2 text-xs font-bold text-[#94a3b8] uppercase tracking-widest px-4 border-l border-[#e2e8f0]">
        <Filter size={14} />
        Page {currentPage} of {totalPages || 1}
      </div>
    </div>
  </section>
));

/**
 * NewsletterSection Component
 * Handles email subscription.
 */
const NewsletterSection = memo(() => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      await addDoc(collection(db, "subscribers"), {
        email,
        createdAt: new Date().toISOString(),
        source: "events_page"
      });
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Subscription failed:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section className="bg-[#134e4a] py-24 px-6 border-t border-[#115e59]">
      <div className="container mx-auto text-center max-w-4xl">
        <div className="inline-block p-4 bg-[#ffffff]/5 rounded-2xl mb-8 backdrop-blur-sm border border-[#ffffff]/5">
          <Stethoscope className="text-[#5eead4]" size={32} />
        </div>
        <h2 className="text-3xl md:text-5xl font-medium font-serif text-[#ffffff] mb-6 tracking-tight">Never Miss a Transformation.</h2>
        <p className="text-[#ccfbf1] max-w-xl mx-auto mb-10 text-lg leading-relaxed font-light">
          Join our elite mailing list to receive priority access to surgical workshops and international dental summits.
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Your professional email" 
            className="flex-1 bg-[#ffffff]/5 border border-[#ffffff]/10 rounded-xl px-6 py-4 text-[#ffffff] placeholder:text-[#99f6e4] focus:outline-none focus:border-[#5eead4] focus:bg-[#ffffff]/10 transition-all"
          />
          <button 
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="bg-[#ffffff] text-[#134e4a] px-8 py-4 rounded-xl font-bold hover:bg-[#f0fdfa] hover:shadow-lg transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2 min-w-[140px]"
          >
            {status === "loading" ? <Loader2 className="animate-spin" size={16} /> : status === "success" ? <><Check size={16} /> Subscribed</> : "Subscribe"}
          </button>
        </form>
        {status === "error" && (
          <p className="text-red-300 text-xs mt-2">Something went wrong. Please try again.</p>
        )}
      </div>
    </section>
  );
});

// =========================================
// 4. MAIN COMPONENT
// =========================================
const Events = () => {
  // --- STATE MANAGEMENT ---
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("All");
  const [revealed, setRevealed] = useState(false);
  const [expandedEvents, setExpandedEvents] = useState({});

  // --- LOGIC: FILTERING & PAGINATION ---
  const filteredEvents = activeCategory === "All" 
    ? ALL_EVENTS 
    : ALL_EVENTS.filter(e => e.category === activeCategory);

  const indexOfLastEvent = currentPage * EVENTS_PER_PAGE;
  const indexOfFirstEvent = indexOfLastEvent - EVENTS_PER_PAGE;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);

  // --- HANDLERS ---
  const toggleExpand = useCallback((id) => {
    setExpandedEvents(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  const handleCategoryChange = useCallback((cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);

  // --- EFFECTS: SCROLL & ANIMATION ---
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setRevealed(false);
    const timer = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(timer);
  }, [currentPage, activeCategory]);

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans selection:bg-[#134e4a] selection:text-[#ffffff]">
      
      <HeroSection />

      <FilterBar 
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={handleCategoryChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      {/* EVENTS GRID */}
      <section className="container mx-auto px-6 py-16">
        {currentEvents.length === 0 ? (
          <div className="text-center py-20 opacity-50">
            <Activity className="w-16 h-16 mx-auto mb-4 text-[#cbd5e1]" />
            <p className="text-xl font-bold text-[#94a3b8]">No events found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {currentEvents.map((event, idx) => (
              <EventCard 
                key={event.id}
                event={event}
                index={idx}
                revealed={revealed}
                isExpanded={!!expandedEvents[event.id]}
                onToggleExpand={toggleExpand}
              />
            ))}
          </div>
        )}

        {/* PAGINATION CONTROLS */}
        {totalPages > 1 && (
          <div className="mt-20 flex justify-center items-center gap-4">
            <button 
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-full border border-[#e2e8f0] text-[#94a3b8] hover:bg-[#ffffff] hover:text-[#0f766e] hover:shadow-lg disabled:opacity-30 disabled:hover:shadow-none transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${
                    currentPage === i + 1 
                    ? "bg-[#0f172a] text-[#ffffff] shadow-lg shadow-[#0f172a]/30" 
                    : "bg-[#ffffff] border border-[#e2e8f0] text-[#94a3b8] hover:border-[#5eead4] hover:text-[#0f766e]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-full border border-[#e2e8f0] text-[#94a3b8] hover:bg-[#ffffff] hover:text-[#0f766e] hover:shadow-lg disabled:opacity-30 disabled:hover:shadow-none transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
      
        )}
      </section>

      <NewsletterSection />

      {/* ========================================= */}
      {/* 5. LOCAL STYLES & ANIMATIONS              */}
      {/* ========================================= */}
      <style>{`
        @keyframes slide-up {
          0% { transform: translateY(40px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slow-zoom {
          0% { transform: scale(1.15); opacity: 0; }
          100% { transform: scale(1); opacity: 0.9; }
        }
        .animate-slide-up {
          animation: slide-up 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-fade-in {
          animation: fade-in 1.2s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
        }
        .animate-slow-zoom {
          animation: slow-zoom 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Events;
