/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, CheckCircle, Quote, Rocket, ChevronLeft, ChevronRight } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import CustomCursor from './components/CustomCursor';
import AIChat from './components/AIChat';
import GradientText from './components/GlitchText';
import ArtistCard from './components/ArtistCard';
import ServiceCard from './components/ServiceCard';
import Home from './pages/Home';
import ServicesPage from './pages/Services';
import AboutPage from './pages/About';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Replace this path with your actual uploaded logo path
  // The mix-blend-screen class effectively removes the black background
  const LOGO_SRC = "/logo.png"; 

  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen text-white selection:bg-[#14b8a6] selection:text-black cursor-auto md:cursor-none overflow-x-hidden">
        <CustomCursor />
        <FluidBackground />
        <AIChat />
        
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-8 py-6 mix-blend-difference bg-gradient-to-b from-[#0f172a]/80 to-transparent backdrop-blur-[2px]">
          <Link to="/" className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white cursor-pointer z-50 flex items-center gap-2">
              {/* Logo Image with Blend Mode to remove black background */}
              <img 
                src={LOGO_SRC} 
                alt="BIZWIZ" 
                className="h-12 md:h-14 mix-blend-screen object-contain"
                onError={(e) => {
                  // Fallback if image fails
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              {/* Fallback Text Logo */}
              <div className="hidden flex items-center gap-2">
                <div className="w-4 h-4 bg-[#14b8a6] rounded-sm rotate-45" />
                BIZWIZ
              </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest uppercase items-center">
            <Link to="/" className="hover:text-[#2dd4bf] transition-colors text-white" data-hover="true">Home</Link>
            <Link to="/services" className="hover:text-[#2dd4bf] transition-colors text-white" data-hover="true">Services</Link>
            <Link to="/about" className="hover:text-[#2dd4bf] transition-colors text-white" data-hover="true">About</Link>
            <a href="#contact" onClick={() => window.open('mailto:Contact@BizwizAgency.com')} className="hover:text-[#2dd4bf] transition-colors text-white cursor-pointer" data-hover="true">Contact</a>
          </div>
          
          <button 
            onClick={() => window.open('mailto:Contact@BizwizAgency.com')}
            className="hidden md:inline-block border border-white px-6 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 text-white cursor-pointer bg-transparent"
            data-hover="true"
          >
            Consultation
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
             {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 z-30 bg-[#0f172a]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
            >
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-heading font-bold text-white hover:text-[#2dd4bf]">Home</Link>
              <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-heading font-bold text-white hover:text-[#2dd4bf]">Services</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-heading font-bold text-white hover:text-[#2dd4bf]">About</Link>
              <button 
                onClick={() => window.open('mailto:Contact@BizwizAgency.com')}
                className="mt-8 border border-white px-10 py-4 text-sm font-bold tracking-widest uppercase bg-white text-black"
              >
                Get Strategy
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Routing */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>

        {/* Global Footer */}
        <footer className="relative z-10 border-t border-white/10 py-12 md:py-20 bg-[#020617] backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12">
            <div className="space-y-6 md:w-1/3">
               <div className="font-heading text-3xl md:text-4xl font-bold tracking-tighter text-white flex items-center gap-2">
                  <img 
                    src={LOGO_SRC} 
                    alt="BIZWIZ" 
                    className="h-16 mix-blend-screen object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#14b8a6] rounded-sm rotate-45" />
                    BIZWIZ
                  </div>
               </div>
               <p className="text-gray-400 leading-relaxed">
                 Full-service digital marketing powerhouse delivering measurable results since 2020. We help businesses flourish online through innovative strategies.
               </p>
            </div>
            
            <div className="grid grid-cols-2 gap-12 md:gap-24 text-sm">
               <div>
                 <h4 className="font-bold text-white uppercase tracking-widest mb-6">Contact</h4>
                 <ul className="space-y-4 text-gray-400 font-mono">
                   <li className="hover:text-[#2dd4bf] transition-colors">Jaipur, India (HQ)</li>
                   <li className="hover:text-[#2dd4bf] transition-colors">+91-7976163039</li>
                   <li className="hover:text-[#2dd4bf] transition-colors">Contact@BizwizAgency.com</li>
                 </ul>
               </div>
               <div>
                 <h4 className="font-bold text-white uppercase tracking-widest mb-6">Services</h4>
                 <ul className="space-y-4 text-gray-400">
                   <li><Link to="/services" className="hover:text-[#2dd4bf]">Branding & Identity</Link></li>
                   <li><Link to="/services" className="hover:text-[#2dd4bf]">Web Design</Link></li>
                   <li><Link to="/services" className="hover:text-[#2dd4bf]">SEO & Marketing</Link></li>
                 </ul>
               </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center md:text-left text-xs text-gray-500">
            © 2025 Bizwiz Digital Agency. All Rights Reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;