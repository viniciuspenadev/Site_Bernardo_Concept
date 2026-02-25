import React from 'react';
import { FEATURES } from '../constants';
import { getFeatureIcon } from './IconHelper';

const Features: React.FC = () => {
  return (
    <section id="diferenciais" className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-20">

          {/* Image Composition - Cleaner */}
          <div className="lg:w-1/2 relative order-2 lg:order-1">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2000&auto=format&fit=crop"
                alt="Interior de Alto Padrão"
                className="w-full h-[700px] object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out"
              />

              {/* Minimalist Overlay Box */}
              <div className="absolute bottom-0 right-0 bg-primary-900 p-8 w-64">
                <p className="text-white font-serif text-3xl italic">"A arquitetura é a música congelada."</p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2 order-1 lg:order-2">
            <span className="text-primary-600 font-bold tracking-[0.2em] text-xs uppercase mb-6 block">
              Nosso DNA
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-medium text-primary-900 mb-8 leading-none">
              Excelência <br /> inegociável.
            </h2>
            <p className="text-lg text-secondary-500 mb-12 font-light leading-relaxed max-w-md">
              Cada projeto TRINOVA é uma resposta única ao seu entorno. Não replicamos fórmulas, criamos legados.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {FEATURES.map((feature) => (
                <div key={feature.id} className="flex flex-col gap-3 group cursor-default">
                  <div className="w-10 h-10 flex items-center justify-center text-primary-900 group-hover:text-primary-500 transition-colors">
                    {getFeatureIcon(feature.icon, "w-8 h-8 stroke-[1.5px]")}
                  </div>
                  <div>
                    <h4 className="text-lg font-serif font-bold text-primary-900 mb-2">{feature.title}</h4>
                    <p className="text-sm text-secondary-500 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;