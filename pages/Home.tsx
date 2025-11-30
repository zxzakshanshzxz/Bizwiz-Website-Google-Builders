/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Rocket, Zap, BarChart3, Users, ChevronLeft, ChevronRight, CheckCircle, Quote, ArrowRight, X } from 'lucide-react';
import GradientText from '../components/GlitchText';
import ArtistCard from '../components/ArtistCard';
import ServiceCard from '../components/ServiceCard';
import { ShowcaseItem, Testimonial, ServiceItem } from '../types';

// Services Data with new 3D item
export const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'Branding Blueprints',
    description: 'Complete visual identity systems. We craft mood boards, brand kits, and logo systems that define your market position.',
    visualType: 'moodboard',
    tags: ['Logo', 'Strategy', 'Identity'],
    images: ['https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=600&q=80']
  },
  {
    id: 's2',
    title: 'Social Media Management',
    description: 'Curated galleries and feeds. We build communities with high-engagement content strategies.',
    visualType: 'social-grid',
    tags: ['Reels', 'Community', 'Growth'],
    images: [
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1516251193000-18e6586ee186?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1622556498246-755f44ca76f3?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?auto=format&fit=crop&w=200&q=80',
    ]
  },
  {
    id: 's3',
    title: 'Performance Marketing',
    description: 'Data-driven ad campaigns. Real-time dashboards tracking ROAS, CPC, and conversion rates across Google and Meta.',
    visualType: 'dashboard',
    tags: ['PPC', 'Analytics', 'ROI'],
    images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80']
  },
  {
    id: 's4',
    title: 'Immersive 3D Experience',
    description: 'High-end 3D websites and interactive WebGL experiences. Interact with the model above.',
    visualType: '3d-model',
    tags: ['Three.js', 'WebGL', 'Immersion'],
    images: [] // 3D Component handles visual
  },
  {
    id: 's5',
    title: 'Video Production',
    description: 'Cinematic storytelling. From drone shots to corporate films and product reveals. Hover to preview.',
    visualType: 'video-hover',
    tags: ['Editing', 'Drone', 'Commercials'],
    images: ['https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80']
  },
  {
    id: 's6',
    title: 'Website Development',
    description: 'Responsive, fast, and SEO-optimized website development for scaling businesses.',
    visualType: 'scroll-preview',
    tags: ['React', 'Next.js', 'Performance'],
    images: ['https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=600&q=80']
  }
];

// Comprehensive Industries
const INDUSTRIES: ShowcaseItem[] = [
  { 
    id: '1', 
    name: 'Luxury Real Estate', 
    category: 'Lead Gen & Branding', 
    stat: '200% Growth', 
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80',
    description: 'Property listing websites, video walkthroughs, and targeted ad campaigns for high-net-worth investors.'
  },
  { 
    id: '2', 
    name: 'Web3 & Crypto', 
    category: 'Community Growth', 
    stat: '10k+ Members', 
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
    description: 'Strategies for NFT marketplaces and token launches. Discord & Twitter community management.'
  },
  { 
    id: '3', 
    name: 'SaaS & Tech', 
    category: 'Product Marketing', 
    stat: '35% CPA Drop', 
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    description: 'Conversion-optimized websites and free trial funnels. Email drip campaigns and retention strategies.'
  },
  { 
    id: '4', 
    name: 'Bespoke Tourism', 
    category: 'Hospitality', 
    stat: '90% Booked', 
    image: 'https://images.unsplash.com/photo-1571896349842-6e5a513e610a?auto=format&fit=crop&w=800&q=80',
    description: 'Marketing international wellness retreats and luxury resorts. Integrated booking systems and influencer trips.'
  },
  { 
    id: '5', 
    name: 'E-Commerce & Fashion', 
    category: 'Retail Scale', 
    stat: '98% Sell-Out', 
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    description: 'Shopify/WooCommerce development. Dynamic product ads and cart recovery automation for fashion brands.'
  },
  { 
    id: '6', 
    name: 'Yoga & Spirituality', 
    category: 'Wellness', 
    stat: 'Global Reach', 
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
    description: 'Brand building for yoga schools and spiritual coaches. Course launches and retreat marketing.'
  },
  { 
    id: '7', 
    name: 'Private Healthcare', 
    category: 'Trust Building', 
    stat: 'Patient Trust', 
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80',
    description: 'Local SEO and reputation management for clinics, dentists, and hospitals. Appointment booking integrations.'
  },
  { 
    id: '8', 
    name: 'Pet Care', 
    category: 'Niche Retail', 
    stat: 'High LTV', 
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
    description: 'Marketing for pet products and vet clinics. Emotional storytelling and viral content strategies.'
  },
  { 
    id: '9', 
    name: 'Food & Dining', 
    category: 'Local SEO', 
    stat: 'Footfall', 
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    description: 'Social media management and photography for restaurants, cafes, and cloud kitchens.'
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: "Bizwiz transformed our digital presence completely. Within six months, we saw a 200% increase in organic traffic and our sales pipeline grew by 45%.",
    author: "Marketing Director",
    role: "SaaS Company"
  },
  {
    id: '2',
    quote: "The team at Bizwiz doesn't just execute—they think strategically. Their data-driven approach has consistently delivered 150% ROI on our marketing spend.",
    author: "CEO",
    role: "E-Commerce Brand"
  },
  {
    id: '3',
    quote: "Working with Bizwiz on our international retreat marketing was a game-changer. They secured Fortune 500 partnerships and delivered 90% participant satisfaction.",
    author: "Founder",
    role: "Wellness Retreat Company"
  }
];

const Home: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [selectedIndustry, setSelectedIndustry] = useState<ShowcaseItem | null>(null);
  const [bookingStep, setBookingStep] = useState<number | null>(null);

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedIndustry) return;
      if (e.key === 'ArrowLeft') navigateIndustry('prev');
      if (e.key === 'ArrowRight') navigateIndustry('next');
      if (e.key === 'Escape') setSelectedIndustry(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndustry]);

  const handleBooking = (index: number) => {
    setBookingStep(index);
    window.open('mailto:Contact@BizwizAgency.com?subject=Digital%20Strategy%20Consultation', '_blank');
    setTimeout(() => setBookingStep(null), 2000);
  };

  const navigateIndustry = (direction: 'next' | 'prev') => {
    if (!selectedIndustry) return;
    const currentIndex = INDUSTRIES.findIndex(a => a.id === selectedIndustry.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % INDUSTRIES.length;
    } else {
      nextIndex = (currentIndex - 1 + INDUSTRIES.length) % INDUSTRIES.length;
    }
    setSelectedIndustry(INDUSTRIES[nextIndex]);
  };
  
  return (
    <>
      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4">
        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl pb-24 md:pb-20"
        >
           {/* Stats Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 md:gap-6 text-xs md:text-sm font-mono text-[#2dd4bf] tracking-[0.2em] uppercase mb-6 bg-white/5 px-6 py-2 rounded-full backdrop-blur-sm border border-white/10"
          >
            <span>250+ Projects</span>
            <span className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full animate-pulse"/>
            <span>95% Retention</span>
            <span className="hidden md:inline-block w-1.5 h-1.5 bg-[#3b82f6] rounded-full animate-pulse"/>
            <span className="hidden md:inline-block">150% ROI</span>
          </motion.div>

          {/* Main Title */}
          <div className="relative w-full flex justify-center items-center">
            <GradientText 
              text="BIZWIZ" 
              as="h1" 
              className="text-[18vw] md:text-[16vw] leading-[0.8] font-black tracking-tighter text-center" 
            />
            <motion.div 
               className="absolute -z-20 w-[50vw] h-[50vw] bg-blue-600/10 blur-[60px] rounded-full pointer-events-none"
               animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.3, 0.5, 0.3] }}
               transition={{ duration: 8, repeat: Infinity }}
            />
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-[#2dd4bf]/50 to-transparent mt-4 md:mt-8 mb-6 md:mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-base md:text-xl font-light max-w-3xl mx-auto text-gray-300 leading-relaxed drop-shadow-lg px-4"
          >
            Transform Your Business with Award-Winning Digital Marketing.
            <br className="hidden md:block" />
            Innovative strategies for Real Estate, Web3, Healthcare & SMEs.
          </motion.p>
        </motion.div>

        {/* MARQUEE */}
        <div className="absolute bottom-12 md:bottom-16 left-0 w-full py-4 md:py-6 bg-white text-black z-20 overflow-hidden border-y-4 border-black shadow-[0_0_40px_rgba(255,255,255,0.1)]">
          <motion.div 
            className="flex w-fit will-change-transform"
            animate={{ x: "-50%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className="text-3xl md:text-6xl font-heading font-black px-8 flex items-center gap-6">
                    DIGITAL EXCELLENCE <span className="text-[#2dd4bf] text-2xl md:text-4xl">●</span> 
                    AI AUTOMATION <span className="text-[#2dd4bf] text-2xl md:text-4xl">●</span> 
                    WEB3 & CRYPTO <span className="text-[#2dd4bf] text-2xl md:text-4xl">●</span> 
                    GROWTH HACKING <span className="text-[#2dd4bf] text-2xl md:text-4xl">●</span> 
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* COMPREHENSIVE SERVICES SECTION */}
      <section id="services" className="relative z-10 py-20 md:py-32 bg-black/30 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="mb-16 md:flex md:items-end md:justify-between">
             <div className="max-w-2xl">
               <h2 className="text-4xl md:text-7xl font-heading font-bold uppercase leading-[0.9] text-white mb-6">
                 Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2dd4bf] to-[#3b82f6]">Expertise</span>
               </h2>
               <p className="text-gray-400 text-lg">
                 From visual blueprints to performance dashboards, we provide end-to-end digital solutions tailored to your growth.
               </p>
             </div>
             <a href="/services" className="hidden md:flex items-center gap-2 text-[#2dd4bf] uppercase tracking-widest font-bold text-sm hover:translate-x-2 transition-transform">
               View All Services <ArrowRight size={16} />
             </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES SECTION - EXPANDED */}
      <section id="industries" className="relative z-10 py-20 md:py-32 border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="mb-16 text-center">
             <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase leading-[0.9] text-white">
              Industries We <br/> 
              <span className="stroke-text text-transparent border-text">Empower</span>
            </h2>
            <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
              Specialized strategies for high-value sectors. Whether you are an emerging SME or a global enterprise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10 bg-black/20 backdrop-blur-sm">
            {INDUSTRIES.map((industry) => (
              <ArtistCard key={industry.id} artist={industry} onClick={() => setSelectedIndustry(industry)} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="relative z-10 py-20 md:py-32 px-4 md:px-6 bg-[#020617]/80 backdrop-blur-lg border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-5xl md:text-8xl font-heading font-bold opacity-10 text-white select-none">
               PROCESS
             </h2>
             <p className="text-[#2dd4bf] font-mono uppercase tracking-widest -mt-6 md:-mt-10 relative z-10 text-lg md:text-xl font-bold">
               How We Deliver Exceptional Results
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                name: 'Discovery & Strategy', 
                step: '01', 
                desc: 'Comprehensive business analysis, goal setting, and persona development. We analyze your needs to present a tailored strategy.',
                features: ['Goal Setting', 'Competitor Analysis']
              },
              { 
                name: 'Execution & Launch', 
                step: '02', 
                desc: 'From creative design to technical setup. We implement your strategy with high-converting web design and campaign launches.',
                features: ['Creative Dev', 'Technical Setup']
              },
              { 
                name: 'Optimization & Scale', 
                step: '03', 
                desc: 'Continuous A/B testing and performance analysis. We refine strategies based on data and scale high-performing channels.',
                features: ['ROI Analysis', 'Scaling Success']
              },
            ].map((stage, i) => {
              const isBooking = bookingStep === i;

              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className="relative p-8 md:p-10 border border-white/10 backdrop-blur-md flex flex-col min-h-[450px] transition-colors duration-300 bg-white/5 hover:bg-white/10"
                  data-hover="true"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2dd4bf]/50 to-transparent" />
                  
                  <div className="flex-1">
                    <div className="text-6xl font-heading font-bold text-white/10 mb-6">{stage.step}</div>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-white">{stage.name}</h3>
                    <p className="text-gray-400 leading-relaxed mb-8">{stage.desc}</p>
                    
                    <div className="space-y-3">
                       {stage.features.map((feat, idx) => (
                         <div key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-[#2dd4bf]" />
                            <span>{feat}</span>
                         </div>
                       ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleBooking(i)}
                    className={`w-full py-4 text-sm font-bold uppercase tracking-[0.2em] border border-white/20 transition-all duration-300 mt-8 group overflow-hidden relative 
                      ${isBooking 
                        ? 'bg-[#2dd4bf] text-black border-[#2dd4bf]' 
                        : 'text-white cursor-pointer hover:bg-white hover:text-black'
                      }`}
                  >
                    <span className="relative z-10">
                      {isBooking ? 'Opening Mail Client...' : 'Book Strategy'}
                    </span>
                    {!isBooking && (
                      <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out -z-0" />
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="relative z-10 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
           <div className="flex flex-col items-center text-center mb-16">
              <Quote className="w-12 h-12 text-[#2dd4bf] mb-6 opacity-80" />
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Client Success</h2>
              <p className="text-gray-400 max-w-2xl">Real results from real clients across multiple industries.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {TESTIMONIALS.map((t) => (
               <div key={t.id} className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                 <p className="text-lg text-gray-200 leading-relaxed mb-8 italic">"{t.quote}"</p>
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#2dd4bf] flex items-center justify-center text-lg font-bold text-white">
                     {t.author.charAt(0)}
                   </div>
                   <div>
                     <div className="font-bold text-white">{t.author}</div>
                     <div className="text-sm text-[#2dd4bf]">{t.role}</div>
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Industry Detail Modal */}
      <AnimatePresence>
        {selectedIndustry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndustry(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#0f172a] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-[#2dd4bf]/10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIndustry(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
                data-hover="true"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); navigateIndustry('prev'); }}
                className="absolute left-4 bottom-4 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm"
                data-hover="true"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); navigateIndustry('next'); }}
                className="absolute right-4 bottom-4 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm md:right-8"
                data-hover="true"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedIndustry.id}
                    src={selectedIndustry.image} 
                    alt={selectedIndustry.name} 
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 pb-24 md:p-12 flex flex-col justify-center relative">
                <motion.div
                  key={selectedIndustry.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="flex items-center gap-3 text-[#2dd4bf] mb-4">
                     <Rocket className="w-4 h-4" />
                     <span className="font-mono text-sm tracking-widest uppercase">{selectedIndustry.stat}</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-heading font-bold uppercase leading-none mb-4 text-white">
                    {selectedIndustry.name}
                  </h3>
                  
                  <p className="text-lg text-[#3b82f6] font-medium tracking-widest uppercase mb-6">
                    {selectedIndustry.category}
                  </p>
                  
                  <div className="h-px w-20 bg-white/20 mb-6" />
                  
                  <p className="text-gray-300 leading-relaxed text-lg font-light mb-8">
                    {selectedIndustry.description}
                  </p>
                  
                  <button onClick={() => {
                      setSelectedIndustry(null);
                      // In a real app, this would route to contact
                      window.location.href = "mailto:Contact@BizwizAgency.com";
                  }} className="px-8 py-3 border border-white/30 hover:bg-white hover:text-black text-white transition-colors uppercase text-xs tracking-widest font-bold w-fit">
                      Request Case Study
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;