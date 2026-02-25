import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contato" className="bg-primary-900 text-secondary-300 py-20 border-t border-primary-800">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-20">

          {/* Brand - Big Typography */}
          <div className="lg:w-1/3">
            <img src="/Logo_trinova.svg" alt="TRINOVA" className="h-14 mb-6 brightness-0 invert" />
            <p className="text-primary-200 text-sm leading-relaxed max-w-xs mb-8">
              Desenvolvimento imobiliário de alto padrão.
              Criando espaços que inspiram a vida urbana contemporânea desde 2008.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'Facebook', 'LinkedIn'].map(social => (
                <a key={social} href="#" className="text-xs font-bold uppercase tracking-wider text-white hover:text-primary-400 transition-colors">
                  {social}
                </a>
              ))}
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
              <h4 className="text-white font-serif text-lg mb-6">Coleções</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Urban Living</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Signature Series</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Comercial</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-serif text-lg mb-6">Atendimento</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-primary-300 mb-1">Telefone</span>
                  <span className="text-white hover:text-primary-400 cursor-pointer transition-colors">+55 11 3090-0000</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-primary-300 mb-1">Email</span>
                  <span className="text-white hover:text-primary-400 cursor-pointer transition-colors">concierge@trinova.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-primary-400 font-medium uppercase tracking-wider">
          <p>© 2024 TRINOVA Inc.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacidade</a>
            <a href="#" className="hover:text-white">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;