import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { 
  ChevronLeft, ChevronRight, Play, Pause, ArrowRight 
} from "lucide-react";

// Images
import herod1 from "../../assets/home/herod1.webp";
import herod2 from "../../assets/home/herod2.webp";
import herod3 from "../../assets/home/herod3.webp";
import herod4 from "../../assets/home/herod4.webp";
import herom1 from "../../assets/home/herom1.webp";
import herom2 from "../../assets/home/herom2.webp";
import herom3 from "../../assets/home/herom3.webp";
import herom4 from "../../assets/home/herom4.webp";
import logo from "../../assets/common/logo.svg";

// --- CONSTANTS ---

const HERO_SLIDES = [
  { 
    id: 1, 
    image: herod1, 
    mobileImage: herom1,
    line1: "LUMINA", 
    line2: "DENTAL CARE",
    subtitle: "YOU CAN TRUST",
    description: "Gentle, modern dental care focused on your comfort, clear guidance, and healthy smiles for you and your family. We utilize state-of-the-art technology to ensure precise diagnostics and effective treatments. Our team is dedicated to providing a relaxing environment where your oral health is our top priority.",
    doctorName: "Dr. Emily Carter, DDS",
    qualification: "Orthodontics & Dentofacial Orthopedics",
    hasDoctor: true
  },
  { 
    id: 2, 
    image: herod2, 
    mobileImage: herom2, 
    line1: "EXCLUSIVE", 
    line2: "DENTAL CARE",
    subtitle: "NATURAL AESTHETICS",
    description: "Expert dental care that adapts to you, combining modern technology, clear communication, and gentle treatment. We specialize in cosmetic procedures that enhance your natural beauty while maintaining optimal functionality. Experience the perfect blend of art and science.",
    doctorName: "Dr. Emily Carter, DDS",
    qualification: "Orthodontics & Dentofacial Orthopedics",
    hasDoctor: true
  },
  { 
    id: 3, 
    image: herod3, 
    mobileImage: herom3, 
    line1: "PREVENTIVE", 
    line2: "DENTAL CARE",
    subtitle: "LIFETIME PROTECTION",
    description: "Protect your smile with regular checkups, early care, and habits that keep teeth healthy longer for life. Our preventive approach focuses on education and early detection to save you from complex procedures down the road. Your long-term health is our success.",
    doctorName: "Dr. Emily Carter, DDS",
    qualification: "Orthodontics & Dentofacial Orthopedics",
    hasDoctor: true
  },
  { 
    id: 4, 
    image: herod4, 
    mobileImage: herom4, 
    line1: "TAILORED", 
    line2: "CONSULTATION",
    subtitle: "EXPERT PLANNING",
    description: "Thorough examinations and personalized treatment planning to ensure the perfect care for every single patient. We take the time to listen to your concerns and goals before crafting a unique roadmap for your dental journey. No two smiles are the same.",
    doctorName: "Dr. Emily Carter, DDS",
    qualification: "Orthodontics & Dentofacial Orthopedics",
    hasDoctor: true
  }
];

const truncateText = (text, limit) => {
  const words = text.split(" ");
  if (words.length <= limit) return text;
  return words.slice(0, limit).join(" ") + "...";
};

// --- SUBCOMPONENTS ---

const SlideBackground = memo(({ slide, isActive, isLoaded }) => (
  <div
    className={`
      absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out transform
      ${isActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-100 z-0"}
    `}
  >
    <picture>
      <source media="(max-width: 768px)" srcSet={slide.mobileImage} />
      <img
        src={slide.image}
        alt="Dental Banner"
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

const SlideContent = memo(({ slide, isLoaded, isExpanded, setIsExpanded }) => {
  const showReadMore = slide.description.split(" ").length > 10;

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
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2 md:mb-1">
              <span className="w-10 md:w-12 h-[2px] bg-[#ffffff]/60 md:bg-[#0f766e]" />
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#ffffff]/90 md:text-[#0f766e] font-bold">
                PREMIUM DENTAL CARE
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="overflow-hidden py-1">
              <h1 className="leading-tight mt-1 space-y-1 font-serif">
                <span className="block text-2xl md:text-3xl lg:text-4xl font-medium animate-slide-up tracking-tight">
                  {slide.line1}
                </span>
                <span className="block text-lg md:text-xl lg:text-2xl font-light md:font-medium text-[#ffffff]/90 md:text-[#0f766e] tracking-wide animate-slide-up-delay">
                  {slide.line2}
                </span>
              </h1>

              {/* Description */}
              <p className="text-xs text-[#e2e8f0] md:text-[#64748b] leading-relaxed mt-2 md:mt-3 max-w-sm animate-fade-in mx-auto md:mx-0 md:border-l-4 md:border-[#0f766e] md:pl-4 md:min-h-[3.5rem] flex flex-col justify-center md:justify-start transition-all duration-500">
                <span className="md:hidden">
                  {isExpanded ? slide.description : truncateText(slide.description, 10)}
                </span>
                <span className="hidden md:block">
                  {isExpanded ? slide.description : truncateText(slide.description, 20)}
                </span>
              </p>

              {/* Read More Toggle */}
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

              {/* Doctor Badge */}
              <div className="mt-3 md:mt-4 h-auto md:h-12 flex items-center justify-center md:justify-start">
                {slide.hasDoctor && (
                  <div className={`
                    inline-flex items-center gap-2 md:gap-3 p-1.5 md:p-2 pr-3 md:pr-4 rounded-xl 
                    bg-[#ffffff]/10 md:bg-[#f8fafc] border border-[#ffffff]/10 md:border-[#e2e8f0] backdrop-blur-md 
                    transition-all duration-700 delay-300
                    ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
                  `}>
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white border-2 border-[#0f766e] flex items-center justify-center shadow-lg overflow-hidden">
                      <img src={logo} alt="Logo" className="w-full h-full object-contain p-1" draggable="false" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-[#ffffff] md:text-[#0f172a] font-bold text-xs md:text-sm leading-none">
                        {slide.doctorName}
                      </h3>
                      <p className="text-[#ccfbf1] md:text-[#0f766e] text-[9px] uppercase tracking-wider font-bold mt-0.5">
                        {slide.qualification}
                      </p>
                    </div>
                  </div>
                )}
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
      to="/appointment"
      className="group flex items-center gap-2 px-5 py-2.5 bg-[#ffffff] text-[#0f766e] text-[10px] font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_35px_rgba(255,255,255,0.5)] transition-all duration-300 ease-out"
    >
      <span>APPOINTMENT</span>
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

const DesktopArrows = memo(({ direction, onPrev, onNext }) => (
  <>
    <button
      onClick={onPrev}
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
      onClick={onNext}
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
  </>
));

const Pagination = memo(({ current, total, onGoTo, isAutoPlaying, onToggleAutoPlay, onPrev, onNext }) => (
  <div className="absolute z-30 w-auto flex flex-col items-center gap-4 left-1/2 -translate-x-1/2 bottom-20 md:left-6 md:translate-x-0 md:bottom-6">
    <div className="flex items-center gap-4">
      {/* Mobile Left */}
      <button onClick={onPrev} className="md:hidden p-2 rounded-full bg-[#ffffff]/10 hover:bg-[#ffffff]/20 backdrop-blur-sm transition-all">
        <ChevronLeft className="w-4 h-4 text-[#ffffff]" />
      </button>

      {/* Dots */}
      <div className="flex items-center gap-3 p-2 rounded-full backdrop-blur-sm bg-[#0f172a]/10 border border-[#ffffff]/5 cursor-default">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onGoTo(i)}
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

      {/* Mobile Right */}
      <button onClick={onNext} className="md:hidden p-2 rounded-full bg-[#ffffff]/10 hover:bg-[#ffffff]/20 backdrop-blur-sm transition-all">
        <ChevronRight className="w-4 h-4 text-[#ffffff]" />
      </button>
    </div>

    {/* Play/Pause */}
    <button 
      onClick={onToggleAutoPlay}
      className="hidden md:flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#ffffff]/40 hover:text-[#ffffff] transition-colors uppercase pl-2"
    >
      {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
      {isAutoPlaying ? "Autoplay" : "Paused"}
    </button>
  </div>
));

const Banner = () => {
  // --- STATE ---
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // --- REFS ---
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

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prev => !prev);
  }, []);

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
      className="relative h-screen w-full overflow-hidden bg-[#0f172a] text-[#ffffff] font-sans cursor-grab active:cursor-grabbing"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* 1. BACKGROUNDS */}
      {HERO_SLIDES.map((slide, index) => (
        <SlideBackground 
          key={slide.id} 
          slide={slide} 
          isActive={index === current} 
          isLoaded={heroLoaded} 
        />
      ))}

      {/* 2. CONTENT */}
      <SlideContent 
        slide={HERO_SLIDES[current]} 
        isLoaded={heroLoaded} 
        isExpanded={isExpanded} 
        setIsExpanded={setIsExpanded} 
      />

      {/* 3. MOBILE ACTIONS */}
      <MobileActions isLoaded={heroLoaded} />

      {/* 4. CONTROLS */}
      <DesktopArrows 
        direction={direction} 
        onPrev={prevSlide} 
        onNext={nextSlide} 
      />

      <Pagination 
        current={current} 
        total={HERO_SLIDES.length} 
        onGoTo={goToSlide} 
        isAutoPlaying={isAutoPlaying} 
        onToggleAutoPlay={toggleAutoPlay}
        onPrev={prevSlide}
        onNext={nextSlide}
      />

      {/* Styles */}
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
    </section>
  );
};

export default Banner;
