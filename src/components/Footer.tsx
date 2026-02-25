import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contato" className="bg-primary-900 text-secondary-300 py-20 border-t border-primary-800">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-20">

          {/* Brand - Big Typography */}
          <div className="lg:w-1/3">
            <img src="/bernardo-concept-logo.webp" alt="Bernardo Concept" className="h-16 mb-6 rounded-md" />
            <p className="text-primary-200 text-sm leading-relaxed max-w-xs mb-8">
              Especialistas em ambientes planejados exclusivos e de alto padrão.
              Criando espaços que inspiram a vida contemporânea.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/bernardoconcept" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-wider text-white hover:text-primary-400 transition-colors">
                Instagram
              </a>
              <a href="https://facebook.com/bernardoconcept" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-wider text-white hover:text-primary-400 transition-colors">
                Facebook
              </a>
              <a href="https://linkedin.com/company/bernardo-concept" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-wider text-white hover:text-primary-400 transition-colors">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Clean Links Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:w-2/3">
            <div>
              <h4 className="text-white font-serif text-lg mb-6">Empresa</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Manifesto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Equipe</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Imprensa</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-serif text-lg mb-6">Unidades</h4>
              <ul className="space-y-4 text-sm mt-2">
                <li className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-primary-300 mb-1">Pinheiros/SP</span>
                  <span className="text-white hover:text-primary-400 cursor-pointer transition-colors leading-relaxed">
                    Av. Pedroso de Morais, 2616<br />Alto de Pinheiros, São Paulo - SP<br />05420-003
                  </span>
                </li>
                <li className="flex flex-col mt-4">
                  <span className="text-xs uppercase tracking-wider text-primary-300 mb-1">Campinas/SP</span>
                  <span className="text-white hover:text-primary-400 cursor-pointer transition-colors leading-relaxed">
                    Av. Dr. Jesuíno Marcondes Machado, 70<br />Nova Campinas, Campinas - SP<br />13092-108
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-serif text-lg mb-6">Atendimento</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-primary-300 mb-1">WhatsApp</span>
                  <a href="https://wa.me/5511934958288" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-400 cursor-pointer transition-colors">+55 11 93495-8288</a>
                </li>
                <li className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-primary-300 mb-1">Email</span>
                  <span className="text-white hover:text-primary-400 cursor-pointer transition-colors">contato@bernardoconcept.com.br</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-primary-400 font-medium tracking-wider">
          <p>© 2026 Bernardo Concept.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="https://www.bluedigitalhub.com.br" target="_blank" rel="noopener noreferrer" className="flex items-center group opacity-80 hover:opacity-100 transition-opacity">

              <span className="font-bold text-sm text-white">BlueDigital<span className="font-light text-white">Hub</span></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;