/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceItem } from '../types';
import { Play, MousePointer2, BarChart2, Layers, Box } from 'lucide-react';
import ThreeDPreview from './ThreeDPreview';

interface ServiceCardProps {
  service: ServiceItem;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Render different visual content based on visualType
  const renderVisual = () => {
    switch (service.visualType) {
      case '3d-model':
        return <ThreeDPreview />;

      case 'moodboard':
        return (
          <div className="relative w-full h-full p-6 bg-[#f0f0f0] overflow-hidden group-hover:scale-105 transition-transform duration-700">
            {/* Mock Brand Kit Layout */}
            <div className="absolute top-4 left-4 w-2/3 h-1/2 bg-white shadow-lg p-2 rotate-[-6deg] z-10">
               <img src={service.images[0]} alt="Brand" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-4 right-4 w-1/2 h-1/2 bg-black shadow-xl p-4 rotate-[3deg] z-20 flex flex-col justify-between">
               <div className="text-white font-heading text-xs uppercase tracking-widest">Brand Guideline</div>
               <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#2dd4bf]"></div>
                  <div className="w-6 h-6 rounded-full bg-[#3b82f6]"></div>
                  <div className="w-6 h-6 rounded-full bg-white"></div>
               </div>
            </div>
          </div>
        );

      case 'social-grid':
        return (
          <div className="w-full h-full p-4 bg-white grid grid-cols-3 gap-2 overflow-hidden group-hover:gap-1 transition-all duration-500">
            {service.images.slice(0, 9).map((img, i) => (
              <div key={i} className="relative aspect-square bg-gray-100 overflow-hidden">
                <img src={img} alt="Post" className="w-full h-full object-cover" />
              </div>
            ))}
            {/* Phone Frame Overlay Mockup */}
            <div className="absolute inset-0 border-[12px] border-black rounded-[2rem] pointer-events-none opacity-10" />
          </div>
        );

      case 'scroll-preview':
        return (
          <div className="w-full h-full bg-[#1e293b] p-4 flex items-center justify-center overflow-hidden">
             {/* Laptop Mockup */}
             <div className="relative w-full aspect-[16/10] bg-black rounded-lg border-4 border-gray-700 shadow-2xl overflow-hidden">
                <motion.div 
                   className="w-full"
                   animate={isHovered ? { y: [0, -200, 0] } : { y: 0 }}
                   transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                >
                   <img src={service.images[0]} alt="Website" className="w-full h-auto" />
                </motion.div>
                {/* Header Mock */}
                <div className="absolute top-0 left-0 w-full h-4 bg-gray-800 z-10 flex items-center gap-1 px-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                </div>
             </div>
             <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur text-[10px] px-2 py-1 rounded text-[#2dd4bf] flex items-center gap-1">
                <MousePointer2 size={10} /> Live Preview
             </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="w-full h-full bg-[#020617] p-6 relative overflow-hidden group-hover:bg-[#0f172a] transition-colors">
             {/* Chart Bars */}
             <div className="flex items-end justify-between h-32 w-full mt-8 gap-2">
                {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                   <motion.div 
                     key={i} 
                     className="w-full bg-[#3b82f6] opacity-50 rounded-t-sm"
                     initial={{ height: '10%' }}
                     whileInView={{ height: `${h}%` }}
                     transition={{ duration: 0.5, delay: i * 0.1 }}
                   />
                ))}
             </div>
             {/* Floating Stats Card */}
             <motion.div 
               className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-lg"
               animate={isHovered ? { y: -5 } : { y: 0 }}
             >
                <div className="text-[10px] text-gray-400 uppercase tracking-wider">ROAS</div>
                <div className="text-xl font-bold text-[#2dd4bf]">+450%</div>
             </motion.div>
          </div>
        );

      case 'video-hover':
        return (
          <div className="relative w-full h-full bg-black group-hover:scale-105 transition-transform duration-700">
             <img src={service.images[0]} alt="Video Thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
                   <Play className="fill-white text-white ml-1" size={20} />
                </div>
             </div>
             <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
                <motion.div 
                  className="h-full bg-red-600"
                  initial={{ width: '0%' }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 3 }}
                />
             </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full bg-gray-900 overflow-hidden">
             <img src={service.images[0]} alt="Service" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
          </div>
        );
    }
  };

  return (
    <motion.div
      className="group relative h-[300px] md:h-[350px] w-full bg-[#0f172a] border border-white/10 rounded-xl overflow-hidden hover:border-[#2dd4bf]/50 transition-colors duration-300"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      {/* Visual Container */}
      <div className="h-[65%] w-full overflow-hidden border-b border-white/5">
        {renderVisual()}
      </div>

      {/* Content Container */}
      <div className="h-[35%] p-5 flex flex-col justify-between bg-gradient-to-b from-[#0f172a] to-[#020617]">
         <div>
            <h3 className="font-heading font-bold text-lg text-white mb-1 group-hover:text-[#2dd4bf] transition-colors">
              {service.title}
            </h3>
            <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
              {service.description}
            </p>
         </div>
         <div className="flex gap-2 mt-3 flex-wrap">
            {service.tags.map((tag, i) => (
              <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/5 rounded border border-white/5 text-gray-300">
                {tag}
              </span>
            ))}
         </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;