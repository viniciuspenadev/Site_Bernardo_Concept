import React from 'react';
import { Search } from 'lucide-react';

interface SearchFilterProps {
  onSearch: (filters: any) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
  return (
    <div className="relative z-30 container mx-auto px-4 lg:px-12 -mt-16 mb-20">
      <div className="bg-white/80 backdrop-blur-xl shadow-soft-lg p-8 rounded-4xl border border-white/50">
        <div className="flex flex-col lg:flex-row gap-8 items-end">

          {/* Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">

            <div className="flex flex-col border-b border-primary-200 pb-2 hover:border-primary-500 transition-colors group">
              <label className="text-[10px] font-bold text-primary-400 uppercase tracking-widest mb-2 group-hover:text-primary-700">Localização</label>
              <select className="bg-transparent border-none text-secondary-800 font-serif text-lg p-0 focus:ring-0 cursor-pointer outline-none w-full appearance-none">
                <option>Jardins, SP</option>
                <option>Vila Nova</option>
                <option>Itaim Bibi</option>
                <option>Fazenda Boa Vista</option>
              </select>
            </div>

            <div className="flex flex-col border-b border-primary-200 pb-2 hover:border-primary-500 transition-colors group">
              <label className="text-[10px] font-bold text-primary-400 uppercase tracking-widest mb-2 group-hover:text-primary-700">Tipo de Imóvel</label>
              <select className="bg-transparent border-none text-secondary-800 font-serif text-lg p-0 focus:ring-0 cursor-pointer outline-none w-full appearance-none">
                <option>Todos os tipos</option>
                <option>Apartamento</option>
                <option>Penthouse</option>
                <option>Casa de Campo</option>
              </select>
            </div>

            <div className="flex flex-col border-b border-primary-200 pb-2 hover:border-primary-500 transition-colors group">
              <label className="text-[10px] font-bold text-primary-400 uppercase tracking-widest mb-2 group-hover:text-primary-700">Investimento</label>
              <select className="bg-transparent border-none text-secondary-800 font-serif text-lg p-0 focus:ring-0 cursor-pointer outline-none w-full appearance-none">
                <option>Sem limite</option>
                <option>Minha Casa Minha Vida</option>
                <option>Até R$ 500 Mil</option>
                <option>Acima de R$ 1 Milhão</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={() => onSearch({})}
            className="w-full lg:w-auto px-10 py-5 bg-primary-600 text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300 flex items-center justify-center gap-3 shrink-0"
          >
            <Search className="w-4 h-4" />
            Buscar Imóveis
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;