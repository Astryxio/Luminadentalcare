import React, { useState, useEffect } from "react";
import {
  Shield,
  Lock,
  Globe,
  FileText,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ArrowUp,
} from "lucide-react";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("section-1");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = document.querySelectorAll('section[id^="section-"]');
      let current = "";
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 160) {
          current = section.id;
        }
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({
      top: el.offsetTop - 120,
      behavior: "smooth",
    });
  };

  const privacyData = [
    {
      id: "section-1",
      title: "Introduction",
      icon: <Shield className="w-5 h-5" />,
      content:
        "LUMINA Dental Care values your privacy and is committed to protecting your personal and medical information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you interact with our website or services.",
    },
    {
      id: "section-2",
      title: "Website Ownership",
      icon: <FileText className="w-5 h-5" />,
      content:
        "This website is designed, developed, and maintained by ASTRYX Tech & Digital. LUMINA Dental Care is the dental service provider represented on this platform.",
    },
    {
      id: "section-3",
      title: "Information We Collect",
      icon: <FileText className="w-5 h-5" />,
      content:
        "We may collect personal information including name, email address, phone number, appointment details, account credentials, and any information voluntarily submitted through forms or portals.",
    },
    {
      id: "section-4",
      title: "Medical Information",
      icon: <AlertCircle className="w-5 h-5" />,
      content:
        "Medical or dental information submitted through appointment forms or consultations is handled with strict confidentiality and used solely for providing appropriate dental care.",
    },
    {
      id: "section-5",
      title: "How We Use Your Information",
      icon: <CheckCircle2 className="w-5 h-5" />,
      content:
        "Your information is used to manage appointments, respond to inquiries, provide services, improve website performance, and ensure platform security.",
    },
    {
      id: "section-6",
      title: "Cookies & Tracking",
      icon: <Globe className="w-5 h-5" />,
      content:
        "We use cookies and similar technologies to analyze traffic, enhance user experience, and understand usage patterns. You can control cookies through browser settings.",
    },
    {
      id: "section-7",
      title: "Analytics Tools",
      icon: <Globe className="w-5 h-5" />,
      content:
        "Third-party analytics tools may be used to collect anonymized usage data to help us improve website performance and content relevance.",
    },
    {
      id: "section-8",
      title: "Data Sharing",
      icon: <Shield className="w-5 h-5" />,
      content:
        "We do not sell or rent personal data. Information may be shared only with trusted service providers or when legally required.",
    },
    {
      id: "section-9",
      title: "Third-Party Links",
      icon: <Globe className="w-5 h-5" />,
      content:
        "Our website may contain links to third-party websites. LUMINA Dental Care is not responsible for the privacy practices or content of those sites.",
    },
    {
      id: "section-10",
      title: "Data Security",
      icon: <Lock className="w-5 h-5" />,
      content:
        "We implement technical and organizational security measures to protect personal data. However, no online transmission is 100% secure.",
    },
    {
      id: "section-11",
      title: "Account Security",
      icon: <Lock className="w-5 h-5" />,
      content:
        "Users are responsible for maintaining the confidentiality of their login credentials and for all activities conducted through their account.",
    },
    {
      id: "section-12",
      title: "Children’s Privacy",
      icon: <AlertCircle className="w-5 h-5" />,
      content:
        "This website is not intended for children under the age of 13. We do not knowingly collect personal data from children.",
    },
    {
      id: "section-13",
      title: "Consent",
      icon: <CheckCircle2 className="w-5 h-5" />,
      content:
        "By using this website, you consent to the collection and use of information in accordance with this Privacy Policy.",
    },
    {
      id: "section-14",
      title: "Data Retention",
      icon: <FileText className="w-5 h-5" />,
      content:
        "We retain personal information only for as long as necessary to fulfill the purposes outlined in this policy or as required by law.",
    },
    {
      id: "section-15",
      title: "User Rights",
      icon: <Shield className="w-5 h-5" />,
      content:
        "You may request access, correction, or deletion of your personal data, subject to legal and medical record retention requirements.",
    },
    {
      id: "section-16",
      title: "Email & Communications",
      icon: <Globe className="w-5 h-5" />,
      content:
        "By providing your contact details, you may receive service-related communications. Promotional messages can be opted out at any time.",
    },
    {
      id: "section-17",
      title: "Legal Compliance",
      icon: <Shield className="w-5 h-5" />,
      content:
        "We comply with applicable data protection and healthcare privacy regulations relevant to our operations.",
    },
    {
      id: "section-18",
      title: "Policy Updates",
      icon: <FileText className="w-5 h-5" />,
      content:
        "This Privacy Policy may be updated periodically. Continued use of the website indicates acceptance of the updated policy.",
    },
    {
      id: "section-19",
      title: "International Users",
      icon: <Globe className="w-5 h-5" />,
      content:
        "If you access this website from outside the United States, you acknowledge that your data may be processed in jurisdictions with different data protection laws.",
    },
    {
      id: "section-20",
      title: "Contact Information",
      icon: <FileText className="w-5 h-5" />,
      content:
        "For questions regarding this Privacy Policy, please contact LUMINA Dental Care using the official contact details provided on this website.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-600">
      <header className="pt-24 pb-12 text-center border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border text-xs uppercase tracking-wider mb-6">
            <Shield className="w-3 h-3" /> Legal Documentation
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-stone-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-stone-500 max-w-2xl mx-auto">
            Transparency, trust, and protection of your personal and medical
            information are central to our values.
          </p>
          <div className="mt-6 text-sm text-stone-400">
            ● Last Updated: January 2026
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16 lg:grid lg:grid-cols-12 lg:gap-12">
        <aside className="hidden lg:block lg:col-span-3 sticky top-24">
          <h3 className="text-sm font-semibold uppercase text-stone-400 mb-4">
            Table of Contents
          </h3>
          {privacyData.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition
              ${
                activeSection === item.id
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "hover:bg-stone-100 text-stone-500"
              }`}
            >
              {item.title}
              {activeSection === item.id && (
                <ChevronRight className="inline w-3 h-3 ml-2" />
              )}
            </button>
          ))}
        </aside>

        <div className="lg:col-span-9 space-y-6">
          {privacyData.map((item, index) => (
            <section
              key={item.id}
              id={item.id}
              className="bg-white border border-stone-200 rounded-xl p-6 md:p-8"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-stone-800 mb-4">
                {index + 1}. {item.title}
              </h2>
              <p className="leading-relaxed">{item.content}</p>
            </section>
          ))}
        </div>
      </main>

      <footer className="border-t border-stone-200 py-10 text-center text-sm text-stone-400">
        © 2026 LUMINA Dental Care · Designed by ASTRYX Tech & Digital
      </footer>

      {showScrollTop && (
        <button
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          className="fixed bottom-8 right-8 p-3 rounded-full bg-white border shadow hover:text-green-600"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default PrivacyPolicy;
