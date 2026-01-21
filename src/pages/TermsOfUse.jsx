import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ScrollText, 
  CheckCircle2, 
  AlertCircle, 
  Globe, 
  Lock, 
  FileText, 
  ChevronRight,
  ArrowUp
} from 'lucide-react';

const TermsOfUse = () => {
  const [activeSection, setActiveSection] = useState('section-1');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll detection for active section and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      // Show/Hide Scroll Top Button
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Detect active section
      const sections = document.querySelectorAll('section[id^="section-"]');
      let current = '';
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 150)) {
          current = section.getAttribute('id');
        }
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky header
      const offset = 100; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const termsData = [
    { 
      id: 'section-1', 
      title: 'Website Purpose', 
      icon: <Globe className="w-5 h-5" />, 
      content: 'This website is intended to provide general information about dental services offered by LUMINA Dental Care. The content is for informational purposes only and does not constitute medical advice, diagnosis, or treatment plans unless explicitly stated in a patient contract.' 
    },
    { 
      id: 'section-2', 
      title: 'Medical Disclaimer', 
      icon: <AlertCircle className="w-5 h-5" />, 
      content: (
        <>
          <p className="mb-4">
            The information provided on this website is intended for general
            informational purposes only and does not constitute medical or dental
            advice, diagnosis, or treatment.
          </p>
          <p>
            LUMINA Dental Care does not provide medical advice through this website.
            Any reliance on the information provided is strictly at your own risk.
            Always seek the advice of a qualified dental professional regarding any
            medical condition or treatment.
          </p>
        </>
      )
    },
    { id: 'section-3', title: 'User Responsibilities', icon: <CheckCircle2 className="w-5 h-5" />, content: 'Users must provide accurate and truthful information when interacting with our forms. You agree not to misuse, disrupt, or attempt to damage the website, nor attempt unauthorized access to our systems, patient data, or administrative panels.' },
    { id: 'section-4', title: 'Appointments & Forms', icon: <FileText className="w-5 h-5" />, content: 'Submitting an appointment request or enquiry form does not guarantee confirmation. LUMINA Dental Care reserves the right to accept, reject, or reschedule appointments at its discretion based on availability and medical urgency.' },
    { id: 'section-5', title: 'Intellectual Property', icon: <Shield className="w-5 h-5" />, content: 'All content, design, graphics, logos, text, and code on this website are the intellectual property of LUMINA Dental Care or ASTRYX Tech & Digital. Unauthorized reproduction, distribution, or commercial use is strictly prohibited without written consent.' },
    { id: 'section-6', title: 'Third-Party Services', icon: <Globe className="w-5 h-5" />, content: 'This website may integrate third-party services such as authentication, analytics, payment gateways, or external links. LUMINA Dental Care is not responsible for the availability, accuracy, or privacy practices of these third-party platforms.' },
    { id: 'section-7', title: 'Limitation of Liability', icon: <AlertCircle className="w-5 h-5" />, content: 'LUMINA Dental Care shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this website, including but not limited to damages for loss of profits, data, or other intangible losses.' },
    { id: 'section-8', title: 'Website Availability', icon: <Globe className="w-5 h-5" />, content: 'We do not guarantee uninterrupted or error-free operation of the website. Access may be suspended for maintenance, updates, or technical reasons without prior notice. We are not liable for any loss caused by such interruptions.' },
    { id: 'section-9', title: 'Modifications to Terms', icon: <ScrollText className="w-5 h-5" />, content: 'These Terms of Use may be updated at any time to reflect changes in law or our services. Continued use of the website after changes are published constitutes acceptance of the revised terms. We encourage users to review this page periodically.' },
    { id: 'section-10', title: 'Governing Law', icon: <Shield className="w-5 h-5" />, content: 'These terms shall be governed by and interpreted in accordance with applicable laws of United States. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts located within the registered district of LUMINA Dental Care.' },
    { id: 'section-11', title: 'Privacy Policy Reference', icon: <Lock className="w-5 h-5" />, content: 'Your use of this website is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal and medical data. By using this site, you consent to the data practices described therein.' },
    { id: 'section-12', title: 'Account Security', icon: <Lock className="w-5 h-5" />, content: 'If you create an account on our patient portal, you are responsible for maintaining the confidentiality of your credentials. You agree to notify us immediately of any unauthorized access to or use of your account.' },
    { id: 'section-13', title: 'Termination of Use', icon: <AlertCircle className="w-5 h-5" />, content: 'We reserve the right to terminate or suspend your access to our website and services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.' },
    { id: 'section-14', title: 'Indemnification', icon: <Shield className="w-5 h-5" />, content: 'You agree to indemnify, defend, and hold harmless LUMINA Dental Care, its officers, directors, employees, and agents from any claims, liabilities, damages, and expenses arising from your use of the website or violation of these Terms.' },
    { id: 'section-15', title: 'Communications', icon: <Globe className="w-5 h-5" />, content: 'By providing your contact information, you consent to receive communications from us via email, SMS, or phone regarding appointments, medical reminders, and promotional offers. You may opt-out of promotional communications at any time.' },
    { id: 'section-16', title: 'Age Restrictions', icon: <CheckCircle2 className="w-5 h-5" />, content: 'This website is intended for users who are at least 18 years old. Individuals under the age of 18 may only use the website with the involvement and consent of a parent or legal guardian.' },
    { id: 'section-17', title: 'Cookie Usage', icon: <Globe className="w-5 h-5" />, content: 'We use cookies and similar tracking technologies to track the activity on our Service and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.' },
    { id: 'section-18', title: 'Dispute Resolution', icon: <Shield className="w-5 h-5" />, content: 'In the event of a dispute, users agree to first attempt to resolve the issue informally by contacting LUMINA Dental Care. If informal resolution fails, disputes may be resolved through binding arbitration in accordance with United Statesn Arbitration laws.' },
    { id: 'section-19', title: 'Severability', icon: <ScrollText className="w-5 h-5" />, content: 'If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.' },
    { id: 'section-20', title: 'Entire Agreement', icon: <FileText className="w-5 h-5" />, content: 'These Terms of Use, together with our Privacy Policy, constitute the entire agreement between you and LUMINA Dental Care regarding the use of the website and supersede any prior agreements or understandings.' },
    { id: 'section-21', title: 'Contact Information', icon: <Globe className="w-5 h-5" />, content: 'For any questions regarding these Terms of Use, please contact LUMINA Dental Care through the official contact information provided on this website or via email at legal@kabiodental.com.' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-600 font-sans selection:bg-green-100 selection:text-green-800">
      
      {/* Background Ambience (Subtle Warmth) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-stone-200/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-stone-200/40 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        
        {/* Header Section */}
        <header className="pt-24 pb-12 px-6 lg:px-12 text-center relative border-b border-stone-200 bg-[#FDFBF7]/90 backdrop-blur-md">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-500 text-xs font-medium tracking-wider uppercase mb-6">
              <Shield className="w-3 h-3" /> Legal Documentation
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-stone-900 tracking-tight mb-6">
              Terms of Use
            </h1>
            <p className="text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed">
              Please read these terms carefully before using our digital services. 
              Your relationship with <span className="text-stone-900 font-semibold border-b-2 border-green-200 hover:border-green-500 transition-colors">LUMINA Dental Care</span> matters to us.
            </p>
            <div className="mt-8 text-sm text-stone-400 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Last Updated: January 2026
            </div>
          </div>
        </header>

        {/* Main Content Layout */}
        <main className="max-w-7xl mx-auto px-6 py-16 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            
            {/* Desktop Navigation Sidebar */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 space-y-1 max-h-[80vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-stone-300 scrollbar-track-transparent">
                <h3 className="text-sm font-semibold text-stone-400 uppercase tracking-wider mb-4 px-3">
                  Table of Contents
                </h3>
                {termsData.map((term) => (
                  <button
                    key={term.id}
                    onClick={() => scrollToSection(term.id)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 group flex items-center justify-between
                      ${activeSection === term.id 
                        ? 'bg-green-50 text-green-700 border border-green-200 font-medium' 
                        : 'text-stone-500 hover:text-green-700 hover:bg-stone-100'
                      }`}
                  >
                    <span className="truncate">{term.title}</span>
                    {activeSection === term.id && <ChevronRight className="w-3 h-3 text-green-600" />}
                  </button>
                ))}
              </div>
            </aside>

            {/* Terms Content */}
            <div className="lg:col-span-9 space-y-6">
              {/* Introduction Card */}
              <div className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 mb-10 shadow-sm">
                <p className="text-stone-600 leading-relaxed text-lg">
                  These Terms of Use govern your access to and use of the LUMINA Dental Care website. 
                  By accessing this website, you agree to comply with and be bound by these terms. 
                  If you do not agree, please discontinue use immediately.
                </p>
              </div>

              {/* Sections Map */}
              <div className="grid gap-6">
                {termsData.map((term, index) => (
                  <section 
                    key={term.id} 
                    id={term.id}
                    className={`group relative transition-all duration-300 ${activeSection === term.id ? 'opacity-100' : 'opacity-90 hover:opacity-100'}`}
                  >
                    
                    <div className="relative bg-white border border-stone-200 rounded-xl p-6 md:p-8 overflow-hidden hover:border-green-300 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start gap-5">
                        {/* Number Badge */}
                        <div className="hidden md:flex flex-col items-center gap-1 mt-1">
                          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-stone-100 text-stone-400 text-sm font-bold border border-stone-200 group-hover:text-green-600 group-hover:bg-green-50 group-hover:border-green-100 transition-colors">
                            {index + 1}
                          </span>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-stone-100 text-stone-400 text-xs font-bold border border-stone-200">
                              {index + 1}
                            </span>
                            <h2 className="text-xl md:text-2xl font-semibold text-stone-800 group-hover:text-green-800 transition-colors">
                              {term.title}
                            </h2>
                          </div>
                          
                          <div className="text-stone-600 leading-relaxed text-base md:text-lg">
                            {term.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Footer Info */}
        <footer className="border-t border-stone-200 bg-[#FDFBF7] py-12 text-center">
          <p className="text-stone-400 text-sm">
            © 2026 LUMINA Dental Care. All rights reserved. <br/>
            Designed by ASTRYX Tech & Digital.
          </p>
        </footer>
      </div>

      {/* Scroll to top FAB */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-white text-stone-600 border border-stone-200 shadow-lg hover:border-green-300 hover:text-green-600 hover:shadow-xl hover:scale-105 transition-all duration-300 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <style jsx global>{`
        /* Custom Scrollbar for TOC */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #FDFBF7; 
        }
        ::-webkit-scrollbar-thumb {
          background: #E7E5E4; 
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #D6D3D1; 
        }
      `}</style>
    </div>
  );
};

export default TermsOfUse;