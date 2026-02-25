import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    image: "/assets/home/sala-planejada c pessoa.webp",
    subtitle: "Qualidade & Inovação",
    title: "Mobiliário Sob Medida",
    description: "Plantas até 75m² — Até 7 ambientes inclusos com acabamento premium.",
    price: "79.990,00",
    cta: "Falar com Especialista"
  },
  {
    id: 2,
    image: "/assets/home/cozinha-planejada.webp",
    subtitle: "Exclusividade e Design",
    title: "Ambientes Planejados",
    description: "Projetos em marcenaria de alto padrão que traduzem a sua arquitetura em cada detalhe.",
    cta: "Ver Projetos"
  }
];

const AUTOPLAY_DURATION = 7000; // 7 seconds

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = window.setTimeout(
      () => setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1)),
      AUTOPLAY_DURATION
    );

    return () => resetTimeout();
  }, [currentSlide]);

  const handleManualChange = (direction: 'next' | 'prev') => {
    setIsAnimating(true);
    resetTimeout();

    if (direction === 'next') {
      setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    } else {
      setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
    }

    // Small delay to allow CSS animations to re-trigger if needed, 
    // mostly to signal interaction state
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-stone-900 group">

      {/* Slides Container */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {/* Background Image with Ken Burns Effect */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${isActive ? 'scale-110' : 'scale-100'}`}
              />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 pointer-events-none"></div>
              <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black/80 via-black/30 to-transparent opacity-70 pointer-events-none"></div>
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 lg:px-12 h-full flex flex-col justify-center">
              <div className={`max-w-4xl transition-all duration-1000 delay-300 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

                <div className="flex items-center gap-4 mb-6">
                  <span className="h-[2px] w-12 bg-primary-400"></span>
                  <p className="text-primary-200 font-sans font-bold tracking-[0.2em] text-xs uppercase">
                    {slide.subtitle}
                  </p>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.9] mb-6">
                  {slide.title}
                </h1>

                <p className="text-lg md:text-xl text-stone-300 max-w-lg font-light leading-relaxed mb-10 border-l border-white/20 pl-6">
                  {slide.description}
                </p>

                {/* Promotional Price Tag */}
                {slide.price && (
                  <div className="mb-12 flex flex-col">
                    <span className="text-primary-400 text-xs font-bold uppercase tracking-widest mb-2">A partir de</span>
                    <div className="flex items-baseline gap-2 text-white drop-shadow-lg">
                      <span className="text-2xl md:text-3xl font-serif font-light text-primary-200">R$</span>
                      <span className="text-6xl md:text-8xl font-bold font-serif tracking-tighter">{slide.price}</span>
                    </div>
                  </div>
                )}

                <button className="flex items-center gap-4 text-white text-sm font-bold uppercase tracking-widest group/btn hover:text-primary-300 transition-colors">
                  <span className="border-b-2 border-primary-500 pb-1 group-hover/btn:border-primary-300 transition-all">
                    {slide.cta}
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Controls */}
      <div className="absolute bottom-24 lg:bottom-28 inset-x-0 z-30 flex items-center justify-center gap-6">

        {/* Slide Numbers */}
        <div className="hidden md:flex items-center gap-2 text-white font-serif">
          <span className="text-xl font-medium leading-none">0{currentSlide + 1}</span>
          <span className="text-xs text-stone-400">/ 0{HERO_SLIDES.length}</span>
        </div>

        {/* Arrows */}
        <div className="flex gap-4">
          <button
            onClick={() => handleManualChange('prev')}
            className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-stone-900 transition-all rounded-full backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => handleManualChange('next')}
            className="w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-stone-900 transition-all rounded-full backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Numbers (Mobile Only, below arrows previously, now next to it) */}
        <div className="md:hidden flex flex-col items-center gap-1 text-white font-serif">
          <span className="text-lg font-medium leading-none">0{currentSlide + 1}</span>
          <span className="text-[10px] text-stone-400">/ 0{HERO_SLIDES.length}</span>
        </div>
      </div>

      {/* Progress Bar Loader */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-30">
        {HERO_SLIDES.map((_, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 h-full bg-primary-500 transition-all linear`}
            style={{
              width: currentSlide === index ? '100%' : '0%',
              opacity: currentSlide === index ? 1 : 0,
              // If it's the current slide, animate from 0 to 100% over the duration
              // We use keyframes via style injection or just a transition if we handle width 0->100
              transitionDuration: currentSlide === index ? `${AUTOPLAY_DURATION}ms` : '0ms'
            }}
          />
        ))}
        {/* Simple active progress line animation trick */}
        <div
          key={currentSlide} // Key change forces re-render of animation
          className="h-full bg-primary-500 w-full origin-left animate-[loading_6s_linear_forwards]"
        ></div>
      </div>

      <style>{`
        @keyframes loading {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
};

export default Hero;