export type University = {
  name: string;
  imageSrc: string;
  alt: string;
};

export const universities: University[] = [
  {
    name: "Chapman University",
    imageSrc:
      "https://static.wixstatic.com/media/25edec_2fb3effa0d874017a9b7b9b04f39d71a~mv2.png",
    alt: "Chapman University",
  },
  {
    name: "University of California Riverside",
    imageSrc:
      "https://static.wixstatic.com/media/25edec_4589f393941942c6987ee42b93c4b3c5~mv2.jpg",
    alt: "University California Riverside",
  },
  {
    name: "Colorado School of Mines",
    imageSrc:
      "https://static.wixstatic.com/media/410f26_4241c7d6539e4fda8dfd8843811c0bf0~mv2.png",
    alt: "Colorado School Of Mines",
  },
  {
    name: "Texas A&M University–Commerce",
    imageSrc:
      "https://static.wixstatic.com/media/410f26_31561c5d19b848d483d71e52ef246cdd~mv2.png",
    alt: "Texas A&M University Commerce",
  },
];

export type Benefit = {
  title: string;
  description: string;
};

export const benefits: Benefit[] = [
  {
    title: "24/7 Technology Access",
    description:
      "Extend access to shared technology beyond traditional service-desk hours.",
  },
  {
    title: "Less Manual Checkout",
    description:
      "Automate routine checkout and return steps instead of requiring staff to manage every transaction.",
  },
  {
    title: "Accountability",
    description:
      "Connect authorized users with device checkout records and program controls.",
  },
  {
    title: "Devices Ready to Go",
    description:
      "Secure docking, charging and device-management workflows help prepare technology for future users.",
  },
];

export type Device = {
  name: string;
  description: string;
};

export const devices: Device[] = [
  {
    name: "Laptops",
    description:
      "Enterprise laptops are the most popular checkout option across LaptopsAnytime's supported device categories.",
  },
  {
    name: "MacBooks",
    description: "Supported alongside enterprise Windows and Linux laptop models.",
  },
  {
    name: "Chromebooks",
    description:
      "Selective Chromebook models are supported; compatibility depends on the model and deployment configuration.",
  },
  {
    name: "iPads / Tablets",
    description:
      "Configured with preloaded apps and synced via Apple Configurator for automated checkout and refresh.",
  },
  {
    name: "Portable 110V Chargers",
    description:
      "An on-demand power option for students who bring their own devices, standalone or as part of a larger system.",
  },
];

export type UseCase = {
  title: string;
  description: string;
};

export const useCases: UseCase[] = [
  {
    title: "University Libraries",
    description:
      "Expand student access to shared technology while reducing the need for staff to manually process every transaction.",
  },
  {
    title: "Campus IT",
    description:
      "Provide controlled access to shared devices while maintaining authentication and accountability.",
  },
  {
    title: "Student Unions & Study Spaces",
    description:
      "Place technology access closer to the spaces students use throughout the day.",
  },
  {
    title: "Multi-Building Campuses",
    description:
      "Support technology-lending programs across multiple university locations and environments.",
  },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "How does automated laptop lending work at a university?",
    answer:
      "Students authenticate at the kiosk, select a device, and it's released automatically. When finished, they return it to any open bay, where it's secured and prepared for the next checkout. The process is self-service from start to finish, without a staff member handling each transaction.",
  },
  {
    question: "Can students authenticate with university credentials?",
    answer:
      "Supported authentication approaches include SSO availability, AD/LDAP credentials, and other input methods such as magnetic stripe or barcode, depending on how the deployment is configured with your team.",
  },
  {
    question: "What types of devices can LaptopsAnytime systems support?",
    answer:
      "Enterprise laptops, MacBooks, selective Chromebook models, iPads/tablets, and portable 110V power chargers. Device compatibility and system configuration depend on the selected models and deployment requirements.",
  },
  {
    question: "What happens when a device is returned?",
    answer:
      "The device is inserted into an available bay and secured. Charging and device-management workflows then support preparing it for the next authorized user.",
  },
  {
    question:
      "Can a university configure the system around its existing IT environment?",
    answer:
      "LaptopsAnytime systems can be configured around supported authentication methods, device policies, software images and management tools used by the university — including SSO availability, AD/LDAP, facility-controlled software images, Windows policies, MDM and supported third-party management/reset tools, where appropriate for the deployment.",
  },
  {
    question: "How does LaptopsAnytime approach kiosk security?",
    answer:
      "Kiosks run on a Linux-based operating environment with regular security scans. Network exposure is limited to an outgoing-only SSL connection, with temporary VPN access used only when needed for setup or support.",
  },
];

export type AeoAnnotationContent = {
  id: number;
  title: string;
  explanation: string;
};

export const aeoAnnotations: Record<string, AeoAnnotationContent> = {
  hero: {
    id: 1,
    title: "Clear Market + Solution",
    explanation:
      "The page immediately tells humans and answer engines who this content is for and what problem LaptopsAnytime solves.",
  },
  problem: {
    id: 2,
    title: "Buyer Problem Language",
    explanation:
      "This section uses the language a university IT or library leader might use when asking Google, ChatGPT, Claude or Gemini for help.",
  },
  howItWorks: {
    id: 3,
    title: "Direct, Extractable Answer",
    explanation:
      "The process is explained in simple HTML text alongside visual media, making the answer easy for people and machines to understand.",
  },
  devices: {
    id: 4,
    title: "Clear Product Context",
    explanation:
      "Specific supported device categories help connect LaptopsAnytime with the technology needs university buyers actually research.",
  },
  security: {
    id: 5,
    title: "High-Intent Buying Questions",
    explanation:
      "Technical buyers need answers about authentication, security and integration before they can seriously evaluate a solution.",
  },
  caseStudy: {
    id: 6,
    title: "Evidence and Trust",
    explanation:
      "Real customer evidence gives buyers and answer engines stronger reasons to trust claims about the solution.",
  },
  faq: {
    id: 7,
    title: "Natural-Language Answers",
    explanation:
      "FAQs directly answer realistic buyer questions without turning the page into a wall of copy.",
  },
  architecture: {
    id: 8,
    title: "Information Architecture",
    explanation:
      "This page creates a clear relationship between LaptopsAnytime, Higher Education, the buyer's problem, the solution and supporting evidence.",
  },
};

export const externalLinks = {
  solutions: "https://www.laptopsanytime.com/solutions",
  productLines: "https://www.laptopsanytime.com/product-lines",
  howItWorks: "https://www.laptopsanytime.com/how-it-works",
  architectsCorner: "https://www.laptopsanytime.com/architects-corner",
  brainyAi: "https://www.laptopsanytime.com/brainy-ai",
  getQuote: "https://www.laptopsanytime.com/get-quote",
  login: "https://hq.laptopsanytime.net/login.html",
  caseStudyPdf:
    "https://www.laptopsanytime.com/_files/ugd/410f26_9e0fad9ea43c46cc8b96167fa07405ec.pdf",
};

export const heroImage = {
  src: "https://static.wixstatic.com/media/410f26_af25a05b38474e84a2addfed105341d9~mv2.png",
  alt: "A university technology leader standing proudly next to her college's LaptopsAnytime laptop checkout kiosk.",
};

export const logoImage = {
  src: "https://static.wixstatic.com/media/410f26_84dbb8bda4314120a7f64b4018f45862~mv2.png",
  alt: "LaptopsAnytime — Automated Checkout Kiosks",
};

export const videoId = "IQOKecMU3eM";
