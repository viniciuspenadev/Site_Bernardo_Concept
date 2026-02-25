import React from 'react';
import { Award, CheckCircle2, ShieldCheck, PenTool } from 'lucide-react';

const TRUST_INDICATORS = [
  {
    icon: Award,
    value: "+10",
    label: "Anos no Mercado",
    description: "Tradição em alto padrão"
  },
  {
    icon: CheckCircle2,
    value: "+500",
    label: "Ambientes Entregues",
    description: "Clientes 100% satisfeitos"
  },
  {
    icon: ShieldCheck,
    value: "5 Anos",
    label: "Garantia Total",
    description: "Segurança e durabilidade"
  },
  {
    icon: PenTool,
    value: "100%",
    label: "Fabricação Própria",
    description: "Controle de qualidade rígido"
  }
];

const TrustIndicators: React.FC = () => {
  return (
    <div className="relative z-30 container mx-auto px-4 lg:px-12 -mt-16 mb-20">
      <div className="bg-white/90 backdrop-blur-xl shadow-2xl shadow-primary-900/10 p-6 lg:p-10 rounded-3xl border border-white/60">

        {/* Indicators Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-4 divide-x divide-primary-100">

          {TRUST_INDICATORS.map((indicator, index) => {
            const IconComponent = indicator.icon;
            return (
              <div
                key={index}
                className="flex flex-col lg:flex-row items-center justify-center text-center lg:text-left px-2 lg:px-6 group pt-2 lg:pt-0 gap-3 lg:gap-5"
              >
                {/* Animated Icon Circle */}
                <div className="w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500 ease-in-out transform group-hover:-translate-y-1 group-hover:shadow-lg">
                  <IconComponent className="w-5 h-5 lg:w-5 lg:h-5 stroke-[1.5px]" />
                </div>

                {/* Text Container */}
                <div className="flex flex-col items-center lg:items-start">
                  {/* Animated Value */}
                  <h3 className="text-xl lg:text-2xl font-serif font-bold text-primary-900 mb-0.5 group-hover:text-primary-700 transition-colors duration-300">
                    {indicator.value}
                  </h3>

                  {/* Labels */}
                  <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-primary-500 leading-tight">
                    {indicator.label}
                  </span>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;