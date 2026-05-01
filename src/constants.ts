/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  category: string;
  filterCategory: string;
  description: string;
  stats: [string, string];
  size?: 'large' | 'half' | 'third' | 'two-thirds';
  cssArt?: number;
}

export const PROJECTS: Project[] = [
  {
    id: 'finflow',
    title: 'FinFlow — Banking App Redesign',
    category: 'Mobile · iOS · Fintech',
    filterCategory: 'Mobile Apps',
    description: 'Reimagining digital banking for the next generation of users with a focus on ease of use.',
    stats: ['+34% Retention', '4.9★ App Store Rating'],
    size: 'large',
    cssArt: 1
  },
  {
    id: 'novamd',
    title: 'NovaMD — Healthcare SaaS Platform',
    category: 'SaaS · Web · HealthTech',
    filterCategory: 'SaaS/Web',
    description: 'Complex healthcare dashboard made intuitive for medical professionals.',
    stats: ['-40% Error Rate', '2x Faster Onboarding'],
    size: 'half',
    cssArt: 2
  },
  {
    id: 'shoplyft',
    title: 'ShopLyft — E-commerce Mobile App',
    category: 'Mobile · iOS/Android · Retail',
    filterCategory: 'Mobile Apps',
    description: 'High-conversion shopping experience tailored for Gen-Z.',
    stats: ['+22% Checkout Rate', '1.5M+ Downloads'],
    size: 'half',
    cssArt: 3
  },
  {
    id: 'pulse',
    title: 'Pulse — Analytics Dashboard',
    category: 'SaaS · Web · Data',
    filterCategory: 'Dashboards',
    description: 'Transforming complex data sets into actionable insights.',
    stats: ['10k+ Active Users', '99.9% Uptime'],
    size: 'third',
    cssArt: 4
  },
  {
    id: 'forma',
    title: 'Forma — Design System & Brand UI',
    category: 'Design System · Brand',
    filterCategory: 'Branding',
    description: 'A scalable component library empowering teams to build faster.',
    stats: ['Adopted by 5 Teams', '3x Dev Speed'],
    size: 'two-thirds',
    cssArt: 5
  }
];

export const SERVICES = [
  {
    title: 'UX Research & Strategy',
    description: 'User interviews, journey mapping, competitive audits — grounded decisions before a single pixel is placed.',
    icon: 'search'
  },
  {
    title: 'UI Design & Prototyping',
    description: 'High-fidelity Figma designs and interactive prototypes that feel real before development begins.',
    icon: 'layers'
  },
  {
    title: 'SaaS Product Design',
    description: 'Complex dashboards, workflows, and admin panels made intuitive for real human beings.',
    icon: 'monitor'
  },
  {
    title: 'Mobile App Design',
    description: 'Native-feel mobile experiences built around platform conventions and user expectations.',
    icon: 'smartphone'
  },
  {
    title: 'Design System Creation',
    description: 'Scalable component libraries in Figma — built for design and dev teams to ship faster, together.',
    icon: 'grid'
  },
  {
    title: 'UX Audit & Redesign',
    description: 'Identify friction. Remove it. Measurably improve conversion, retention, and satisfaction.',
    icon: 'refresh'
  }
];

export const PROCESS_STEPS = [
  {
    id: '01',
    title: 'Discover',
    description: 'Deep dive into your users, business goals, and competitive landscape. No assumptions, only insight.'
  },
  {
    id: '02',
    title: 'Define',
    description: 'Synthesize research into clear problem statements, personas, and success metrics everyone agrees on.'
  },
  {
    id: '03',
    title: 'Design',
    description: 'Wireframes → UI concepts → High-fidelity Figma designs. Iterative, collaborative, and always user-first.'
  },
  {
    id: '04',
    title: 'Prototype & Test',
    description: 'Interactive prototypes tested with real users. Feedback loops before a line of code is written.'
  },
  {
    id: '05',
    title: 'Deliver & Support',
    description: 'Pixel-perfect handoff to dev with full Figma specs, design tokens, and ongoing support post-launch.'
  }
];

export const SKILLS = [
  'Figma', 'UX Research', 'Prototyping', 'Design Systems', 
  'Usability Testing', 'iOS Design', 'SaaS Platforms', 
  'Information Architecture', 'Interaction Design', 'Framer'
];

export const TOOLS = [
  { name: 'Figma', icon: 'figma' },
  { name: 'FigJam', icon: 'pen' },
  { name: 'Maze', icon: 'map' },
  { name: 'Notion', icon: 'file-text' },
  { name: 'Zeroheight', icon: 'box' },
  { name: 'Loom', icon: 'video' }
];

export const FILTER_CATEGORIES = ['All', 'Mobile Apps', 'SaaS/Web', 'Dashboards', 'Branding'];

export const TESTIMONIALS = [
  {
    text: "Working with Danny felt like having a co-founder who specialises in design. Rigorous, fast, and incredible taste.",
    author: "Amira S.",
    role: "Founder, NovaMD"
  },
  {
    text: "He asked better questions than any designer we'd hired before. The product shipped on time and looked stunning.",
    author: "Jake T.",
    role: "Head of Product, ShopLyft"
  },
  {
    text: "Delivered a full design system in 3 weeks. Our devs actually thanked us for once.",
    author: "Priya N.",
    role: "CTO, Forma Studio"
  }
];

export const BRANDS = [
  "FinFlow", "NovaMD", "ShopLyft", "Pulse Analytics", 
  "Forma", "CreativeOS", "BuildStack", "HealthBridge"
];

export const PRICING_PLANS = [
  {
    title: "Starter Sprint",
    price: "From £1,800",
    timeline: "1–2 weeks",
    bestFor: "Validation, landing pages, or quick UI fixes",
    features: [
      "Up to 8 screens",
      "UX review + recommendations",
      "1 round of revisions",
      "Figma handoff file"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    title: "Product Build",
    price: "From £4,500",
    timeline: "3–5 weeks",
    bestFor: "Full product or feature design from brief to handoff",
    features: [
      "Discovery workshop",
      "UX research & wireframes",
      "Full high-fidelity UI (unlimited screens)",
      "Interactive prototype",
      "3 revision rounds",
      "Dev-ready Figma specs",
      "2 weeks post-launch support"
    ],
    cta: "Work With Me",
    popular: true
  },
  {
    title: "Ongoing Retainer",
    price: "From £2,200/mo",
    timeline: "Rolling monthly",
    bestFor: "Startups needing a dedicated design partner long-term",
    features: [
      "Up to 40 design hours/month",
      "Priority turnaround",
      "Weekly design reviews",
      "Design system maintenance",
      "Strategic UX consultancy"
    ],
    cta: "Let's Talk",
    popular: false
  }
];
