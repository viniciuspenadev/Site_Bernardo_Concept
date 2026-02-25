import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PROJECTS } from '../constants';
import {
    Check, MapPin, ArrowRight, MessageCircle, Play, Pause,
    Waves, Dumbbell, ShieldCheck, Wifi, Thermometer, Flower2,
    Car, Building, LayoutTemplate, MousePointer2
} from 'lucide-react';

const GrandPalace: React.FC = () => {
    const project = PROJECTS.find(p => p.id === 4);
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggleVideo = () => {
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause();
            else videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    if (!project) return <div>Project not found</div>;

    const galleryImages = [
        '/assets/grandplaza/gallery-1.png',
        '/assets/grandplaza/gallery-2.png',
        '/assets/grandplaza/gallery-3.png',
        '/assets/grandplaza/gallery-4.png',
        '/assets/grandplaza/gallery-5.png',
        '/assets/grandplaza/gallery-6.png',
    ];

    const facilities = [
        { icon: <Waves className="w-6 h-6" />, label: "Piscina Infinity", desc: "Com vista panorâmica e aquecimento." },
        { icon: <Dumbbell className="w-6 h-6" />, label: "Fitness Center", desc: "Equipamentos Technogym de última geração." },
        { icon: <Flower2 className="w-6 h-6" />, label: "Garden Lounge", desc: "Paisagismo assinado por Burle Marx." },
        { icon: <ShieldCheck className="w-6 h-6" />, label: "Segurança 24h", desc: "Monitoramento com IA e controle biométrico." },
        { icon: <Wifi className="w-6 h-6" />, label: "Smart Living", desc: "Automação residencial completa entregue." },
        { icon: <Thermometer className="w-6 h-6" />, label: "Climatização", desc: "Infraestrutura para AC em todos os ambientes." },
    ];

    return (
        <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-bronze-200 selection:text-bronze-900">
            <Navbar />

            <main>
                {/* Hero Section with Video */}
                <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-stone-900">
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            loop
                            playsInline
                            poster="/assets/grandplaza/hero-poster.png"
                            className="w-full h-full object-cover opacity-60"
                        >
                            <source src="/assets/grandplaza/video.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
                    </div>

                    <div className="relative z-10 container mx-auto px-4 text-center">
                        <div className="animate-fade-in-up">
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-bronze-500/20 backdrop-blur-md border border-bronze-500/30 text-bronze-200 text-xs font-bold uppercase tracking-widest mb-8 rounded-full">
                                <div className="w-2 h-2 rounded-full bg-bronze-500 animate-pulse" />
                                {project.status}
                            </span>
                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-6 tracking-tight">
                                <span className="block text-2xl md:text-4xl font-sans font-light tracking-[0.2em] text-stone-300 mb-4">RESIDENCIAL</span>
                                {project.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-stone-300 font-light max-w-2xl mx-auto mb-12">
                                O ápice do luxo urbano no coração da {project.location}.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                <button className="px-10 py-4 bg-white text-stone-900 font-bold uppercase tracking-widest hover:bg-bronze-500 hover:text-white transition-all duration-500 min-w-[200px]">
                                    Agendar Visita
                                </button>
                                <button
                                    onClick={toggleVideo}
                                    className="flex items-center gap-3 text-white uppercase tracking-widest text-xs font-bold hover:text-bronze-400 transition-colors"
                                >
                                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                    {isPlaying ? 'Pausar Vídeo' : 'Tocar Vídeo'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce">
                        <MousePointer2 className="w-6 h-6 mx-auto mb-2" />
                    </div>
                </section>

                {/* Introduction / Concept - IMPROVED LAYOUT */}
                <section className="py-32 bg-white relative overflow-hidden">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row items-center gap-20">
                            <div className="lg:w-1/2 relative">
                                <div className="relative z-10">
                                    <img
                                        src="/assets/grandplaza/hero-poster.png"
                                        alt="Fachada Grand Palace"
                                        className="w-full h-auto shadow-[30px_-30px_0px_0px_rgba(197,164,126,0.2)]"
                                    />
                                </div>
                                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-stone-100 -z-0" />
                            </div>

                            <div className="lg:w-1/2">
                                <span className="text-bronze-600 font-bold tracking-[0.2em] text-xs uppercase mb-6 block flex items-center gap-4">
                                    <span className="w-10 h-[1px] bg-bronze-600"></span>
                                    Conceito Único
                                </span>
                                <h2 className="text-4xl md:text-6xl font-serif text-stone-900 mb-8 leading-tight">
                                    Onde a elegância encontra a <span className="italic text-bronze-600">exclusividade</span>.
                                </h2>
                                <p className="text-stone-600 text-lg leading-relaxed mb-8 font-light">
                                    O Grand Palace não é apenas um empreendimento, é um manifesto de sofisticação.
                                    Cada traço da arquitetura foi pensado para proporcionar uma experiência de vida inigualável,
                                    unindo a tranquilidade de um refúgio particular com a pulsação da cidade.
                                </p>

                                <div className="grid grid-cols-2 gap-8 mb-10">
                                    <div>
                                        <p className="text-4xl font-serif text-stone-900 mb-2">{project.specs.area}<span className="text-xl">m²</span></p>
                                        <p className="text-xs uppercase tracking-widest text-stone-500">Área Privativa</p>
                                    </div>
                                    <div>
                                        <p className="text-4xl font-serif text-stone-900 mb-2">{project.specs.suites}</p>
                                        <p className="text-xs uppercase tracking-widest text-stone-500">Suítes Plenas</p>
                                    </div>
                                </div>

                                <button className="text-bronze-600 font-bold uppercase tracking-widest text-sm flex items-center gap-2 group">
                                    Baixar Brochure
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Detailed Amenities Grid */}
                <section className="py-32 bg-stone-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <h2 className="text-4xl font-serif text-stone-900 mb-6">Amenidades & Diferenciais</h2>
                            <p className="text-stone-500 font-light">Uma infraestrutura de lazer e serviços comparável aos melhores hotéis 5 estrelas do mundo.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {facilities.map((item, i) => (
                                <div key={i} className="bg-white p-10 hover:shadow-xl transition-shadow duration-300 border border-stone-100 group">
                                    <div className="mb-6 text-bronze-500 group-hover:text-stone-900 transition-colors">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-serif text-stone-900 mb-3">{item.label}</h3>
                                    <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Immersive Gallery */}
                <section className="py-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {galleryImages.map((img, i) => (
                            <div key={i} className="relative aspect-square group overflow-hidden cursor-pointer">
                                <img
                                    src={img}
                                    alt={`Gallery ${i}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-colors duration-300 flex items-center justify-center">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 uppercase tracking-widest text-xs font-bold border border-white px-6 py-3">
                                        Ampliar
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Technical Specs Table */}
                <section className="py-32 bg-stone-900 text-white">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row gap-20">
                            <div className="lg:w-1/3">
                                <h2 className="text-4xl font-serif mb-6">Ficha Técnica</h2>
                                <p className="text-stone-400 mb-10 leading-relaxed">
                                    Detalhes precisos para quem exige excelência. Cada especificação reflete nosso compromisso com a qualidade construtiva.
                                </p>
                                <div className="p-8 bg-stone-800 border border-stone-700">
                                    <h3 className="text-bronze-400 font-serif text-2xl mb-4">Plantas Personalizáveis</h3>
                                    <p className="text-stone-400 text-sm mb-6">
                                        Opções de layout que se adaptam ao seu estilo de vida. Cozinha integrada ou fechada, home office ou banho senhor/a.
                                    </p>
                                    <button className="w-full py-4 border border-stone-600 hover:border-bronze-500 hover:text-bronze-400 transition-all uppercase tracking-widest text-xs font-bold">
                                        Ver Plantas (PDF)
                                    </button>
                                </div>
                            </div>

                            <div className="lg:w-2/3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                    {[
                                        { label: "Endereço", value: project.location },
                                        { label: "Área do Terreno", value: "2.500m²" },
                                        { label: "Total de Unidades", value: "48 Unidades Exclusivas" },
                                        { label: "Torres", value: "Torre Única" },
                                        { label: "Elevadores", value: "3 Sociais + 1 Serviço" },
                                        { label: "Projeto Arquitetônico", value: "Studio Trinova" },
                                        { label: "Projeto Paisagístico", value: "Green Design" },
                                        { label: "Previsão de Entrega", value: "Dezembro/2026" },
                                    ].map((spec, i) => (
                                        <div key={i} className="flex justify-between items-center border-b border-stone-800 py-4">
                                            <span className="text-stone-500 uppercase tracking-widest text-xs">{spec.label}</span>
                                            <span className="font-serif text-lg">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-32 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto bg-stone-50 p-12 md:p-20 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-bronze-100 rounded-bl-full -mr-16 -mt-16 opacity-50" />

                            <div className="relative z-10 text-center">
                                <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-8">
                                    Seu novo legado começa aqui.
                                </h2>
                                <p className="text-stone-600 text-lg mb-12 max-w-xl mx-auto">
                                    Agende uma apresentação privada com nossos consultores sênior e descubra condições especiais de lançamento.
                                </p>

                                <form className="max-w-md mx-auto space-y-4 mb-12">
                                    <div className="relative">
                                        <input type="text" placeholder="Nome Completo" className="w-full p-4 bg-white border border-stone-200 focus:outline-none focus:border-bronze-500 transition-colors placeholder:text-stone-300" />
                                    </div>
                                    <div className="relative">
                                        <input type="email" placeholder="E-mail Principal" className="w-full p-4 bg-white border border-stone-200 focus:outline-none focus:border-bronze-500 transition-colors placeholder:text-stone-300" />
                                    </div>
                                    <button className="w-full py-5 bg-stone-900 text-white font-bold uppercase tracking-widest hover:bg-bronze-500 transition-all duration-300 shadow-lg">
                                        Solicitar Contato VIP
                                    </button>
                                </form>

                                <div className="flex items-center justify-center gap-2 text-stone-400 text-sm">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>Seus dados estão protegidos.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />

            {/* Floating Whatsapp */}
            <a
                href="#"
                className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-[#25D366]/40"
                aria-label="Fale no Whatsapp"
            >
                <MessageCircle className="w-8 h-8" />
            </a>
        </div>
    );
};

export default GrandPalace;
