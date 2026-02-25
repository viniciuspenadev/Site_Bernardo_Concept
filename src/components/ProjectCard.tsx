"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '../types';
import { ArrowUpRight, MessageCircle } from 'lucide-react';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const router = useRouter();

    return (
        <div className="group relative flex flex-col w-full aspect-[3/4] md:aspect-[3/4] min-h-[420px] md:min-h-0 bg-primary-900 rounded-3xl overflow-hidden shadow-soft cursor-pointer transition-all hover:shadow-2xl">

            {/* Background Image - Full Bleed */}
            <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
            />

            {/* Gradient Overlay for Text Readability - Bottom Only */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"></div>

            {/* Top Badges */}
            <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-10">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/10 text-white backdrop-blur-md border border-white/20 shadow-sm">
                    {project.category}
                </span>

                {project.price && project.price !== 'Sob Consulta' && (
                    <span className="text-white text-xs font-serif font-medium drop-shadow-md bg-primary-900/50 px-3 py-1 rounded-full backdrop-blur-md">
                        {project.price}
                    </span>
                )}
            </div>

            {/* Content Section - Overlaid on Image */}
            <div className="relative z-10 flex flex-col flex-grow justify-end p-6 md:p-8">

                {/* Header Segment */}
                <div className="mt-auto mb-2">
                    <h3 className="text-2xl md:text-3xl font-serif text-white group-hover:text-primary-200 transition-colors leading-tight drop-shadow-md">
                        {project.title}
                    </h3>
                </div>

                {/* Concept / Description */}
                <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-light line-clamp-2 md:line-clamp-3 mb-6 drop-shadow-sm">
                    {project.description}
                </p>

            </div>
        </div>
    );
};

export default ProjectCard;