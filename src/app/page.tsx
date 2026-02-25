"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustIndicators from '@/components/TrustIndicators';
import Portfolio from '@/components/Portfolio';
import Features from '@/components/Features';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import { MessageCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-secondary-50 font-sans text-secondary-900 selection:bg-primary-200 selection:text-secondary-900">
      <Navbar />

      <main>
        <Hero />

        {/* Trust Indicators - Floating overlap between Hero and Content */}
        <TrustIndicators />

        <Portfolio />
        <Features />
        <Services />

        {/* CTA Section - Minimalist & Dark */}
        <section className="py-32 bg-primary-900 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <span className="text-primary-400 font-bold tracking-[0.2em] text-xs uppercase mb-6 block">
              Atendimento Exclusivo
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-bold text-white mb-8 leading-tight">
              Agende sua visita privada.
            </h2>
            <p className="text-primary-200 text-lg max-w-xl mx-auto mb-12 font-light">
              Nossos especialistas estão à disposição para projetar e planejar cada detalhe do seu futuro ambiente.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="https://wa.me/5511934958288" target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-white text-primary-900 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-primary-500 hover:text-white transition-all duration-300 inline-block">
                Solicitar Contato
              </a>
              <a href="https://wa.me/5511934958288" target="_blank" rel="noopener noreferrer" className="px-10 py-5 border border-primary-700 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:border-white hover:bg-white hover:text-primary-900 transition-all duration-300 inline-block">
                Whatsapp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Elegant Floating Button with Conversion Badge */}
      <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 flex items-center gap-4 group">
        {/* Floating Text Badge (Hidden until hover on Desktop, pulsing on Mobile) */}
        <div className="hidden md:flex flex-col items-end opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 pointer-events-none">
          <span className="bg-white/95 backdrop-blur-md shadow-2xl text-primary-900 border border-primary-100 px-5 py-3 rounded-2xl rounded-br-none font-serif text-sm font-medium whitespace-nowrap">
            Atendimento <i className="text-secondary-500">Exclusivo</i>
          </span>
          <span className="bg-primary-900 text-white text-[9px] uppercase tracking-widest px-3 py-1 rounded-full rounded-tr-none mt-1 shadow-md">
            Resposta Imediata
          </span>
        </div>

        {/* The Button */}
        <a
          href="https://wa.me/5511934958288"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-primary-900 text-white rounded-full transition-all duration-500 hover:scale-105 shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:shadow-primary-900/50"
          aria-label="Atendimento Exclusivo no WhatsApp"
        >
          {/* Subtle Ping Animation */}
          <span className="absolute inset-0 rounded-full border border-primary-400 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50"></span>

          <MessageCircle className="w-6 h-6 md:w-7 md:h-7 relative z-10 group-hover:rotate-12 transition-transform duration-500" />
        </a>
      </div>
    </div>
  );
}
