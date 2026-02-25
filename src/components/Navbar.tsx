import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projetos', href: '#projetos' },
    { name: 'O Studio', href: '#diferenciais' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Contato', href: 'https://wa.me/5511999999999' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled
          ? 'bg-white/90 backdrop-blur-xl py-3 border-secondary-200 shadow-soft'
          : 'bg-transparent py-6 border-white/10'
          }`}
      >
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">

          {/* Left Nav (Desktop) - Soft Pills */}
          <nav className="hidden md:flex items-center gap-4 flex-1">
            {navLinks.slice(0, 2).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-300 ${isScrolled
                  ? 'text-secondary-600 hover:bg-primary-50 hover:text-primary-700'
                  : 'text-white hover:bg-white/10 hover:text-white'
                  }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Logo (Centered) */}
          <div className="flex-shrink-0 flex items-center justify-center px-6 relative h-10 md:h-12 w-32 md:w-36">
            {/* Default White Logo */}
            <img
              src="/bernardo-concept-logo.webp"
              alt="Bernardo Concept"
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}
            />

            {/* Solid Color Mask Logo for precise #004a8f hex */}
            <div
              className={`absolute inset-0 w-full h-full bg-[#004a8f] transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
              style={{
                WebkitMaskImage: 'url(/bernardo-concept-logo.webp)',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: 'url(/bernardo-concept-logo.webp)',
                maskSize: 'contain',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
              }}
            />
          </div>

          {/* Right Nav (Desktop) - Soft Pills */}
          <nav className="hidden md:flex items-center gap-4 flex-1 justify-end">
            {navLinks.slice(2).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-300 ${isScrolled
                  ? 'text-secondary-600 hover:bg-primary-50 hover:text-primary-700'
                  : 'text-white hover:bg-white/10 hover:text-white'
                  }`}
              >
                {link.name}
              </a>
            ))}

            {/* Glass Pill Button */}
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className={`ml-4 text-[10px] font-bold uppercase tracking-widest px-6 py-2.5 rounded-full transition-all duration-300 border ${isScrolled
              ? 'bg-primary-600 text-white border-primary-600 hover:bg-primary-700 hover:shadow-lg shadow-primary-500/20'
              : 'bg-white/10 text-white border-white/20 hover:bg-white hover:text-primary-900 backdrop-blur-sm'
              }`}>
              Área do Cliente
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden p-2 rounded-full transition-colors ${isScrolled ? 'text-secondary-900 hover:bg-secondary-100' : 'text-white hover:bg-white/10'}`}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay - Blue/Clean Theme */}
      <div className={`fixed inset-0 bg-primary-900/95 backdrop-blur-2xl z-[100] transition-transform duration-500 md:hidden flex flex-col items-center justify-center ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Overlay Header */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
          <img src="/bernardo-concept-logo.webp" alt="Bernardo Concept" className="h-10 object-contain" />
          <button
            className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Fechar menu"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="flex flex-col gap-8 text-center mt-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-3xl font-serif text-white hover:text-primary-200 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 px-10 py-4 bg-white text-primary-900 rounded-full uppercase tracking-widest text-xs font-bold hover:scale-105 transition-transform inline-block"
          >
            Agendar Visita
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;