const services = [
  {
    id: 1,
    slug: "general-care",
    title: "General Dental Care",
    description: "Comprehensive oral health maintenance including exams, cleanings, and preventative treatments to keep your smile healthy for life.",
    candidates: [
      "Routine Checkups",
      "Cavity Prevention",
      "Gum Health",
      "Bad Breath Issues"
    ],
    steps: [
      { title: "Examination", desc: "Thorough visual and X-ray inspection of teeth and gums." },
      { title: "Cleaning", desc: "Removal of plaque and tartar buildup." },
      { title: "Treatment Plan", desc: "Personalized advice for ongoing oral hygiene." }
    ],
    benefits: [
      "Prevents Tooth Decay",
      "Early Detection",
      "Fresher Breath",
      "Saves Money Long-term"
    ]
  },
  {
    id: 2,
    slug: "smile-design",
    title: "Cosmetic Smile Design",
    description: "Transform your smile with veneers, whitening, and aesthetic contouring designed to boost your confidence.",
    candidates: [
      "Discolored Teeth",
      "Chipped Teeth",
      "Gaps",
      "Misaligned Smiles"
    ],
    steps: [
      { title: "Consultation", desc: "Discussing your aesthetic goals and options." },
      { title: "Mockup", desc: "Digital or physical preview of your new smile." },
      { title: "Preparation", desc: "Preparing teeth for veneers or treatment." },
      { title: "Finalization", desc: "Bonding the final restorations." }
    ],
    benefits: [
      "Boosted Confidence",
      "Youthful Appearance",
      "Permanent Results",
      "Stain Resistance"
    ]
  },
  {
    id: 3,
    slug: "implant-dentistry",
    title: "Implant Dentistry",
    description: "Permanent, natural-looking replacements for missing teeth that restore full function and aesthetics.",
    candidates: [
      "Missing Teeth",
      "Loose Dentures",
      "Bone Loss",
      "Difficulty Chewing"
    ],
    steps: [
      { title: "Assessment", desc: "CT scans to evaluate bone density." },
      { title: "Placement", desc: "Surgical placement of the titanium post." },
      { title: "Healing", desc: "Osseointegration period for stability." },
      { title: "Restoration", desc: "Attaching the custom crown." }
    ],
    benefits: [
      "Natural Look & Feel",
      "Prevents Bone Loss",
      "No Dietary Restrictions",
      "Lifetime Durability"
    ]
  },
  {
    id: 4,
    slug: "Orthodontics",
    title: "Orthodontics",
    description: "Straighten your teeth and correct bite issues with modern braces or clear aligners for a healthier smile.",
    candidates: [
      "Crooked Teeth",
      "Overbite/Underbite",
      "Crowding",
      "Jaw Pain"
    ],
    steps: [
      { title: "Records", desc: "Photos, X-rays, and digital scans." },
      { title: "Bonding/Fitting", desc: "Applying braces or delivering aligners." },
      { title: "Adjustments", desc: "Regular visits to progress movement." },
      { title: "Retention", desc: "Retainers to maintain the new position." }
    ],
    benefits: [
      "Easier Cleaning",
      "Better Digestion",
      "Reduced Jaw Strain",
      "Aesthetic Harmony"
    ]
  }
];

export default services;