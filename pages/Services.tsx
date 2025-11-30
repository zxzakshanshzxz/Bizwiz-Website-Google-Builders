/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import ServiceCard from '../components/ServiceCard';
import { SERVICES } from './Home';

const ServicesPage: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-8">
        Our <span className="text-[#2dd4bf]">Services</span>
      </h1>
      <p className="text-xl text-gray-400 max-w-3xl mb-16 leading-relaxed">
        We offer comprehensive digital solutions designed to scale your business. Explore our specialized services below.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;