import React, { useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, Instagram, Twitter, ArrowRight, Mail, MapPin, Phone, Loader2, Check 
} from "lucide-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import logo from "../../assets/common/logo.svg";

// --- CONSTANTS & DATA ---

const CURRENT_YEAR = new Date().getFullYear();

const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Events', path: '/events' },
  { name: 'Contact', path: '/contact' }
];

const SERVICE_ITEMS = [
  "Laser Teeth Whitening", 
  "Zirconia Implants", 
  "Clear-Align AI", 
  "Digital Oral Screening", 
  "Robotic Root Canal"
];

const SOCIAL_MEDIA = [
  { icon: Facebook, href: "https://www.facebook.com/kallis.665748/" },
  { icon: Instagram, href: "https://www.instagram.com/getastryx/" },
  { icon: Twitter, href: "https://x.com/onekallis" }
];

// --- SUBCOMPONENTS ---

/**
 * Background  elements.
 * Memoized to prevent re-rendering since it's static.
 */
const FooterBackground = memo(() => (
  <>
    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0f766e]/50 to-transparent" />
    <div className="absolute top-20 right-0 pointer-events-none select-none opacity-[0.02] transform translate-x-1/3">
      <h1 className="text-[6rem] md:text-[10rem] font-bold text-[#ffffff] leading-none tracking-tighter">
        LUMINA
      </h1>
    </div>
  </>
));

/**
 * Reusable Footer Link Component.
 */
const FooterLink = memo(({ to, onClick, children }) => (
  <Link 
    to={to}
    onClick={onClick}
    className="text-[#94a3b8] text-xs hover:text-[#2dd4bf] hover:pl-2 transition-all duration-300 block break-words"
  >
    {children}
  </Link>
));

/**
 * Contact Info Item.
 */
const ContactItem = memo(({ icon: Icon, children }) => (
  <div className="flex items-start gap-3 text-[#94a3b8] text-xs">
    <Icon size={14} className="mt-0.5 text-[#2dd4bf] shrink-0" />
    <span>{children}</span>
  </div>
));

// --- MAIN COMPONENT ---

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  // Smooth scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle newsletter subscription
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      await addDoc(collection(db, "subscribers"), {
        email,
        createdAt: new Date().toISOString(),
        source: "footer"
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
    <footer className="w-full bg-[#0f172a] text-[#ffffff] font-sans relative overflow-hidden border-t border-[#1e293b]">
      
      <FooterBackground />

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-10">
        
        {/* TOP CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-10 border-b border-[#ffffff]/10">
          <div className="text-center md:text-left">
             <h2 className="text-lg md:text-xl font-medium font-serif text-[#ffffff] mb-2">
               Ready to transform your smile?
             </h2>
             <p className="text-[#94a3b8] text-xs font-light">
               Book your consultation today and experience world-class care.
             </p>
          </div>
          <Link 
            to="/appointment"
            onClick={scrollToTop}
            className="group flex items-center gap-3 px-6 py-3 bg-[#0f766e] text-[#ffffff] rounded-full font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-[#0f766e]/25 hover:bg-[#115e59] transition-all transform hover:-translate-y-1"
          >
            <span>Book Appointment</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* MIDDLE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-10">
          
          {/* 1. BRAND */}
          <div className="space-y-4">
            <Link to="/" onClick={scrollToTop} className="flex items-center gap-3 w-fit">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-widest text-[#ffffff] leading-none">LUMINA</span>
                <span className="text-[10px] tracking-[0.2em] text-[#94a3b8] uppercase">DENTAL CARE</span>
              </div>
            </Link>
            <p className="text-[#94a3b8] text-xs leading-relaxed text-justify font-light">
              Merging artistry with robotic precision. We are redefining the standard of modern clinical excellence.
            </p>
            <div className="space-y-2 pt-2">
               <ContactItem icon={MapPin}>
              Chicago, IL 60611, United States
               </ContactItem>
               <ContactItem icon={Phone}>
                +1 (312) 555-0198
               </ContactItem>
               <ContactItem icon={Mail}>
                 contactinfo@luminacare.com
               </ContactItem>
            </div>
          </div>

          {/* 2. NAVIGATION */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold text-[#ffffff] uppercase tracking-widest border-l-2 border-[#0f766e] pl-3">
              Explore
            </h4>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <FooterLink to={item.path} onClick={scrollToTop}>
                    {item.name}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. EXPERTISE */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold text-[#ffffff] uppercase tracking-widest border-l-2 border-[#0f766e] pl-3">
              Expertise
            </h4>
            <ul className="space-y-2">
              {SERVICE_ITEMS.map((item) => (
                <li key={item}>
                  <FooterLink to="/services" onClick={scrollToTop}>
                    {item}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. CONNECT */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold text-[#ffffff] uppercase tracking-widest border-l-2 border-[#0f766e] pl-3">
              Connect
            </h4>
            <p className="text-[#94a3b8] text-xs font-light">
              Subscribe for the latest health tips and clinic updates.
            </p>
            
            <form onSubmit={handleSubscribe} className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email Address"
                className="w-full bg-[#ffffff]/5 border border-[#ffffff]/10 rounded-lg py-2.5 px-3.5 text-xs text-[#ffffff] focus:outline-none focus:border-[#0f766e] focus:bg-[#ffffff]/10 transition-all placeholder:text-[#64748b]"
              />
              <button 
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-[#ffffff] transition-all ${status === 'success' ? 'bg-green-500' : 'bg-[#0f766e] hover:bg-[#115e59]'}`}
              >
                {status === "loading" ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : status === "success" ? (
                  <Check size={14} />
                ) : (
                  <ArrowRight size={14} />
                )}
              </button>
            </form>
            
            {status === "error" && (
              <p className="text-red-400 text-[10px] mt-1">Something went wrong. Please try again.</p>
            )}

            <div className="flex gap-3 pt-3">
              {SOCIAL_MEDIA.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-[#ffffff]/5 flex items-center justify-center text-[#94a3b8] hover:bg-[#0f766e] hover:text-[#ffffff] hover:-translate-y-1 transition-all border border-[#ffffff]/5"
                >
                  <social.icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- BOTTOM STRIP --- */}
      <div className="w-full bg-[#020617] relative z-20 border-t border-[#1e293b]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-bold text-[#94a3b8] tracking-wide text-center md:text-left uppercase">
            © {CURRENT_YEAR} ASTRYX Tech & Digital. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold text-[#64748b] uppercase tracking-wider">
            <Link to="/privacy-policy" className="hover:text-[#ffffff] transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-use" className="hover:text-[#ffffff] transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
