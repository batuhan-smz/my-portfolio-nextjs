// src/components/ProjectCard.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IProject } from '../../types/projects';
import { ArrowUpRight, Github } from 'lucide-react';
import { GlowEffect } from '../../components/ui/glow-effect'; // <<< GlowEffect import edildi
import { cn } from '../../lib/utils';

interface ProjectCardProps {
  project: IProject;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className }) => {
  return (
    // Ana Kart Konteyneri - Glow için relative olmalı
    <div
      id={`project-${project.id}`}
      className={cn(
          "relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 group", // Daha belirgin köşe ve gölge
          "scroll-mt-24 md:scroll-mt-28", // Scroll margin
          className
      )}
    >
      {/* Glow Efekti - Arka Planda */}
      <GlowEffect
         // className="opacity-15 dark:opacity-10 group-hover:opacity-25 dark:group-hover:opacity-15 transition-opacity duration-300" // Opaklık ve hover efekti
         className="opacity-25 dark:opacity-20" // Başlangıç opaklığı
         // Kendi renklerini veya tema renklerini kullanabilirsin
         colors={['#0ea5e9', '#a78bfa', '#f472b6']} // Örnek: sky, violet, pink
         mode="breathe" // Diğer modlar: 'rotate', 'pulse', 'static' etc.
         blur="strong" // Daha belirgin blur
         scale={1.2} // Biraz daha büyük scale
         duration={10} // Daha yavaş animasyon
      />

      {/* Asıl İçerik - Glow'un üzerinde durması için relative z-10 */}
      <div className="relative z-10 flex flex-col h-full bg-white dark:bg-gray-800/95 backdrop-blur-sm rounded-lg"> {/* İçeriğe de hafif blur ve arkaplan */}

          {/* Resim Alanı */}
          {project.imageUrl && (
              <Link href={`/projects/${project.id}`} className="block overflow-hidden aspect-video">
                  <Image
                      src={project.imageUrl}
                      alt={project.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" // Gruba hover ile scale
                  />
              </Link>
          )}

          {/* Metin ve Linkler Alanı */}
          <div className="p-5 flex flex-col flex-grow">
              <Link href={`/projects/${project.id}`}>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                  </h3>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">
                  {project.description?.substring(0, 100)}
                  {project.description && project.description.length > 100 ? '...' : ''}
              </p>
              {project.technologies && project.technologies.length > 0 && (
                  <div className="mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                          <span key={index} className="inline-block bg-gray-100 dark:bg-gray-700 rounded-full px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-300 mr-2 mb-1">
                              {tech}
                          </span>
                      ))}
                      {/* ... (daha fazla etiket gösterimi) ... */}
                  </div>
              )}
              <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <Link href={`/projects/${project.id}`} className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400 inline-flex items-center">
                     Detaylar <ArrowUpRight className="ml-1 h-3 w-3"/>
                  </Link>
                  <div className="flex space-x-2">
                      {project.projectUrl && ( <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" title="Projeyi Ziyaret Et" className="text-gray-400 hover:text-gray-700 dark:hover:text-white"><ArrowUpRight className="h-4 w-4"/></a> )}
                      {project.repoUrl && ( <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" title="GitHub Reposu" className="text-gray-400 hover:text-gray-700 dark:hover:text-white"><Github className="h-4 w-4"/></a> )}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ProjectCard;