import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Project, ConstructionStage } from '../types';
import { Icons } from './IconHelper';
import { MoveRight, ArrowUpRight, MessageCircle, CheckCircle2 } from 'lucide-react';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const navigate = useNavigate();
    const isMCMV = project.tags?.includes('Minha Casa Minha Vida');

    // Defines the stages order and their specific icons
    const stages: { label: ConstructionStage; icon: React.ReactNode }[] = [
        { label: 'Fundação', icon: <Icons.Brick className="w-3 h-3" /> },
        { label: 'Estrutura', icon: <Icons.Hammer className="w-3 h-3" /> },
        { label: 'Acabamento', icon: <Icons.Paint className="w-3 h-3" /> },
        { label: 'Entrega', icon: <Icons.Key className="w-3 h-3" /> },
    ];

    // Find index of current stage to determine progress
    const currentStageIndex = stages.findIndex(s => s.label === project.currentStage);

    return (
        <div className="group relative flex flex-col w-full bg-transparent cursor-pointer h-full">

            {/* Image Section */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl mb-6 shadow-soft">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                {/* Status Badge */}
                <div className="absolute top-4 left-4 flex flex-col items-start gap-2">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-sm ${project.status === 'Lançamento' ? 'bg-primary-500 text-white' :
                        project.status === 'Em Obras' ? 'bg-white/90 text-primary-900' : 'bg-primary-900 text-white'
                        }`}>
                        {project.status}
                    </span>

                    {/* MCMV Badge */}
                    {isMCMV && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest bg-emerald-700 text-white backdrop-blur-md shadow-sm">
                            <CheckCircle2 className="w-3 h-3" />
                            Minha Casa Minha Vida
                        </span>
                    )}
                </div>

                {/* Floating "Oportunidade" - More Minimal & Elegant */}
                <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-soft-lg group-hover/price:shadow-xl transition-all duration-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-primary-600 font-bold mb-0.5">Oportunidade</p>
                                <span className="text-secondary-900 font-serif text-xl font-medium">
                                    {project.financingCondition || project.price}
                                </span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                                <MoveRight className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-grow px-2 py-2">
                <div className="mb-3">
                    <h3 className="text-3xl font-serif text-secondary-900 group-hover:text-primary-700 transition-colors leading-tight">
                        {project.title}
                    </h3>
                </div>

                <p className="text-xs font-medium text-secondary-500 uppercase tracking-widest mb-5 flex items-center gap-2">
                    <Icons.MapPin className="w-3.5 h-3.5 text-primary-400" />
                    {project.location}
                </p>

                <div className="flex gap-6 text-secondary-600 text-sm mb-8 border-b border-secondary-100 pb-6 font-sans">
                    <span className="flex items-center gap-2" title="Área">
                        <Icons.Ruler className="w-4 h-4 text-primary-500" />
                        <span className="font-medium">{project.specs.area} m²</span>
                    </span>
                    <span className="flex items-center gap-2" title="Quartos">
                        <Icons.Bed className="w-4 h-4 text-primary-500" />
                        <span className="font-medium">{project.specs.bedrooms}</span>
                    </span>
                    <span className="flex items-center gap-2" title="Vagas">
                        <Icons.Car className="w-4 h-4 text-primary-500" />
                        <span className="font-medium">{project.specs.parking}</span>
                    </span>
                </div>

                {/* --- UNIVERSAL TIMELINE (Visible for all statuses) --- */}
                <div className="mt-auto">
                    <p className="text-xs text-stone-400 uppercase tracking-widest font-bold mb-3">Status da Obra</p>

                    <div className="relative flex items-center justify-between">
                        {/* Background Line */}
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-secondary-200 -z-10"></div>

                        {/* Progress Line */}
                        <div
                            className="absolute top-1/2 left-0 h-[1px] bg-primary-500 -z-10 transition-all duration-1000"
                            style={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
                        ></div>

                        {/* Steps */}
                        {stages.map((stage, index) => {
                            const isActive = index === currentStageIndex;
                            const isCompleted = index < currentStageIndex;
                            // For completed projects, all dots should appear completed or active
                            const isFinished = project.status === 'Pronto para Morar';
                            const showAsCompleted = isCompleted || (isFinished && index <= currentStageIndex);

                            return (
                                <div key={index} className="flex flex-col items-center gap-2 relative">
                                    {/* The Dot/Icon Container */}
                                    <div className={`relative flex items-center justify-center rounded-full transition-all duration-500 z-10 
                                ${isActive ? 'w-8 h-8 bg-primary-600 text-white shadow-lg shadow-primary-500/30' :
                                            showAsCompleted ? 'w-5 h-5 bg-primary-800 text-white' :
                                                'w-4 h-4 bg-secondary-100 text-secondary-300 border border-secondary-200'
                                        }`}>

                                        {/* Pulse Effect for Active */}
                                        {isActive && !isFinished && (
                                            <div className="absolute inset-0 rounded-full bg-primary-400 animate-ping opacity-75"></div>
                                        )}

                                        {/* Icons */}
                                        {isActive ? (
                                            stage.icon
                                        ) : showAsCompleted ? (
                                            <Icons.Check className="w-3 h-3" />
                                        ) : (
                                            <div className="w-1 h-1 rounded-full bg-secondary-300"></div>
                                        )}
                                    </div>

                                    {/* Label - Visible for active */}
                                    {isActive && (
                                        <span className="text-[9px] uppercase tracking-wider font-bold absolute top-10 whitespace-nowrap text-bronze-600">
                                            {stage.label}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    {/* Spacer for labels */}
                    <div className="h-6"></div>
                </div>

                {/* Dual Actions CTA - Priorities Swapped */}
                <div className="mt-6 pt-2 grid grid-cols-2 gap-3">
                    {/* Secondary: View Site */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (project.id === 4) {
                                navigate('/grand-palace');
                            }
                        }}
                        className="flex items-center justify-center gap-2 border border-secondary-200 text-secondary-600 text-[10px] font-bold uppercase tracking-widest hover:border-primary-500 hover:text-primary-700 transition-all rounded-full group/btn py-4"
                    >
                        Ver Detalhes
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>

                    {/* Primary: Talk to Broker (Highlighted) */}
                    <button className="flex items-center justify-center gap-2 bg-primary-700 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary-600 transition-all rounded-full shadow-lg shadow-primary-700/20 group/chat py-4">
                        <MessageCircle className="w-3.5 h-3.5 group-hover/chat:scale-110 transition-transform" />
                        Consultor
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProjectCard;