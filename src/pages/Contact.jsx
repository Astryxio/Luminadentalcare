import React, { useState, useEffect, useCallback, memo } from "react";
import { useLocation } from "react-router-dom";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  ShieldCheck, 
  Navigation,
  CheckCircle,
  Loader2
} from "lucide-react";

// --- SUBCOMPONENTS ---

const ContactHeader = memo(() => (
  <div className="mb-16 animate-slide-up">
    <div className="inline-flex items-center gap-2 mb-6">
      <span className="w-2 h-2 rounded-full bg-[#14b8a6] shadow-[0_0_8px_rgba(20,184,166,0.4)] animate-pulse"></span>
      <span className="text-xs font-mono text-[#64748b] uppercase tracking-widest">Illinois • UNITED STATES</span>
    </div>
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium font-serif tracking-tight text-[#0f172a] mb-6">
      Secure <span className="italic text-[#0f766e]">Communication</span>
    </h1>
    <p className="text-lg text-[#64748b] max-w-2xl leading-relaxed font-light">
      Direct access to our LUMINA clinical facility. 
      Initiate a digital inquiry or schedule a physical visitation for advanced oral restoration.
    </p>
  </div>
));

const ContactInfoItem = memo(({ icon: Icon, title, children }) => (
  <div className="flex items-start gap-4 group/item cursor-default">
    <div className="w-10 h-10 rounded-2xl bg-[#f0fdfa] flex items-center justify-center text-[#0f766e] group-hover/item:bg-[#0f766e] group-hover/item:text-[#ffffff] transition-colors duration-300 shrink-0 shadow-sm">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <h4 className="font-bold text-[#0f172a] mb-1 text-sm">{title}</h4>
      <div className="text-[#64748b] text-xs leading-relaxed font-light font-mono">
        {children}
      </div>
    </div>
  </div>
));

const InfoCard = memo(() => (
  <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-[2rem] p-8 shadow-sm hover:shadow-2xl hover:shadow-[#0f766e]/10 transition-all duration-500 hover:-translate-y-1 group animate-fade-in-up">
    <h3 className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest mb-8 border-b border-[#f1f5f9] pb-4">
      Facility Coordinates
    </h3>
    
    <div className="space-y-6">
      <ContactInfoItem icon={MapPin} title="Clinical HQ">
        <p>245 N Michigan Avenue</p>
        <p>Suite 420</p>
        <p>Chicago, IL 60611</p>
        <p>United States</p>
        <p className="mt-1 text-[10px] opacity-70">Area code: 60611</p>
      </ContactInfoItem>

      <ContactInfoItem icon={Phone} title="Emergency Line">
        <p className="hover:text-[#0f766e] transition-colors cursor-pointer">+1 (312) 555-0198</p>
      </ContactInfoItem>

      <ContactInfoItem icon={Mail} title="Digital Inquiries">
        <p className="hover:text-[#0f766e] transition-colors cursor-pointer">contactinfo@Luminacare.com</p>
      </ContactInfoItem>
    </div>
  </div>
));

const HoursCard = memo(() => (
  <div className="bg-[#134e4a] text-[#ffffff] rounded-[2rem] p-8 relative overflow-hidden group shadow-2xl animate-fade-in-up delay-100">
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#2dd4bf]/20 blur-3xl rounded-full group-hover:bg-[#2dd4bf]/30 transition-all duration-500"></div>
    <div className="relative z-10 flex items-center gap-4 mb-6">
      <Clock className="w-5 h-5 text-[#5eead4]" />
      <span className="font-bold tracking-tight text-sm uppercase">OPERATIONAL HOURS (IST)</span>
    </div>
    <div className="space-y-3 relative z-10">
      <div className="flex justify-between text-xs border-b border-[#ffffff]/10 pb-2">
        <span className="text-[#ccfbf1]/70">Mon - Fri</span>
        <span className="font-mono text-[#ccfbf1]">09:00 - 18:00</span>
      </div>
      <div className="flex justify-between text-xs border-b border-[#ffffff]/10 pb-2">
        <span className="text-[#ccfbf1]/70">Saturday</span>
        <span className="font-mono text-[#ccfbf1]">10:00 - 14:00</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-[#ccfbf1]/70">Sunday</span>
        <span className="text-[#f87171] text-[10px] font-bold uppercase py-1 px-2 bg-[#f87171]/10 rounded">Emergency Only</span>
      </div>
    </div>
  </div>
));

const MapSection = memo(() => (
  <div id="locations" className="relative w-full h-80 lg:h-96 bg-[#e2e8f0] rounded-[2.5rem] overflow-hidden border-4 border-[#ffffff] shadow-xl shadow-[#e2e8f0]/50 group animate-fade-in-up delay-200">
    {/* Badge */}
    <div className="absolute top-4 left-4 z-20 bg-[#ffffff]/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-[#f1f5f9] flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
      <span className="text-[10px] font-black uppercase tracking-widest text-[#0f172a]">Live Location</span>
    </div>

    <iframe 
      title="Illinois, USA"
      className="w-full h-full grayscale-[50%] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700"
      src="https://maps.google.com/maps?q=Evanston,+Illinois&z=13&output=embed"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
    
    <div className="absolute bottom-4 right-4 z-20">
       <button className="bg-[#0f172a] text-[#ffffff] p-3 rounded-full hover:bg-[#0f766e] transition-colors shadow-lg active:scale-95 transform duration-200">
         <Navigation className="w-5 h-5" />
       </button>
    </div>
  </div>
));

const ContactForm = memo(({ formState, handleChange, handleSubmit, isSubmitting, isSuccess, setIsSuccess }) => (
  <div className="bg-[#ffffff] rounded-[2.5rem] p-8 lg:p-10 border border-[#e2e8f0] shadow-sm relative overflow-hidden min-h-[500px] flex flex-col justify-center hover:shadow-2xl hover:shadow-[#0f766e]/5 transition-all duration-500 animate-fade-in-up delay-300">
     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0f766e] via-[#2dd4bf] to-[#0f766e]"></div>
     
     {isSuccess ? (
       <div className="flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
         <div className="w-20 h-20 bg-[#ecfdf5] rounded-full flex items-center justify-center mb-6">
           <CheckCircle className="w-10 h-10 text-[#10b981]" />
         </div>
         <h2 className="text-2xl font-medium font-serif text-[#0f172a] mb-2">Transmission Secure</h2>
         <p className="text-[#64748b] max-w-sm mb-8 text-sm font-light">
           Your clinical inquiry has been encrypted and routed to our intake specialists. You will receive a secure confirmation via email shortly.
         </p>
         <button 
           onClick={() => setIsSuccess(false)}
           className="px-6 py-3 bg-[#0f172a] text-[#ffffff] rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#0f766e] transition-colors"
         >
           Submit New Query
         </button>
       </div>
     ) : (
       <>
         <div className="mb-8">
           <h2 className="text-2xl font-medium font-serif text-[#0f172a]">Digital Consultation</h2>
           <p className="text-[#64748b] text-sm mt-2 font-light">Send an encrypted message directly to our triage team.</p>
         </div>

         <form onSubmit={handleSubmit} className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
               <label htmlFor="name" className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest ml-1">Full Name</label>
               <input 
                  type="text" 
                  name="name"
                  id="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 text-[#0f172a] text-sm placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 focus:border-[#0f766e] transition-all"
                  placeholder="e.g John Doe"
               />
             </div>
             <div className="space-y-2">
               <label htmlFor="email" className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest ml-1">Email Address</label>
               <input 
                  type="email" 
                  name="email"
                  id="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 text-[#0f172a] text-sm placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 focus:border-[#0f766e] transition-all"
                  placeholder="contact@domain.com"
               />
             </div>
           </div>

           <div className="space-y-2">
              <label htmlFor="type" className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest ml-1">Inquiry Type</label>
              <div className="relative">
                <select 
                  name="type"
                  id="type"
                  value={formState.type}
                  onChange={handleChange}
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 text-[#0f172a] text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 focus:border-[#0f766e] transition-all cursor-pointer"
                >
                  <option value="consultation">General Consultation</option>
                  <option value="emergency">Emergency Surgery</option>
                  <option value="implants">Implant Inquiry</option>
                  <option value="partnerships">B2B Partnership</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#94a3b8]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
           </div>

           <div className="space-y-2">
             <label htmlFor="message" className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest ml-1">Clinical Notes</label>
             <textarea 
                name="message"
                id="message"
                rows="3"
                value={formState.message}
                onChange={handleChange}
                required
                className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 text-[#0f172a] text-sm placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#0f766e]/20 focus:border-[#0f766e] transition-all resize-none"
                placeholder="Briefly describe your requirements..."
             ></textarea>
           </div>

           <button 
             type="submit" 
             disabled={isSubmitting}
             className="w-full bg-[#0f172a] text-[#ffffff] font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-[#0f766e] transition-all duration-300 shadow-lg shadow-[#0f172a]/10 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group/submit uppercase tracking-widest text-xs"
           >
             {isSubmitting ? (
               <Loader2 className="w-5 h-5 animate-spin" />
             ) : (
               <>
                 Transmit Data
                 <Send className="w-4 h-4 group-hover/submit:translate-x-1 transition-transform" />
               </>
             )}
           </button>

           <div className="flex items-center justify-center gap-2 text-[#94a3b8] text-[10px] mt-4 uppercase tracking-wider">
             <ShieldCheck className="w-3 h-3" />
             <span>End-to-end 256-bit encryption</span>
           </div>
         </form>
       </>
     )}
  </div>
));

const Contact = () => {
  const { hash } = useLocation();

  // --- SCROLL EFFECT ---
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  // --- FORM STATE ---
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    type: "consultation",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- HANDLERS ---
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: "", email: "", type: "consultation", message: "" });
    }, 2000);
  }, []);

  const handleChange = useCallback((e) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans selection:bg-[#134e4a] selection:text-[#ffffff]">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.4]" 
           style={{ backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-16">
        
        <ContactHeader />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-8">
            <InfoCard />
            <HoursCard />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 flex flex-col gap-8 h-full">
            <MapSection />
            <ContactForm 
              formState={formState}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              isSuccess={isSuccess}
              setIsSuccess={setIsSuccess}
            />
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in-up {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0; /* Start hidden */
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>
    </div>
  );
};

export default Contact;
