import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronLeft, ChevronRight, Play, Pause, ArrowRight,
  Heart, ShieldCheck, Building2, Award, Microscope,  
  Layers, Zap, Globe, Smile, Stethoscope
} from "lucide-react";

// --- ASSETS ---
import herod1 from "../assets/about/herod1.webp";
import herod2 from "../assets/about/herod2.webp";
import herod3 from "../assets/about/herod3.webp";
import herom1 from "../assets/about/herom1.Webp"; // Note: Case sensitive extension preserved
import herom2 from "../assets/about/herom2.webp";
import herom3 from "../assets/about/herom3.webp";
import Doc1 from "../assets/about/doctors/doc1.webp";
import Doc2 from "../assets/about/doctors/doc2.webp";
import Doc3 from "../assets/about/doctors/doc3.webp";
import Doc4 from "../assets/about/doctors/doc4.webp";
import Heritage from "../assets/about/heritage.webp";

// --- CONSTANTS ---

const HERO_SLIDES = [
  { 
    id: 1, 
    image: herod1, 
    mobileImage: herom1, 
    line1: "CRAFTED CARE", 
    line2: "BUILT ON TRUST",
    subtitle: "YOU CAN TRUST",
    description: "Lumina Dental Care was founded with a simple belief—exceptional dentistry should feel transparent, precise, and human. Based in Illinois , our practice combines evidence-based clinical protocols with modern technology to deliver predictable, long-term oral health outcomes in an environment designed for comfort and clarity.",
  },
  { 
    id: 2, 
    image: herod2, 
    mobileImage: herom2, 
    line1: "PRECISION FIRST", 
    line2: "DENTAL CARE",
    subtitle: "NATURAL AESTHETICS",
    description: "Every decision at Lumina Dental Care is guided by precision, transparency, and respect for the patient experience. From diagnostics to treatment planning, we focus on minimally invasive, evidence-based care that prioritizes comfort, safety, and long-term results—so patients always understand what we do and why we do it.",
  },
  { 
    id: 3, 
    image: herod3, 
    mobileImage: herom3, 
    line1: "BUILT FOR", 
    line2: "THE LONG RUN",
    subtitle: "LIFETIME PROTECTION",
    description: "At Lumina Dental Care, our focus extends beyond today’s treatment. Every clinical decision is made with long-term oral health, function, and comfort in mind. Through honest guidance, advanced care planning, and patient-first values, we aim to deliver dentistry that remains reliable, predictable, and beneficial for years to come.",
  },
];

const DOCTORS = [
  {
    image: Doc1,
    name: "Dr. Emily Carter, DDS",
    profession: "Orthodontics & Dentofacial Orthopedics"
  },
  {
    image: Doc2,
    name: "Dr. Isabella Rossi, DMD",
    profession: "Periodontics & Implantology"
  },
  {
    image: Doc3,
    name: "Dr. Kavya reddy, BDS",
    profession: "Oral & Maxillofacial Surgery"
  },
  {
    image: Doc4,
    name: "Dr. Alexander Thorne, DMD",
    profession: "Cosmetic & Restorative Dentistry"
  }
];

const TECH_FEATURES = [
  { icon: Microscope, title: "AI-Diagnostics", desc: "Predictive algorithms identifying dental threats years early." },
  { icon: Layers, title: "3D Bio-Printing", desc: "Custom prosthetics fabricated with micron-level precision." },
  { icon: Zap, title: "Laser Precision", desc: "Drill-free dentistry with painless laser accuracy." },
  { icon: Globe, title: "Teledentistry", desc: "Connect to specialists worldwide, from the comfort of home." },
  { icon: Stethoscope, title: "Pain-Aware™ Tech", desc: "Smart anesthesia calibrating comfort in real-time." },
  { icon: Smile, title: "V-Smile Simulator", desc: "Preview your future smile in 4K VR — before treatment." },
];

// --- HELPERS ---

const truncateText = (text, limit) => {
  const words = text.split(" ");
  if (words.length <= limit) return text;
  return words.slice(0, limit).join(" ") + "...";
};

const useSectionReveal = (threshold = 0.15) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isRevealed];
};

// --- SUBCOMPONENTS ---

const HeroSlideBackground = memo(({ slide, isActive, isLoaded }) => (
  <div
    className={`
      absolute inset-0 w-full h-full cursor-pointer transition-all duration-1000 ease-in-out transform
      ${isActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-100 z-0"}
    `}
  >
    <picture>
      <source media="(max-width: 768px)" srcSet={slide.mobileImage} />
      <img
        src={slide.image}
        alt="Dental Clinic Environment"
        className={`
          absolute inset-0 w-full h-full object-cover object-center md:object-right 
          transition-transform duration-[2000ms] ease-in-out
          ${isActive && isLoaded ? "scale-100" : "scale-110"}
        `}
      />
    </picture>
    <div className="absolute inset-0 bg-[#0f172a]/30" />
  </div>
));

const HeroContent = memo(({ slide, isLoaded, isExpanded, setIsExpanded, currentIndex }) => {
  const showReadMore = slide.description.split(" ").length > 10;

  // Badge Content Logic based on index
  const getBadgeContent = (index) => {
    switch(index) {
      case 0: return { icon: Building2, title: "Lumina Dental Care", subtitle: "Chicago, IL 60611, United States," };
      case 1: return { icon: Heart, title: "Patient-First Care", subtitle: "Transparent • Precise • Human" };
      case 2: return { icon: ShieldCheck, title: "Global Safety", subtitle: "Sterilization • Biosafety • Protocols" };
      default: return { icon: Building2, title: "Lumina Dental Care", subtitle: "Illinois , United States" };
    }
  };

  const badge = getBadgeContent(currentIndex);
  const BadgeIcon = badge.icon;

  return (
    <div className={`
      absolute z-20 top-[15%] w-[90%] left-1/2 -translate-x-1/2 
      md:top-[55%] md:left-auto md:right-24 md:translate-x-0 md:-translate-y-1/2 md:w-auto md:max-w-md
    `}>
      <div className={`
        flex flex-col transition-all duration-1000 ease-out transform will-change-transform
        text-[#ffffff] md:text-[#0f172a]
        md:bg-[#ffffff]/95 md:backdrop-blur-sm md:border md:border-[#e2e8f0] md:rounded-2xl md:shadow-2xl md:p-6
        ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
      `}>
        {/* Mobile Card Wrapper */}
        <div className="
          bg-[#0f172a]/40 backdrop-blur-sm border border-[#ffffff]/20 rounded-2xl shadow-2xl p-4 text-center
          md:bg-transparent md:backdrop-blur-none md:border-none md:shadow-none md:rounded-none md:p-0 md:text-left
        ">
          <div className={`w-full transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            
            {/* Eyebrow */}
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <span className="w-10 md:w-12 h-[2px] bg-[#ffffff]/60 md:bg-[#0f766e]" />
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#ffffff]/90 md:text-[#0f766e] font-bold">
                Who We Are
              </span>
            </div>

            {/* Title & Description */}
            <div className="overflow-hidden py-1">
              <h1 className="leading-tight mt-1 space-y-1 font-serif">
                <span className="block text-2xl md:text-3xl lg:text-4xl font-medium animate-slide-up tracking-tight">
                  {slide.line1}
                </span>
                <span className="block text-lg md:text-xl lg:text-2xl font-light md:font-medium text-[#ffffff]/90 md:text-[#0f766e] tracking-wide animate-slide-up-delay">
                  {slide.line2}
                </span>
              </h1>

              <p className="text-xs text-[#e2e8f0] md:text-[#64748b] leading-relaxed mt-2 md:mt-3 max-w-sm animate-fade-in mx-auto md:mx-0 md:border-l-4 md:border-[#0f766e] md:pl-4 md:min-h-[3.5rem] flex flex-col justify-center md:justify-start transition-all duration-500">
                <span className="md:hidden">
                  {isExpanded ? slide.description : truncateText(slide.description, 10)}
                </span>
                <span className="hidden md:block">
                  {isExpanded ? slide.description : truncateText(slide.description, 20)}
                </span>
              </p>

              {showReadMore && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="
                    inline-flex items-center gap-2 mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#94a3b8] cursor-pointer transition-all duration-300 ease-out
                    hover:text-[#0f766e]
                    after:content-[''] after:block after:h-[1px] after:w-6 after:bg-current after:opacity-40 after:transition-all after:duration-300
                    hover:after:w-10 hover:after:opacity-100
                  "
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              )}

              {/* Dynamic Badge */}
              <div className="mt-3 md:mt-4 h-auto md:h-12 flex items-center justify-center md:justify-start">
                <div className={`
                  inline-flex items-center gap-2 md:gap-3 p-1.5 md:p-2 pr-3 md:pr-4 rounded-xl 
                  bg-[#ffffff]/10 md:bg-[#f8fafc] border border-[#ffffff]/10 md:border-[#e2e8f0] backdrop-blur-md 
                  transition-all duration-700 delay-300
                  ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
                `}>
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-[#2dd4bf] to-[#0f766e] md:from-[#0f766e] md:to-[#115e59] flex items-center justify-center shadow-lg text-[#ffffff] ring-2 ring-[#ffffff]/20 md:ring-transparent">
                    <BadgeIcon size={14} className="md:w-4 md:h-4" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-[#ffffff] md:text-[#64748b] font-semibold text-xs md:text-sm leading-none">
                      {badge.title}
                    </h3>
                    <p className="text-[#ccfbf1] md:text-[#0f766e] text-[9px] uppercase tracking-wider font-bold mt-0.5">
                      {badge.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Action Buttons */}
        <div className={`hidden md:flex mt-4 gap-3 transition-all duration-1000 delay-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <Link
            to="/events"
            className="group flex items-center gap-2 px-5 py-2.5 bg-transparent text-[#0f766e] border border-[#0f766e] text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_35px_rgba(255,255,255,0.5)] hover:bg-[#0f766e] hover:text-[#ffffff] transition-all duration-300 ease-out"
          >
            <span>CLINICAL EVENTS</span>
            <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/contact"
            className="group flex items-center gap-2 px-5 py-2.5 border border-[#0f766e] text-[#0f766e] text-xs font-bold tracking-widest uppercase hover:bg-[#0f766e] hover:text-[#ffffff] transition-all duration-300"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
});

const MobileActions = memo(({ isLoaded }) => (
  <div className={`
    md:hidden absolute bottom-32 left-1/2 -translate-x-1/2 w-max z-50 flex gap-3
    transition-all duration-1000 delay-700
    ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
  `}>
    <Link
      to="/events"
      className="group flex items-center gap-2 px-5 py-2.5 bg-[#ffffff] text-[#0f766e] text-[10px] font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_35px_rgba(255,255,255,0.5)] transition-all duration-300 ease-out"
    >
      <span>CLINICAL EVENTS</span>
      <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
    <Link
      to="/contact"
      className="group flex items-center gap-2 px-5 py-2.5 border border-[#ffffff]/30 text-[#ffffff] text-[10px] font-bold tracking-widest uppercase hover:bg-[#ffffff]/10 hover:border-[#ffffff] transition-all duration-300"
    >
      Contact
    </Link>
  </div>
));

const HeroSection = memo(() => {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const autoPlayRef = useRef();
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  // --- EFFECTS ---
  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 6000);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [current, isAutoPlaying]);

  useEffect(() => {
    if (direction) {
      const timer = setTimeout(() => setDirection(null), 300);
      return () => clearTimeout(timer);
    }
  }, [direction]);

  useEffect(() => {
    setIsExpanded(false);
  }, [current]);

  // --- HANDLERS ---
  const prevSlide = useCallback(() => {
    setDirection('left');
    setCurrent((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
    setIsAutoPlaying(false);
  }, []);

  const nextSlide = useCallback(() => {
    setDirection('right');
    setCurrent((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    setIsAutoPlaying(false);
  }, []);

  const goToSlide = useCallback((index) => {
    setDirection(index > current ? 'right' : 'left');
    setCurrent(index);
    setIsAutoPlaying(false);
  }, [current]);

  // Swipe Logic
  const minSwipeDistance = 50;
  
  const onTouchStart = (e) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  const onMouseDown = (e) => {
    touchStart.current = e.clientX;
  };

  const onMouseUp = (e) => {
    if (!touchStart.current) return;
    const distance = touchStart.current - e.clientX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
    touchStart.current = null;
  };

  return (
    <section
      data-nav-theme="dark"
      className="relative h-screen w-full overflow-hidden bg-[#0f172a] text-[#ffffff]"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* 1. Backgrounds */}
      {HERO_SLIDES.map((slide, index) => (
        <HeroSlideBackground 
          key={slide.id} 
          slide={slide} 
          isActive={index === current} 
          isLoaded={heroLoaded} 
        />
      ))}

      {/* 2. Content */}
      <HeroContent 
        slide={HERO_SLIDES[current]} 
        isLoaded={heroLoaded} 
        isExpanded={isExpanded} 
        setIsExpanded={setIsExpanded}
        currentIndex={current}
      />

      {/* 3. Mobile Actions */}
      <MobileActions isLoaded={heroLoaded} />

      {/* 4. Controls */}
      {/* Desktop Arrows */}
      <button
        onClick={prevSlide}
        className={`
          hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-30 
          w-12 h-12 items-center justify-center rounded-full 
          backdrop-blur-md border border-[#ffffff]/10 shadow-2xl transition-all duration-300 group
          ${direction === 'left' 
            ? "bg-[#ffffff] text-[#0f766e] scale-110 ring-4 ring-[#ffffff]/20"
            : "bg-[#0f172a]/20 text-[#ffffff] hover:bg-[#ffffff]/10 hover:border-[#ffffff]/30"
          }
        `}
      >
        <ChevronLeft className={`w-6 h-6 transition-transform duration-300 ${direction === 'left' ? '-translate-x-1' : 'group-hover:-translate-x-1'}`} />
      </button>

      <button
        onClick={nextSlide}
        className={`
          hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-30 
          w-12 h-12 items-center justify-center rounded-full 
          backdrop-blur-md border border-[#ffffff]/10 shadow-2xl transition-all duration-300 group
          ${direction === 'right' 
            ? "bg-[#ffffff] text-[#0f766e] scale-110 ring-4 ring-[#ffffff]/20"
            : "bg-[#ffffff]/10 text-[#ffffff] hover:bg-[#ffffff]/20 hover:border-[#ffffff]/30"
          }
        `}
      >
        <ChevronRight className={`w-6 h-6 transition-transform duration-300 ${direction === 'right' ? 'translate-x-1' : 'group-hover:translate-x-1'}`} />
      </button>

      {/* Pagination & Autoplay */}
      <div className="absolute z-30 w-auto flex flex-col items-center gap-4 left-1/2 -translate-x-1/2 bottom-20 md:left-6 md:translate-x-0 md:bottom-6">
        <div className="flex items-center gap-4">
          <button onClick={prevSlide} className="md:hidden p-2 rounded-full bg-[#ffffff]/10 hover:bg-[#ffffff]/20 backdrop-blur-sm transition-all">
            <ChevronLeft className="w-4 h-4 text-[#ffffff]" />
          </button>

          <div className="flex items-center gap-3 p-2 rounded-full backdrop-blur-sm bg-[#0f172a]/10 border border-[#ffffff]/5 cursor-default">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`
                  relative cursor-pointer transition-all duration-500 ease-out group h-2 rounded-full overflow-hidden
                  ${current === i ? "w-12 bg-[#ffffff]" : "w-2 bg-[#ffffff]/40 hover:w-6 hover:bg-[#ffffff]/60"}
                `}
              >
                {current === i && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent w-[200%] animate-shimmer" />
                )}
              </button>
            ))}
          </div>

          <button onClick={nextSlide} className="md:hidden p-2 rounded-full bg-[#ffffff]/10 hover:bg-[#ffffff]/20 backdrop-blur-sm transition-all">
            <ChevronRight className="w-4 h-4 text-[#ffffff]" />
          </button>
        </div>

        <button 
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="hidden md:flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#ffffff]/40 hover:text-[#ffffff] transition-colors uppercase pl-2"
        >
          {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          {isAutoPlaying ? "Autoplay" : "Paused"}
        </button>
      </div>
    </section>
  );
});

const HeritageSection = memo(() => {
  const [ref, isRevealed] = useSectionReveal();

  return (
    <section ref={ref} className="relative py-20 md:py-24 bg-[#ffffff] overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Image */}
          <div className={`relative transition-all duration-1000 ease-out flex justify-center lg:justify-start ${isRevealed ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <div className="relative w-full max-w-[600px] aspect-[4/4] rounded-2xl overflow-hidden shadow-xl group">
              <img 
                src={Heritage}
                alt="Clinical Excellence"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 hover:scale-105"
              />
              <div className="absolute bottom-4 right-4 lg:-right-6 lg:bottom-8 bg-[#ffffff] p-4 md:p-5 rounded-lg shadow-lg border-l-4 border-[#0f766e] hidden md:block max-w-[200px]">
                <h4 className="text-2xl font-black text-[#0f766e] mb-0.5">100k+</h4>
                <p className="text-[10px] font-bold text-[#0f172a] uppercase tracking-tight">Smiles Transformed</p>
              </div>
            </div>
            <div className="absolute -top-6 -left-6 w-24 h-24 md:w-32 md:h-32 bg-[#f0fdfa] rounded-full -z-10 animate-pulse" />
          </div>

          {/* Right Text */}
          <div className={`space-y-6 md:space-y-8 transition-all duration-1000 delay-300 ease-out ${isRevealed ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-[2px] bg-[#0f766e]" />
                <span className="text-[#0f766e] font-bold tracking-widest text-xs uppercase">Our Heritage</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium font-serif text-[#0f172a] tracking-tight leading-tight">
                Where Artistry <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0f766e] to-[#2dd4bf] italic">Meets Medicine.</span>
              </h2>
            </div>

            <p className="text-base md:text-lg text-[#64748b] leading-relaxed font-light max-w-lg">
         Founded on the belief that dental care should uplift you, Lumina Dental Care bridges clinical excellence with genuine emotional comfort, proudly serving patients across Chicago, Illinois with personalized treatments, advanced technology, and compassionate support for every patient journey.            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-[#f0fdfa] flex items-center justify-center text-[#0f766e]">
                  <Award size={20} />
                </div>
                <h3 className="font-bold text-[#0f172a] text-sm md:text-base">Elite Certification</h3>
                <p className="text-xs text-[#64748b] leading-snug">Only the top 1% specialists join our board.</p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-[#f0fdfa] flex items-center justify-center text-[#0f766e]">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-bold text-[#0f172a] text-sm md:text-base">Safety Protocol</h3>
                <p className="text-xs text-[#64748b] leading-snug">Exceeds global sterilization and biosafety standards.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

const TechSection = memo(() => {
  const [ref, isRevealed] = useSectionReveal();

  return (
    <section ref={ref} className="relative min-h-screen bg-[#0f172a] py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className={`text-[#2dd4bf] font-semibold tracking-[0.2em] text-xs uppercase mb-3 transition-all duration-700 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Future-Ready Infrastructure
          </h2>
          <h3 className={`text-3xl sm:text-4xl md:text-5xl font-medium font-serif text-[#ffffff] leading-tight transition-all duration-700 delay-200 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Next-Gen Precision.
            <br />
            <span className="text-[#94a3b8] font-light">Digital Dentistry.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {TECH_FEATURES.map((item, i) => (
            <div
              key={i}
              className={`
                p-6 md:p-8 bg-[#ffffff]/5 border border-[#ffffff]/10 rounded-xl backdrop-blur-md
                transition-all duration-500 hover:bg-[#ffffff]/10 hover:border-[#2dd4bf]/30 group cursor-default
                ${isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
              `}
              style={{ transitionDelay: `${i * 100 + 400}ms` }}
            >
              <div className="text-[#2dd4bf] mb-4 group-hover:scale-110 transition-transform bg-[#2dd4bf]/10 w-12 h-12 rounded-lg flex items-center justify-center">
                <item.icon size={24} />
              </div>
              <h4 className="text-lg font-bold text-[#ffffff] mb-2">{item.title}</h4>
              <p className="text-[#94a3b8] text-xs md:text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

const TeamSection = memo(() => {
  const [ref, isRevealed] = useSectionReveal();

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-[#ffffff] overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-end mb-12 lg:mb-16 relative">
          <h2 className="hidden lg:block text-[#0f766e] font-black text-6xl xl:text-8xl tracking-tighter opacity-[0.03] absolute -top-6 left-0 select-none pointer-events-none">
            OUR EXPERTS
          </h2>
          <div className="lg:w-2/3 space-y-4 relative z-10">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium font-serif text-[#0f172a] leading-tight">
              The Hands That <br />Shape Your World.
            </h3>
            <p className="text-base md:text-lg text-[#64748b] font-light max-w-lg">
              Our board includes Ivy League-trained clinicians & leading researchers shaping the future of oral science.
            </p>
          </div>
          
<div className="lg:w-1/3 flex lg:justify-end">
  <Link
    to="/contact"
    className="group flex items-center gap-3 text-[#0f766e] font-bold uppercase tracking-widest text-xs"
  >
    Meet the specialists
    <span className="w-8 h-8 rounded-full border border-[#0f766e] flex items-center justify-center group-hover:bg-[#0f766e] group-hover:text-[#ffffff] transition-all">
      <ArrowRight size={14} />
    </span>
  </Link>
</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {DOCTORS.map((doctor, index) => (
            <div
              key={index}
              className={`
                group relative overflow-hidden rounded-xl transition-all duration-1000
                ${isRevealed ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
              `}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              <div className="aspect-[3/4] bg-[#f1f5f9] relative overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <h5 className="text-[#ffffff] font-bold text-base mb-0.5">{doctor.name}</h5>
                <p className="text-[#5eead4] text-[10px] font-bold uppercase tracking-widest">{doctor.profession}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

const FooterSection = memo(() => (
  <footer className="bg-[#020617] py-20 md:py-24 relative overflow-hidden border-t border-[#ffffff]/5">
    <div className="absolute top-0 right-0 w-1/3 h-full bg-[#0f766e]/5 skew-x-12 translate-x-1/3 pointer-events-none" />
    <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
      <div className="mb-8 inline-block p-3 bg-[#ffffff]/5 rounded-full backdrop-blur-sm border border-[#ffffff]/10">
        <Heart className="text-[#2dd4bf] animate-pulse" size={28} />
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium font-serif text-[#ffffff] mb-6 tracking-tight leading-tight">
        Ready for your <br />
        <span className="text-[#2dd4bf]">Masterpiece Smile?</span>
      </h2>
      <p className="text-[#94a3b8] max-w-xl mx-auto text-base md:text-lg mb-10 font-light leading-relaxed">
        Book a signature consultation at any of our global clinics and experience the pinnacle of dental luxury.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link to="/contact" className="px-8 py-3.5 bg-[#0f766e] text-[#ffffff] text-sm font-bold uppercase tracking-wider rounded-full hover:bg-[#115e59] hover:shadow-lg hover:shadow-[#0f766e]/25 transition-all">
          Contact us
        </Link>
        <Link to="/contact#locations" className="px-8 py-3.5 border border-[#ffffff]/20 text-[#ffffff] text-sm font-bold uppercase tracking-wider rounded-full hover:bg-[#ffffff] hover:text-[#0f172a] transition-all">
          Our Locations
        </Link>
      </div>
    </div>
  </footer>
));

const About = () => {
  return (
    <div className="w-full font-sans text-[#0f172a]">
      <HeroSection />
      <HeritageSection />
      <TechSection />
      <TeamSection />
      <FooterSection />

      {/* Global Animations */}
      <style>{`
        @keyframes slide-up {
          0% { transform: translateY(100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-up-delay {
          opacity: 0;
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
        }
        .animate-fade-in {
          opacity: 0;
          animation: fade-in 1s ease-out 0.4s forwards;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default About;
