import React from 'react';
import { FEATURES } from '../constants';
import { getFeatureIcon } from './IconHelper';

const Features: React.FC = () => {
  return (
    <section id="diferenciais" className="py-16 lg:py-24 bg-white overflow-hidden scroll-mt-32">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Image Composition - Owner Photo */}
          <div className="lg:w-1/2 relative order-2 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-sm lg:max-w-none">
              <img
                src="/luisotavio_0_5x.webp"
                alt="Luís Otávio - Bernardo Concept"
                className="w-full h-[500px] lg:h-[600px] object-cover object-top transition-all duration-1000 ease-out rounded-xl lg:rounded-none shadow-xl lg:shadow-none"
              />

              {/* Glassmorphism Floating Quote */}
              <div className="absolute -bottom-6 right-2 lg:-right-10 lg:bottom-10 bg-white/80 backdrop-blur-md border border-white border-opacity-40 p-5 lg:p-6 w-[260px] lg:w-[300px] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-2 duration-500">
                <p className="text-primary-900 font-serif text-lg lg:text-xl italic leading-snug">"A arquitetura é a música congelada."</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-6 h-[1px] bg-primary-400"></div>
                  <p className="text-primary-900 text-[9px] md:text-[10px] uppercase tracking-[0.15em] font-bold">Luís Otávio<br /><span className="text-[8px] md:text-[9px] font-normal text-secondary-500 tracking-wider">CEO</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2 order-1 lg:order-2 lg:pl-10">
            <div className="text-secondary-400 font-bold tracking-[0.2em] text-[10px] lg:text-xs uppercase mb-3 flex items-center gap-3">
              <span className="w-8 lg:w-12 h-[1px] bg-primary-300"></span>
              Nosso DNA
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-primary-900 mb-6 leading-tight">
              Excelência <br /> <span className="text-secondary-400 italic">inegociável.</span>
            </h2>
            <p className="text-sm md:text-base text-secondary-500 mb-8 font-light leading-relaxed max-w-lg">
              Cada projeto Bernardo Concept é uma resposta única ao seu perfil. Não replicamos fórmulas, criamos ambientes exclusivos e personalizados onde a funcionalidade encontra a sofisticação absoluta.
            </p>

            {/* Refined Features List */}
            <div className="flex flex-col gap-4 lg:gap-5">
              {FEATURES.map((feature, index) => (
                <React.Fragment key={feature.id}>
                  <div className="flex items-start gap-4 lg:gap-5 group cursor-default">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-primary-50 text-primary-900 group-hover:bg-primary-900 group-hover:text-white transition-all duration-500">
                      {getFeatureIcon(feature.icon, "w-4 h-4 lg:w-5 lg:h-5 stroke-[1.5px]")}
                    </div>
                    <div className="pt-0.5 lg:pt-1">
                      <h4 className="text-base lg:text-lg font-serif font-bold text-primary-900 mb-1 lg:mb-2 group-hover:text-primary-600 transition-colors">{feature.title}</h4>
                      <p className="text-xs lg:text-sm text-secondary-500 leading-relaxed font-light">{feature.description}</p>
                    </div>
                  </div>
                  {/* Subtle Divider */}
                  {index < FEATURES.length - 1 && (
                    <div className="w-full h-[1px] bg-gradient-to-r from-stone-200 to-transparent ml-14 lg:ml-17"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;