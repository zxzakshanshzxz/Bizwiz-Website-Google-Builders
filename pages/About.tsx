/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { BarChart3, Users, Zap } from 'lucide-react';
import GradientText from '../components/GlitchText';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div>
           <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-tight text-white">
              Who <GradientText text="WE ARE" className="text-5xl md:text-7xl" />
           </h1>
           <p className="text-xl text-gray-300 font-light leading-relaxed mb-8">
             Founded in 2020, Bizwiz Digital Agency emerged from a vision to democratize world-class digital marketing. Under the leadership of award-winning expert Akshansh Sharma, we have guided over 100 businesses toward sustained revenue growth.
           </p>
           <div className="flex gap-4">
              <div className="px-6 py-3 bg-[#2dd4bf]/10 border border-[#2dd4bf]/20 rounded-lg">
                <div className="text-3xl font-bold text-[#2dd4bf]">150%</div>
                <div className="text-xs uppercase tracking-wider text-gray-400">Avg ROI</div>
              </div>
              <div className="px-6 py-3 bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-lg">
                 <div className="text-3xl font-bold text-[#3b82f6]">250+</div>
                 <div className="text-xs uppercase tracking-wider text-gray-400">Projects</div>
              </div>
           </div>
        </div>
        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
           <img 
             src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" 
             alt="Team" 
             className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        </div>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: BarChart3, title: 'Our Mission', desc: 'To empower businesses with innovative digital solutions that drive growth and deliver exceptional ROI.' },
          { icon: Zap, title: 'Innovation', desc: 'We stay at the forefront of digital trends, adopting AI and automation for competitive advantages.' },
          { icon: Users, title: 'Integrity', desc: 'We operate with transparency and honesty, providing realistic expectations and delivering on promises.' },
        ].map((feature, i) => (
          <div key={i} className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#2dd4bf]/50 transition-colors">
            <div className="mb-6 p-4 bg-white/5 rounded-xl w-fit text-[#2dd4bf]">
              <feature.icon className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold mb-4 font-heading text-white">{feature.title}</h4>
            <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;