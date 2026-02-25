import React, { useState, useEffect, useRef } from 'react';
import { Project, ProjectCategory } from '../types';
import { PROJECTS } from '../constants';
import ProjectCard from './ProjectCard';
import { Filter } from 'lucide-react';

const Portfolio: React.FC = () => {
    const [filter, setFilter] = useState<ProjectCategory | 'Todos'>('Todos');
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    const filteredProjects = filter === 'Todos'
        ? PROJECTS
        : PROJECTS.filter(p => p.category === filter);

    const filters: (ProjectCategory | 'Todos')[] = ['Todos', 'Cozinhas', 'Dormitórios', 'Living', 'Corporativo'];

    // Auto-play Logic
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused && carouselRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

                // If we reached the end (approx), scroll back to start
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    // Scroll one card width + gap (approx 300px + 16px)
                    const scrollAmount = window.innerWidth < 768 ? 296 : 432;
                    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }
        }, 4000); // 4 seconds per slide

        return () => clearInterval(interval);
    }, [isPaused, filter]);

    const scrollCarousel = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const scrollAmount = window.innerWidth < 768 ? 296 : 400;
            carouselRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="projetos" className="pb-20 pt-10 bg-secondary-50 scroll-mt-32">
            <div className="container mx-auto px-4 lg:px-12">

                {/* Header - Editorial Style & "Encaixada" */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
                    <div className="max-w-xl relative">
                        {/* Decorative Line */}
                        <div className="w-12 h-1 bg-primary-500 mb-6 rounded-full"></div>

                        <span className="text-primary-600 font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
                            Portfólio Exclusivo
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-medium text-secondary-900 leading-none">
                            Design que conta <br />
                            <span className="text-primary-800 italic">a sua história.</span>
                        </h2>
                    </div>

                    {/* Premium Segmented Control */}
                    <div className="bg-white p-1.5 rounded-full shadow-soft border border-white/50 inline-flex flex-nowrap gap-1 w-full lg:w-auto overflow-x-auto hide-scrollbar">
                        {filters.map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 md:px-8 py-2 md:py-3 rounded-full text-[9px] md:text-[11px] font-bold uppercase tracking-widest transition-all duration-500 whitespace-nowrap flex-shrink-0 ${filter === f
                                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                                    : 'bg-transparent text-secondary-400 hover:bg-secondary-50 hover:text-secondary-600'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Carousel Container */}
                <div
                    className="relative group/carousel w-full"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                >

                    {/* Navigation Buttons (Desktop - Split to sides) */}
                    <div className="hidden lg:block">
                        <button
                            onClick={() => scrollCarousel('left')}
                            className="absolute left-[-24px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg shadow-primary-900/10 border border-secondary-100 flex items-center justify-center text-secondary-500 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 transform -translate-x-4 group-hover/carousel:translate-x-0"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        </button>

                        <button
                            onClick={() => scrollCarousel('right')}
                            className="absolute right-[-24px] xl:right-[40px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg shadow-primary-900/10 border border-secondary-100 flex items-center justify-center text-secondary-500 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 transform translate-x-4 group-hover/carousel:translate-x-0"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    </div>

                    {/* Scrollable Area */}
                    <div
                        ref={carouselRef}
                        id="projects-scroll"
                        className="flex gap-4 md:gap-8 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {filteredProjects.map((project) => (
                            <div key={project.id} className="flex-none basis-[280px] sm:basis-[320px] md:basis-[400px] snap-center">
                                <ProjectCard project={project} />
                            </div>
                        ))}

                        {/* Spacing at the end */}
                        <div className="min-w-[5vw]"></div>
                    </div>
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center p-4 rounded-full bg-secondary-100 mb-4">
                            <Filter className="w-8 h-8 text-secondary-300" />
                        </div>
                        <h3 className="text-xl font-serif text-secondary-500">Nenhum projeto encontrado nesta categoria.</h3>
                    </div>
                )}

                <div className="mt-24 flex justify-center">
                    <button className="px-10 py-5 border border-secondary-300 text-secondary-600 text-xs font-bold uppercase tracking-widest hover:bg-primary-900 hover:text-white hover:border-primary-900 transition-all duration-500 rounded-full">
                        Ver Mapa de Projetos
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;