import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  ArrowRight, Search, Layers, Monitor, Smartphone, Grid, RefreshCw, Download, 
  Menu, X, ChevronRight, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, 
  Star, StarOff, CheckCircle2, ArrowUp, Figma, PenTool, Map, FileText, Box, Video
} from 'lucide-react';
import { PROJECTS, SERVICES, PROCESS_STEPS, SKILLS, TOOLS, FILTER_CATEGORIES, TESTIMONIALS, BRANDS, PRICING_PLANS } from './constants';

const HeroVisual = () => (
  <div className="relative w-full h-full min-h-[400px] flex items-center justify-center animate-float">
    <div className="absolute inset-0 bg-brand-violet/20 blur-[100px] rounded-full" />
    <div className="relative w-full max-w-sm bg-[#111118] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      <div className="h-8 bg-brand-violet/20 border-b border-white/5 flex items-center px-4 gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
      </div>
      <div className="p-6 space-y-6">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-cyan/20 animate-pulse" />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-1/2 bg-white/10 rounded" />
            <div className="h-3 w-1/3 bg-white/5 rounded" />
          </div>
        </div>
        <div className="h-32 bg-gradient-to-br from-brand-violet/20 to-brand-cyan/10 rounded-xl" />
        <div className="space-y-3">
          <div className="h-2 w-full bg-white/5 rounded" />
          <div className="h-2 w-[90%] bg-white/5 rounded" />
          <div className="h-2 w-[70%] bg-white/5 rounded" />
        </div>
      </div>
    </div>
  </div>
);

const ProjectCSSArt = ({ type }: { type?: number }) => {
  const styles = [
    <div key="1" className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] to-[#16213E] flex items-center justify-center overflow-hidden">
      <div className="w-3/4 h-3/4 rounded-[2rem] bg-gradient-to-b from-brand-violet/20 to-transparent border border-white/10 p-6 flex flex-col gap-4">
         <div className="h-12 w-full bg-white/5 rounded-xl" />
         <div className="flex-1 w-full bg-brand-cyan/10 rounded-xl" />
      </div>
    </div>,
    <div key="2" className="absolute inset-0 bg-gradient-to-tr from-[#0F2027] via-[#203A43] to-[#2C5364] flex p-8 gap-4 overflow-hidden">
      <div className="w-32 h-full bg-white/5 rounded-xl" />
      <div className="flex-1 h-full bg-white/10 rounded-xl flex flex-col gap-4 p-4">
        <div className="h-8 w-1/3 bg-brand-cyan/20 rounded" />
        <div className="flex-1 bg-brand-violet/10 rounded-lg" />
      </div>
    </div>,
    <div key="3" className="absolute inset-0 bg-gradient-to-bl from-brand-violet/20 to-bg flex items-center justify-center overflow-hidden">
      <div className="w-[45%] h-[90%] rounded-[2.5rem] border-4 border-[#1E1E2E] bg-[#111118] overflow-hidden p-4 space-y-4">
         <div className="w-full aspect-square bg-gradient-to-br from-brand-cyan/20 to-brand-violet/20 rounded-xl" />
         <div className="h-4 w-2/3 bg-white/10 rounded" />
         <div className="h-4 w-1/2 bg-white/10 rounded" />
      </div>
    </div>,
    <div key="4" className="absolute inset-0 bg-gradient-to-b from-[#111118] to-[#1E1E2E] flex justify-center items-end overflow-hidden p-8 gap-2">
      {[40, 70, 45, 90, 60, 85].map((h, i) => (
        <div key={i} className="w-full bg-brand-cyan/20 rounded-t-sm" style={{ height: `${h}%` }} />
      ))}
    </div>,
    <div key="5" className="absolute inset-0 bg-[#0A0A0F] p-8 overflow-hidden">
      <div className="w-full h-full border border-brand-violet/20 rounded-2xl grid grid-cols-3 grid-rows-2 gap-4 p-4">
        <div className="bg-brand-violet/10 rounded col-span-2 row-span-2" />
        <div className="bg-brand-cyan/10 rounded" />
        <div className="bg-white/5 rounded" />
      </div>
    </div>
  ];
  const idx = type ? (type - 1) % styles.length : 0;
  return styles[idx] || styles[0];
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeLink, setActiveLink] = useState('');
  
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorHovering, setCursorHovering] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Page Load Sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Custom Cursor Logic
  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleHoverStart = () => setCursorHovering(true);
    const handleHoverEnd = () => setCursorHovering(false);

    window.addEventListener('mousemove', updateCursor);
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      document.querySelectorAll('a, button').forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [loading]);

  // Scroll Spy & Navigation effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      setShowBackToTop(scrollY > 600);
      
      const sections = ['work', 'services', 'about', 'process', 'testimonials', 'pricing'];
      let current = '';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollY >= el.offsetTop - 300) {
          current = section;
        }
      }
      setActiveLink(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string, offset = 0) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - offset,
          behavior: 'smooth'
        });
      }
    }
    setIsMenuOpen(false);
  };

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setIsContactModalOpen(false);
    }, 4000);
  };

  const filteredProjects = activeFilter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.filterCategory === activeFilter);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#0A0A0F] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          exit={{ opacity: 0 }} 
          className="text-4xl font-display font-bold tracking-tighter"
        >
          Danny<span className="text-brand-violet">.</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-bg text-white overflow-x-hidden font-body selection:bg-brand-violet/50 selection:text-white">
      {/* Custom Cursor */}
      <div className="hidden md:block pointer-events-none fixed inset-0 z-[10000]">
        <motion.div 
          className="absolute w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{ x: cursorPos.x - 4, y: cursorPos.y - 4 }}
          transition={{ type: "tween", ease: "linear", duration: 0 }}
        />
        <motion.div 
          className="absolute rounded-full border border-brand-violet/50 bg-brand-violet/10 -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            x: cursorPos.x - 16, 
            y: cursorPos.y - 16,
            width: cursorHovering ? 64 : 32,
            height: cursorHovering ? 64 : 32,
            left: cursorHovering ? -16 : 0,
            top: cursorHovering ? -16 : 0
          }}
          transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.5 }}
        />
      </div>

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-brand-violet z-50 origin-left" style={{ scaleX }} />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 px-6 py-4 transition-all duration-300 ${scrolled ? 'bg-[#0A0A0F]/90 backdrop-blur-md border-b border-white/5 shadow-2xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-display font-bold tracking-tighter cursor-pointer" onClick={() => scrollToSection('top')}>
            Danny<span className="text-brand-violet">.</span>
          </div>

          <div className="hidden lg:flex flex-1 justify-center items-center gap-8 text-sm font-medium">
            {['Work', 'Services', 'About', 'Process'].map((item) => {
              const id = item.toLowerCase();
              return (
                <button 
                  key={item} 
                  onClick={() => scrollToSection(id, 100)}
                  className={`relative cursor-pointer transition-colors ${activeLink === id ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  {item}
                  {activeLink === id && (
                    <motion.div layoutId="navDot" className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-violet" />
                  )}
                </button>
              );
            })}
          </div>

          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="hidden lg:flex px-6 py-2.5 bg-brand-violet hover:bg-[#8A6DFA] text-white rounded-full transition-all hover:shadow-[0_0_20px_rgba(123,92,250,0.6)] font-bold text-sm"
          >
            Work With Me
          </button>

          <button className="lg:hidden text-white" aria-label="Open mobile menu" onClick={() => setIsMenuOpen(true)}>
            <Menu size={28} aria-hidden="true" strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
           <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#0A0A0F] flex flex-col items-center justify-center gap-8 text-3xl font-display font-bold"
          >
            <div className="absolute inset-0 bg-brand-violet/5 blur-[100px] z-0" />
            <button className="absolute top-6 right-6 z-10" aria-label="Close mobile menu" onClick={() => setIsMenuOpen(false)}>
              <X size={32} aria-hidden="true" strokeWidth={1.5} />
            </button>
            <div className="z-10 flex flex-col items-center gap-8">
              {['Work', 'Services', 'About', 'Process', 'Testimonials', 'Pricing'].map((item) => (
                <button key={item} onClick={() => scrollToSection(item.toLowerCase(), 100)} className="hover:text-brand-violet transition-colors">
                  {item}
                </button>
              ))}
              <button 
                onClick={() => { setIsContactModalOpen(true); setIsMenuOpen(false); }}
                className="mt-6 px-10 py-4 bg-brand-violet text-white rounded-full text-xl"
              >
                Work With Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-32 lg:pt-40">
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden mb-32">
          <div className="absolute inset-0 bg-mesh-1 z-0 opacity-20 bg-gradient-to-r from-brand-violet/20 to-brand-cyan/10 blur-[150px]" />
          
          <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
            {/* Left Column Text - 60% */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-brand-cyan" />
                <span className="text-brand-cyan uppercase tracking-[0.2em] text-xs font-bold font-display">UI/UX Designer & Product Strategist</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                className="text-5xl md:text-7xl lg:text-[5rem] font-display font-bold leading-[1.05] tracking-tight mb-8"
              >
                Designing Interfaces <br className="hidden md:block"/>
                People Actually <br className="hidden md:block"/>
                Love to Use.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                className="text-gray-400 text-lg md:text-xl max-w-xl mb-12 leading-relaxed"
              >
                I help startups and growing brands turn complex ideas into clean, intuitive digital products — from concept to pixel-perfect delivery.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center gap-4 mb-14"
              >
                <button onClick={() => setIsContactModalOpen(true)} className="flex items-center gap-2 px-8 py-4 bg-brand-violet hover:bg-[#8A6DFA] text-white font-bold rounded-full transition-all group">
                  Work With Me <ArrowRight size={18} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => scrollToSection('work')} className="px-8 py-4 bg-transparent border border-white/20 hover:border-white text-white font-bold rounded-full transition-all">
                  View My Work
                </button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap items-center gap-x-6 gap-y-4 text-sm font-medium text-gray-400"
              >
                <span>42+ Projects Delivered</span>
                <div className="w-px h-4 bg-white/20 hidden md:block" />
                <span>5★ Average Client Rating</span>
                <div className="w-px h-4 bg-white/20 hidden md:block" />
                <span>4 Years Experience</span>
              </motion.div>
            </div>

            {/* Right Column Visual - 40% */}
            <motion.div 
              initial={{ opacity: 0, x: 30, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-5 hidden lg:flex items-center justify-center relative"
            >
              <div className="absolute inset-0 bg-brand-violet/10 blur-[80px] rounded-full scale-150 animate-pulse" />
              <HeroVisual />
            </motion.div>
          </div>
        </section>

        {/* SELECTED WORK SECTION */}
        <section id="work" className="max-w-7xl mx-auto px-6 mb-32 lg:mb-48">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <span className="text-brand-cyan uppercase tracking-widest text-xs font-bold mb-4 block">Selected Work</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Projects That Speak for Themselves.</h2>
              <p className="text-gray-400 max-w-xl text-lg">A curated selection of UI/UX work across SaaS, mobile, and brand digital experiences.</p>
            </div>
            <button className="text-brand-violet hover:text-white transition-colors flex items-center gap-2 font-medium">
              See Full Archive <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-wrap gap-3 mb-12">
            {FILTER_CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeFilter === cat ? 'bg-brand-violet text-white shadow-lg shadow-brand-violet/20' : 'bg-[#111118] text-gray-400 hover:text-white border border-white/5'}`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <div className="portfolio-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  key={project.id}
                  className={`${project.size ? `card-${project.size}` : 'card-default'} relative group bg-[#111118] rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 border border-white/5 cursor-pointer`}
                >
                  <div className="h-1.5 w-0 group-hover:w-full bg-gradient-to-r from-brand-violet to-brand-cyan transition-all duration-700 ease-out absolute top-0 left-0 z-10" />
                  
                  <div className="p-1">
                    <div className="w-full h-80 relative rounded-xl overflow-hidden mb-6 border border-white/5">
                      <ProjectCSSArt type={project.cssArt} />
                    </div>
                  </div>

                  <div className="px-8 pb-8 pt-2">
                    <div className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-bold">{project.category}</div>
                    <h3 className="text-3xl font-display font-bold mb-3 group-hover:text-brand-violet transition-colors">{project.title}</h3>
                    <p className="text-gray-400 text-lg mb-8">{project.description}</p>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-0 mt-auto">
                      <div className="flex gap-6 border-l-2 border-brand-cyan/30 pl-4 py-1">
                        {project.stats.map(stat => (
                           <div key={stat} className="text-brand-cyan font-bold">{stat}</div>
                        ))}
                      </div>
                      <button className="text-brand-violet font-bold flex items-center gap-1 group-hover:text-white transition-colors">
                        View Case Study <ArrowRight size={18} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform ml-1" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-brand-violet/0 group-hover:bg-brand-violet/5 rounded-2xl transition-colors pointer-events-none" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="max-w-7xl mx-auto px-6 mb-32 lg:mb-48">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-cyan uppercase tracking-widest text-xs font-bold mb-4 block">What I Do</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">End-to-End Design, Zero Guesswork.</h2>
            <p className="text-gray-400 text-lg">Whether you need a product built from scratch or an existing experience rescued — I've got the process and the eye for it.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {SERVICES.map((service, idx) => {
              const icons = {
                search: <Search size={28} strokeWidth={1.5} />, layers: <Layers size={28} strokeWidth={1.5} />, monitor: <Monitor size={28} strokeWidth={1.5} />,
                smartphone: <Smartphone size={28} strokeWidth={1.5} />, grid: <Grid size={28} strokeWidth={1.5} />, refresh: <RefreshCw size={28} strokeWidth={1.5} />
              };
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                  className="p-10 bg-[#111118] border border-[#1E1E2E] hover:border-brand-violet transition-colors duration-300 rounded-3xl group flex flex-col h-full"
                >
                  <div className="w-14 h-14 rounded-2xl bg-brand-violet/10 text-brand-violet flex items-center justify-center mb-8 group-hover:bg-brand-violet group-hover:text-white group-hover:shadow-[0_0_20px_rgba(123,92,250,0.5)] transition-all">
                    {icons[service.icon as keyof typeof icons]}
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed flex-1">{service.description}</p>
                  <div className="pt-8 mt-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0">
                    <span className="text-brand-cyan font-bold flex items-center gap-2">Learn More <ArrowRight size={16} strokeWidth={1.5} /></span>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center">
            <p className="text-gray-400 mb-6 text-lg">Not sure what you need? Let's figure it out together.</p>
            <button onClick={() => setIsContactModalOpen(true)} className="px-10 py-5 bg-brand-violet text-white font-bold rounded-full hover:scale-105 active:scale-95 transition-transform shadow-[0_0_20px_rgba(123,92,250,0.3)] hover:shadow-[0_0_30px_rgba(123,92,250,0.5)]">
              Book a Free Discovery Call
            </button>
          </motion.div>
        </section>

        {/* PROCESS SECTION */}
        <section id="process" className="bg-[#0D0D15] py-32 rounded-[3rem] relative overflow-hidden mb-32 lg:mb-48 mx-4 lg:mx-8 border border-white/5">
          <div className="absolute inset-0 dot-pattern opacity-50" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-24 lg:mb-32 text-center lg:text-left">
              <span className="text-brand-cyan uppercase tracking-widest text-xs font-bold mb-4 block">My Process</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">How Great Design Gets Done.</h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto lg:mx-0">A proven 5-step process that delivers clarity, speed, and outcomes — not just beautiful screens.</p>
            </motion.div>

            <div className="relative">
              {/* Desktop Connecting Line */}
              <div className="hidden lg:block absolute top-[60px] left-12 right-12 h-0.5 bg-white/10 overflow-hidden">
                <motion.div 
                   initial={{ x: '-100%' }}
                   whileInView={{ x: '100%' }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1.5, ease: "easeOut" }}
                   className="w-full h-full bg-brand-violet"
                />
              </div>

              <div className="flex flex-col lg:flex-row gap-12 lg:gap-6 relative z-10">
                {PROCESS_STEPS.map((step, idx) => (
                  <motion.div 
                    key={step.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                    className="flex-1 relative group"
                  >
                    <div className="lg:hidden absolute left-[1.35rem] top-16 bottom-[-3rem] w-0.5 bg-white/10 group-hover:bg-brand-violet transition-colors" />
                    
                    <div className="flex lg:block items-start gap-8 lg:gap-0">
                      <div className="text-[80px] lg:text-[100px] leading-none font-display font-bold text-white/5 group-hover:text-brand-cyan/20 transition-colors pointer-events-none select-none -mt-4 lg:-mt-0 lg:mb-8">
                        {step.id}
                      </div>
                      <div className="flex-1 lg:mt-0">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="mt-2 lg:mt-0 w-4 h-4 rounded-full bg-[#0D0D15] border-2 border-white/20 group-hover:border-brand-cyan group-hover:bg-brand-cyan group-hover:shadow-[0_0_15px_rgba(0,229,192,0.5)] transition-all z-10 relative" />
                          <h3 className="text-2xl font-bold font-display">{step.title}</h3>
                        </div>
                        <p className="text-gray-400 leading-relaxed pr-4 lg:pr-0 lg:pl-8">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="max-w-7xl mx-auto px-6 mb-32 lg:mb-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column Text - 60% */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="lg:col-span-7 order-2 lg:order-1"
            >
              <span className="text-brand-cyan uppercase tracking-widest text-xs font-bold mb-4 block">About Me</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">Designer. Strategist. Obsessive Problem-Solver.</h2>
              
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed max-w-2xl mb-12">
                <p>
                  I'm Danny — a UI/UX designer with 4 years of experience helping startups and scale-ups craft digital products that convert, retain, and delight. My work sits at the intersection of beautiful design and measurable business impact.
                </p>
                <p>
                  I've worked with funded startups, growing SaaS companies, and creative agencies — always with the same obsession: make it simpler, make it smarter, make it feel effortless.
                </p>
              </div>

              <div className="mb-12">
                <div className="flex flex-wrap gap-3">
                  {SKILLS.map(skill => (
                    <span key={skill} className="px-5 py-2.5 rounded-full border border-white/10 text-sm font-medium text-gray-300 bg-white/5 hover:bg-brand-violet hover:border-brand-violet hover:text-white transition-all cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center flex-wrap gap-x-8 gap-y-4 mb-12 text-gray-400">
                {TOOLS.map(tool => {
                  const iconMap = {
                    figma: Figma,
                    pen: PenTool,
                    map: Map,
                    'file-text': FileText,
                    box: Box,
                    video: Video
                  };
                  const ToolIcon = iconMap[tool.icon as keyof typeof iconMap] || Box;
                  return (
                    <span 
                      key={tool.name} 
                      className="flex items-center justify-center text-gray-400 hover:text-brand-violet transition-colors cursor-pointer" 
                      title={tool.name} 
                      aria-label={tool.name}
                    >
                       <ToolIcon size={28} aria-hidden="true" strokeWidth={1.5} />
                    </span>
                  );
                })}
              </div>

              <button className="flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-brand-violet text-white font-bold rounded-full hover:bg-brand-violet transition-colors group">
                <Download size={20} strokeWidth={1.5} className="group-hover:-translate-y-1 transition-transform" /> Download CV
              </button>
            </motion.div>

            {/* Right Column Visual - 40% */}
            <motion.div 
               initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
               className="lg:col-span-5 order-1 lg:order-2"
            >
              <div className="relative max-w-sm mx-auto">
                {/* Abstract Avatar Frame */}
                <div className="aspect-[4/5] rounded-t-[10rem] rounded-bl-[4rem] rounded-br-2xl overflow-hidden relative border-2 border-white/10 shadow-2xl bg-gradient-to-tr from-[#111118] to-[#1E1E2E]">
                  {/*
                    The user requested to "use my exact image I sent to you".
                    Since there's no direct URL to an image asset payload provided in standard text, 
                    we assign Daniel's picture here, typically hosted via public path when dropped in the repo.
                  */}
                  <div className="absolute inset-0 bg-brand-violet/10 mix-blend-overlay z-10" />
                  <img 
                    src="/avatar.png" 
                    alt="Daniel" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 relative z-0"
                  />
                  
                  {/* Geometric Lines Overlay */}
                  <div className="absolute inset-0 pointer-events-none z-20">
                     <div className="absolute top-1/4 -left-4 w-12 h-1 bg-brand-cyan/80 rotate-45" />
                     <div className="absolute bottom-1/3 -right-4 w-16 h-1 flex border-b-2 border-dashed border-brand-violet" />
                  </div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="absolute -bottom-6 -right-6 lg:-right-12 bg-[#1A1A24] p-3 pr-6 rounded-2xl border border-white/5 shadow-2xl flex items-center gap-4 z-30"
                >
                  <div className="relative">
                    <img 
                      src="/avatar.png" 
                      alt="Daniel" 
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#1A1A24]"
                    />
                    <div className="absolute bottom-0 right-0 flex h-3 w-3 translate-x-1/4 translate-y-1/4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-[#1A1A24]"></span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-200">Currently Available<br/>for Projects</span>
                </motion.div>
                
                <div className="absolute -z-10 -top-10 -right-10 w-full h-full bg-brand-cyan/20 blur-[120px] rounded-full" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section id="testimonials" className="max-w-7xl mx-auto px-6 mb-32 lg:mb-48">
          <div className="mb-16">
            <span className="text-brand-cyan uppercase tracking-widest text-xs font-bold mb-4 block">Kind Words</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">What Clients Say After We've Shipped.</h2>
          </div>

          {/* Featured Testimonial */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="w-full bg-[#161622] rounded-3xl p-10 md:p-16 mb-8 relative overflow-hidden border-l-[6px] border-l-brand-violet border border-white/5"
          >
            <div className="absolute -top-10 -left-6 text-[180px] font-display text-brand-violet/10 leading-none select-none select-none">"</div>
            <p className="text-2xl md:text-4xl font-display font-bold mb-8 relative z-10 leading-snug">
              "Danny doesn't just design screens — he designs outcomes. 
              Our onboarding drop-off rate fell by 52% after his redesign. 
              That's the kind of designer every product team needs."
            </p>
            <div className="text-brand-cyan font-bold tracking-wide relative z-10 text-lg">
              — Marcus Webb, CPO at FinFlow
            </div>
          </motion.div>

          {/* 3 Grid Testimonials */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {TESTIMONIALS.map((testimonial, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="bg-[#111118] p-8 rounded-2xl border border-white/5 flex flex-col h-full hover:border-brand-violet/30 transition-colors"
              >
                <div className="flex gap-1 mb-6 text-amber-400">
                  <Star size={16} fill="currentColor" strokeWidth={1.5} /><Star size={16} fill="currentColor" strokeWidth={1.5} /><Star size={16} fill="currentColor" strokeWidth={1.5} /><Star size={16} fill="currentColor" strokeWidth={1.5} /><Star size={16} fill="currentColor" strokeWidth={1.5} />
                </div>
                <p className="text-lg text-gray-200 mb-8 flex-1 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-violet flex items-center justify-center font-bold text-sm">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{testimonial.author}</div>
                    <div className="text-brand-cyan text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Brands Marquee */}
          <div className="overflow-hidden bg-[#111118] py-6 border-y border-white/5 mb-12">
            <div className="animate-marquee flex gap-12 items-center text-gray-500 font-display font-bold text-xl md:text-2xl tracking-wider select-none">
              {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
                <div key={i} className="flex items-center gap-12 whitespace-nowrap">
                  <span>{brand}</span>
                  <div className="w-2 h-2 rotate-45 bg-brand-violet/30" />
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-sm font-bold text-gray-400">
            <span className="flex items-center gap-2"><span className="text-brand-violet">✦</span> NDA-Friendly</span>
            <span className="flex items-center gap-2"><span className="text-brand-violet">✦</span> Figma File Ownership Included</span>
            <span className="flex items-center gap-2"><span className="text-brand-violet">✦</span> On-Time Delivery Guaranteed</span>
            <span className="flex items-center gap-2"><span className="text-brand-violet">✦</span> Revision Rounds Included</span>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="max-w-7xl mx-auto px-6 mb-32 lg:mb-48">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-cyan uppercase tracking-widest text-xs font-bold mb-4 block">Investment</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Transparent Pricing. No Surprises.</h2>
            <p className="text-gray-400 text-lg">Choose the engagement that fits your stage. All packages include Figma source files and async communication.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center mb-16">
            {PRICING_PLANS.map((plan, idx) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className={`bg-[#111118] rounded-3xl p-8 relative flex flex-col h-full transition-transform ${plan.popular ? 'border-2 border-brand-violet shadow-[0_0_40px_rgba(123,92,250,0.15)] md:scale-105 z-10' : 'border border-white/5'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 right-8 bg-brand-violet text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                    RECOMMENDED
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                  <div className="text-gray-400 text-sm mb-6">{plan.bestFor}</div>
                  <div className="text-4xl font-display font-bold text-white mb-2">{plan.price}</div>
                  <div className="text-brand-cyan text-sm font-bold uppercase tracking-wide">{plan.timeline}</div>
                </div>

                <div className="h-px w-full bg-white/10 mb-8" />

                <div className="flex-1 space-y-4 mb-10">
                  {plan.features.map(feat => (
                    <div key={feat} className="flex items-start gap-3">
                      <CheckCircle2 strokeWidth={1.5} className="text-brand-cyan shrink-0 w-5 h-5" />
                      <span className="text-gray-300 text-sm">{feat}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular ? 'bg-brand-violet text-white hover:bg-[#8A6DFA] shadow-lg shadow-brand-violet/20' : 'bg-transparent text-white border border-white/20 hover:border-white'}`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="text-center max-w-lg mx-auto">
             <p className="text-gray-400 mb-4 text-sm">Need something custom? Every project is different. Let's build a scope that works for you.</p>
             <button onClick={() => setIsContactModalOpen(true)} className="text-brand-violet font-bold flex items-center gap-2 justify-center w-full hover:text-white transition-colors">
               Get a Custom Quote <ArrowRight size={16} strokeWidth={1.5} />
             </button>
          </div>
        </section>

        {/* FINAL CTA BANNER */}
        <section className="bg-gradient-to-br from-brand-violet to-[#3B1FA8] py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 text-white">Let's Build Something Worth Using.</h2>
            <p className="text-white/80 text-xl font-medium mb-12 max-w-2xl mx-auto">Available for projects starting Q2 2026. Limited spots — let's talk before they're gone.</p>
            <button onClick={() => setIsContactModalOpen(true)} className="px-10 py-5 bg-white text-[#3B1FA8] font-bold rounded-full text-lg hover:scale-105 active:scale-95 transition-transform flex items-center gap-3 mx-auto shadow-2xl mb-6">
              Work With Me <ArrowRight size={20} strokeWidth={1.5} />
            </button>
            <p className="text-white/50 text-sm font-medium">Or email directly: hello@dannyuiux.com</p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#070709] relative pt-24 pb-8 px-6 border-t border-white/5">
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-brand-violet/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20 relative z-10">
          {/* Col 1 */}
          <div className="lg:col-span-5">
            <div className="text-3xl font-display font-bold tracking-tighter mb-4 text-white">Danny<span className="text-brand-violet">.</span></div>
            <p className="text-gray-400 text-lg mb-8 max-w-sm">UI/UX Design that converts, retains, and delights.</p>
            <div className="flex items-center gap-4 text-gray-500 mb-8">
              <a href="#" aria-label="Visit my LinkedIn" className="hover:text-brand-violet transition-colors"><Linkedin size={24} aria-hidden="true" strokeWidth={1.5} /></a>
              <a href="#" aria-label="Visit my Twitter" className="hover:text-brand-violet transition-colors"><Twitter size={24} aria-hidden="true" strokeWidth={1.5} /></a>
              <a href="#" aria-label="Visit my Instagram" className="hover:text-brand-violet transition-colors"><Instagram size={24} aria-hidden="true" strokeWidth={1.5} /></a>
              <a href="#" aria-label="Visit my Behance" className="hover:text-brand-violet transition-colors font-bold font-display text-xl leading-none">Be</a>
            </div>
            <div className="flex items-center gap-3 bg-white/5 inline-flex px-4 py-2 rounded-full border border-white/10">
               <div className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
               </div>
               <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Currently accepting projects</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="lg:col-span-2">
            <h4 className="text-sm border-l-2 border-brand-violet pl-3 font-bold uppercase tracking-widest text-white mb-6">Work</h4>
            <div className="flex flex-col gap-4 text-gray-500 font-medium text-sm">
              <button onClick={() => scrollToSection('work')} className="text-left w-max hover:text-white transition-colors">Selected Work</button>
              <button onClick={() => scrollToSection('work')} className="text-left w-max hover:text-white transition-colors">Case Studies</button>
              <button onClick={() => scrollToSection('work')} className="text-left w-max hover:text-white transition-colors">Design Archive</button>
              <button onClick={() => scrollToSection('process')} className="text-left w-max hover:text-white transition-colors">Process</button>
            </div>
          </div>

          {/* Col 3 */}
          <div className="lg:col-span-3">
             <h4 className="text-sm border-l-2 border-brand-violet pl-3 font-bold uppercase tracking-widest text-white mb-6">Services</h4>
            <div className="flex flex-col gap-4 text-gray-500 font-medium text-sm">
              <button onClick={() => scrollToSection('services')} className="text-left w-max hover:text-white transition-colors">UI/UX Design</button>
              <button onClick={() => scrollToSection('services')} className="text-left w-max hover:text-white transition-colors">Mobile App Design</button>
              <button onClick={() => scrollToSection('services')} className="text-left w-max hover:text-white transition-colors">SaaS Platforms</button>
              <button onClick={() => scrollToSection('services')} className="text-left w-max hover:text-white transition-colors">Design Systems</button>
              <button onClick={() => scrollToSection('services')} className="text-left w-max hover:text-white transition-colors">UX Audits</button>
            </div>
          </div>

          {/* Col 4 */}
          <div className="lg:col-span-2">
             <h4 className="text-sm border-l-2 border-brand-violet pl-3 font-bold uppercase tracking-widest text-white mb-6">Contact</h4>
            <div className="flex flex-col gap-4 text-gray-500 font-medium text-sm">
              <a href="mailto:hello@dannyuiux.com" className="hover:text-white transition-colors">hello@dannyuiux.com</a>
              <a href="#" className="hover:text-white transition-colors">Book a Call</a>
              <button className="text-left w-max hover:text-white transition-colors">Download CV</button>
              <div className="pt-4 text-brand-cyan">Availability: Q2 2026</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto h-px bg-[#1E1E2E] mb-8" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between text-xs text-gray-500 font-medium gap-4">
          <div>© {new Date().getFullYear()} DannyUI/UX. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            onClick={() => scrollToSection('top')}
            aria-label="Back to top"
            className="fixed bottom-8 right-8 z-[90] w-14 h-14 bg-brand-violet rounded-full flex items-center justify-center shadow-lg hover:bg-[#8A6DFA] text-white hover:text-white transition-colors group cursor-pointer"
          >
             <ArrowUp size={24} aria-hidden="true" strokeWidth={1.5} className="group-hover:rotate-12 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4 md:p-6 backdrop-blur-[10px] bg-black/85 overflow-y-auto"
          >
             <div className="absolute inset-0 cursor-pointer" onClick={() => setIsContactModalOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.9, y: 40, filter: 'blur(10px)' }}
              transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.8 }}
              className="bg-[#111118] w-full max-w-3xl rounded-3xl border-t-4 border-l-transparent border-r-transparent border-b-transparent border-brand-violet p-8 md:p-12 relative z-10 my-10 max-h-[90vh] overflow-y-auto hidden-scrollbar"
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
            >
              <button aria-label="Close contact modal" className="absolute top-6 right-6 text-gray-500 hover:text-white bg-white/5 rounded-full p-2 transition-colors" onClick={() => setIsContactModalOpen(false)}>
                <X size={24} aria-hidden="true" strokeWidth={1.5} />
              </button>

              {!formSuccess ? (
                <>
                  <div className="mb-10">
                    <h3 id="contact-modal-title" className="text-3xl md:text-4xl mb-3 font-display font-bold">Tell Me About Your Project</h3>
                    <p className="text-gray-400 text-lg">I'll get back to you within 24 hours.</p>
                  </div>

                  <form className="space-y-8" onSubmit={handleContactSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">Your Name*</label>
                        <input id="contact-name" type="text" placeholder="Jane Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus-visible:border-brand-violet focus-visible:bg-brand-violet/5 text-sm transition-colors required:invalid:border-red-500" required />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">Email Address*</label>
                        <input id="contact-email" type="email" placeholder="jane@company.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus-visible:border-brand-violet focus-visible:bg-brand-violet/5 text-sm transition-colors required:invalid:border-red-500" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="contact-company" className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">Company / Brand (Optional)</label>
                        <input id="contact-company" type="text" placeholder="Acme Corp" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus-visible:border-brand-violet focus-visible:bg-brand-violet/5 text-sm transition-colors" />
                      </div>
                      <div>
                         <label htmlFor="contact-type" className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">Project Type*</label>
                        <div className="relative">
                          <select id="contact-type" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus-visible:border-brand-violet focus-visible:bg-brand-violet/5 text-sm transition-colors appearance-none text-white cursor-pointer required:invalid:border-red-500">
                            <option value="" disabled selected hidden>Select an option</option>
                            <option className="bg-[#111118] text-white">UI/UX Design</option>
                            <option className="bg-[#111118] text-white">Mobile App</option>
                            <option className="bg-[#111118] text-white">SaaS Product</option>
                            <option className="bg-[#111118] text-white">Design System</option>
                            <option className="bg-[#111118] text-white">UX Audit</option>
                            <option className="bg-[#111118] text-white">Not Sure Yet</option>
                          </select>
                          <ChevronRight size={16} aria-hidden="true" strokeWidth={1.5} className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-gray-500 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <fieldset>
                      <legend className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 block">Budget Range*</legend>
                      <div className="flex flex-wrap gap-3">
                         {['Under £2k', '£2k–£5k', '£5k–£10k', '£10k+', 'Let\'s Discuss'].map((val, i) => (
                           <label key={i} className="radio-pill relative cursor-pointer group">
                             <input type="radio" name="budget" value={val} required className="absolute opacity-0 w-0 h-0 group-hover:block peer" />
                             <div className="px-5 py-3 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-gray-300 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-violet peer-invalid:peer-focus:border-red-500 relative transition-colors shadow-sm">
                               {val}
                             </div>
                           </label>
                         ))}
                      </div>
                    </fieldset>

                    <fieldset>
                      <legend className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 block">Project Timeline*</legend>
                      <div className="flex flex-wrap gap-3">
                         {['ASAP', '1–2 months', '3–6 months', 'Flexible'].map((val, i) => (
                           <label key={i} className="radio-pill relative cursor-pointer group">
                             <input type="radio" name="timeline" value={val} required className="absolute opacity-0 w-0 h-0 peer" />
                             <div className="px-5 py-3 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-gray-300 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-violet peer-invalid:peer-focus:border-red-500 transition-colors shadow-sm">
                               {val}
                             </div>
                           </label>
                         ))}
                      </div>
                    </fieldset>

                    <div>
                      <label htmlFor="contact-details" className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">Tell me about your project*</label>
                      <textarea 
                        id="contact-details"
                        rows={4} 
                        placeholder="What are you building, what's broken, and what does success look like?" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus-visible:border-brand-violet focus-visible:bg-brand-violet/5 text-sm transition-colors resize-none required:invalid:border-red-500" 
                        required 
                      />
                    </div>

                    <button type="submit" className="w-full py-5 bg-brand-violet text-white font-bold rounded-full hover:bg-[#8A6DFA] active:scale-95 transition-transform flex items-center justify-center gap-3 text-lg group shadow-[0_0_20px_rgba(123,92,250,0.3)]">
                      Send My Brief <ArrowRight size={20} aria-hidden="true" strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 px-6 text-center flex flex-col items-center"
                >
                  <div className="w-20 h-20 bg-brand-violet/20 text-brand-violet rounded-full flex items-center justify-center mb-8">
                    <CheckCircle2 size={40} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4">Brief Received.</h3>
                  <p className="text-xl text-gray-400 mb-10 max-w-md mx-auto">
                    I'll review your details and be in touch within 24 hours. In the meantime, feel free to explore my work.
                  </p>
                  <button 
                    onClick={() => { setIsContactModalOpen(false); scrollToSection('work'); }}
                    className="text-brand-violet font-bold py-3 px-8 border border-brand-violet rounded-full hover:bg-brand-violet/10 transition-colors"
                  >
                    View Portfolio
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
