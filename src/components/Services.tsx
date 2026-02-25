"use client";

import React, { useState, useEffect, useRef } from 'react';

const SERVICES = [
    {
        id: "01",
        title: "Concepção & Realidade 3D",
        description: "Cada curva e textura é estudada minuciosamente. Desenvolvemos renders tridimensionais fotorrealistas para que você caminhe pelo seu ambiente antes mesmo do primeiro corte na madeira ser feito. Previsibilidade absoluta e zero surpresas.",
        image: "/A_premium_interior_2k_202602251414-convertido-de-jpeg.webp"
    },
    {
        id: "02",
        title: "Alta Marcenaria Própria",
        description: "Não dependemos de terceiros. Nosso parque fabril próprio une a precisão cirúrgica de maquinários italianos ao toque artesanal de mestres marceneiros. Utilizamos apenas lacas importadas, ferragens austríacas e lâminas naturais certificadas.",
        image: "/Extreme_closeup_of_a_master_craftsman_in_a_pristin_delpmaspu-convertido-de-png.webp"
    },
    {
        id: "03",
        title: "Entrega 'White-Glove'",
        description: "Um projeto luxuoso exige uma execução impecável. Nossa equipe própria de montagem atua com protocolo White-Glove: luvas limpas, proteção total do imóvel e limpeza final. Entregamos a chave na sua mão com o ambiente 100% habitável.",
        image: "/A_pristine_newly_finished_luxury_interior_living_r_delpmaspu-convertido-de-png.webp"
    }
];

const Services: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const textRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute('data-index'));
                        setActiveIndex(index);
                    }
                });
            },
            { rootMargin: '-40% 0px -40% 0px' } // Trigger when crossing the center of the viewport
        );

        textRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const setRef = (index: number) => (el: HTMLDivElement | null) => {
        textRefs.current[index] = el;
    };

    return (
        <section id="servicos" className="bg-white">

            {/* 
        ========================================
        MOBILE LAYOUT (Stacked)
        ========================================
      */}
            <div className="lg:hidden container mx-auto px-4 py-20 bg-white">
                <div className="mb-16">
                    <div className="text-primary-400 font-bold tracking-[0.2em] text-[10px] uppercase mb-4 flex items-center gap-4">
                        <span className="w-8 h-px bg-primary-200"></span>
                        A Experiência Bernardo
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-sans font-medium text-secondary-900 leading-[1.1] tracking-tight">
                        Processo irretocável.<br />
                        <span className="font-serif text-primary-800 italic">Do virtual ao físico.</span>
                    </h2>
                </div>

                <div className="flex flex-col gap-16">
                    {SERVICES.map((service) => (
                        <div key={`mob-${service.id}`} className="flex flex-col">
                            <div className="h-[50vh] min-h-[400px] w-full mb-8 rounded-2xl overflow-hidden shadow-2xl relative">
                                <div className="absolute inset-0 bg-black/10 z-10 mix-blend-multiply"></div>
                                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <div className="flex items-baseline gap-4 mb-4">
                                    <span className="font-serif text-3xl text-primary-600">{service.id}.</span>
                                    <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-primary-900 uppercase">
                                        {service.title}
                                    </h3>
                                </div>
                                <p className="text-secondary-600 font-light text-lg leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 
        ========================================
        DESKTOP LAYOUT (Sticky Scroll)
        ========================================
      */}
            <div className="hidden lg:flex w-full relative">

                {/* Left: Sticky Image Gallery */}
                <div className="w-1/2 h-screen sticky top-0 overflow-hidden bg-secondary-900">
                    {SERVICES.map((service, index) => (
                        <div
                            key={`img-${service.id}`}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            <div className="absolute inset-0 bg-black/10 z-10 mix-blend-multiply"></div>
                            <img
                                src={service.image}
                                alt={service.title}
                                className={`w-full h-full object-cover transition-transform duration-[10s] ease-out object-center ${index === activeIndex ? 'scale-105' : 'scale-100'}`}
                            />
                        </div>
                    ))}
                </div>

                {/* Right: Scrollable Content */}
                <div className="w-1/2 bg-white px-12 xl:px-24">

                    <div className="pt-[25vh] pb-[10vh]">
                        <div className="text-primary-400 font-bold tracking-[0.2em] text-xs uppercase mb-6 flex items-center gap-4">
                            <span className="w-12 h-px bg-primary-200"></span>
                            A Experiência Bernardo
                        </div>
                        <h2 className="text-5xl xl:text-7xl font-sans font-medium text-secondary-900 leading-[1.1] tracking-tight">
                            Processo irretocável.<br />
                            <span className="font-serif text-primary-800 italic">Do virtual ao físico.</span>
                        </h2>
                    </div>

                    <div className="pb-[30vh]">
                        {SERVICES.map((service, index) => (
                            <div
                                key={`txt-${service.id}`}
                                data-index={index}
                                ref={setRef(index)}
                                className={`min-h-[70vh] flex flex-col justify-center transition-opacity duration-700 ease-in-out ${index === activeIndex ? 'opacity-100' : 'opacity-20'}`}
                            >
                                <div className="flex items-baseline gap-6 mb-8">
                                    <span className="font-serif text-4xl xl:text-5xl text-primary-600">
                                        {service.id}.
                                    </span>
                                    <h3 className="text-4xl xl:text-5xl font-medium tracking-tight text-primary-900 uppercase">
                                        {service.title}
                                    </h3>
                                </div>
                                <p className="text-secondary-600 font-light text-xl xl:text-2xl leading-relaxed max-w-lg pl-[76px] xl:pl-[88px]">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
};

export default Services;
