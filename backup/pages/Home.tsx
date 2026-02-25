import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SearchFilter from '../components/SearchFilter';
import Portfolio from '../components/Portfolio';
import Features from '../components/Features';
import Footer from '../components/Footer';
import { MessageCircle } from 'lucide-react';

const Home: React.FC = () => {
    const handleSearch = (filters: any) => {
        console.log("Searching with filters:", filters);
        const portfolioSection = document.getElementById('empreendimentos');
        if (portfolioSection) {
            portfolioSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-secondary-50 font-sans text-secondary-900 selection:bg-primary-200 selection:text-primary-900">
            <Navbar />

            <main>
                <Hero />

                {/* Search Filter - Floating overlap between Hero and Content */}
                <SearchFilter onSearch={handleSearch} />

                <Portfolio />
                <Features />

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
                            Nossos consultores estão à disposição para apresentar os detalhes que tornam cada projeto único.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <button className="px-10 py-5 bg-white text-primary-900 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-primary-500 hover:text-white transition-all duration-300">
                                Solicitar Contato
                            </button>
                            <button className="px-10 py-5 border border-primary-700 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:border-white hover:bg-white hover:text-primary-900 transition-all duration-300">
                                Whatsapp
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            {/* Elegant Floating Button */}
            <a
                href="#"
                className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-primary-600 text-white rounded-full flex items-center justify-center transition-all duration-500 hover:bg-primary-500 hover:scale-105 shadow-2xl hover:shadow-primary-600/50 border border-primary-500"
                aria-label="Fale conosco"
            >
                <MessageCircle className="w-6 h-6" />
            </a>
        </div>
    );
};

export default Home;
