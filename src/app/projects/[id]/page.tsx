// src/app/projects/[id]/page.tsx
"use client"; // Hook'ları kullanacağımız için client component

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // <<< Next.js App Router'dan useParams
import Link from 'next/link'; // Next.js Link
import Image from 'next/image'; // Next.js Image
import { getProjectById } from '../../../services/projectService'; // Servis fonksiyonu (yolu kontrol et)
import { IProject } from '../../../types/projects'; // Proje tipi (yolu kontrol et)
import LoadingSpinner from '../../../components/ui/LoadingSpinner'; // Yükleme animasyonu (yolu kontrol et)
import { ArrowUpRight, Github, ArrowLeft } from 'lucide-react'; // İkonlar

export default function ProjectDetailPage() {
  // Dinamik segmentten (klasör adı [id]) parametreyi al
  const params = useParams();
  const projectId = params.id as string; // Genellikle string gelir, tip güvencesi için 'as string'

  const [project, setProject] = useState<IProject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Sadece projectId varsa ve geçerliyse veri çek
    if (projectId) {
      const fetchProject = async () => {
        setLoading(true);
        setError(null);
        setProject(null); // Önceki veriyi temizle
        try {
          const fetchedProject = await getProjectById(projectId);
          if (fetchedProject) {
            setProject(fetchedProject);
          } else {
            setError("Proje bulunamadı.");
          }
        } catch (err) {
          console.error(`Error fetching project ${projectId}:`, err);
          setError("Proje yüklenirken bir hata oluştu.");
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    } else {
        // Eğer ID yoksa (teorik olarak olmamalı) yüklemeyi durdur ve hata ver
        setLoading(false);
        setError("Proje ID'si alınamadı.");
    }
  }, [projectId]); // projectId değiştiğinde tekrar çalışır

  // --- Render Logic ---

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <LoadingSpinner size={64} text="Proje Detayları Yükleniyor..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>{error}</p>
        <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">Ana Sayfaya Dön</Link>
      </div>
    );
  }

  if (!project) {
    // Bu durum genellikle error state'i tarafından yakalanır ama yine de kontrol edelim
    return (
       <div className="text-center text-gray-500 mt-10">
        <p>Proje bulunamadı.</p>
        <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">Ana Sayfaya Dön</Link>
      </div>
    );
  }

  // Proje verisi başarıyla yüklendiyse detayları göster
  return (
    <article className="max-w-4xl mx-auto px-4 py-8"> {/* Sayfa içeriği konteyneri */}
        {/* Geri Dön Linki */}
        <Link href="/" className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tüm Projelere Dön
        </Link>

        {/* Proje Başlığı */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {project.title}
        </h1>

        {/* Proje Resmi (varsa) */}
        {project.imageUrl && (
            <div className="my-8 shadow-lg rounded-lg overflow-hidden">
                 <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={1200} // Daha büyük resim için boyutları ayarla
                    height={675} // 16:9 oranını koru (isteğe bağlı)
                    className="w-full h-auto object-cover" // Resim stili
                    priority // Önemli resimler için (LCP'yi iyileştirebilir)
                 />
            </div>
        )}

        {/* Açıklama */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
               {project.description?.split('\n').map((paragraph, index) => {
              // Eğer paragraf sadece boşluklardan oluşuyorsa (örn: \n\n sonucu oluşan boş string)
              // bir non-breaking space içeren bir <p> render et.
              // Bu, prose sınıflarının margin'leri sayesinde boş bir satır gibi görünecektir.
              if (paragraph.trim() === '') {
                return <p key={index}>&nbsp;</p>;
              }
              // Dolu paragraflar için normal render.
              return <p key={index}>{paragraph}</p>;
            })}
        </div>


        {/* Teknolojiler */}
        {project.technologies && project.technologies.length > 0 && (
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Kullanılan Teknolojiler</h3>
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                        <span key={index} className="bg-sky-100 text-sky-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-sky-900 dark:text-sky-300">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        )}

        {/* Linkler */}
        <div className="flex flex-wrap gap-4">
             {project.projectUrl && (
                <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                    Projeyi Ziyaret Et
                    <ArrowUpRight className="ml-2 h-4 w-4"/>
                </a>
             )}
             {project.repoUrl && (
                <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-700 text-white text-sm font-medium rounded-md hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 transition-colors"
                >
                    GitHub Reposu
                    <Github className="ml-2 h-4 w-4"/>
                </a>
             )}
        </div>

    </article>
  );
}

// İsteğe Bağlı: Dinamik Metadata (SEO için)
// Eğer her proje için ayrı başlık/açıklama istersen:
/*
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id
  // Projeyi fetch et (burada API'den tekrar çekmek gerekebilir veya build time'da oluşturulabilir)
  const project = await getProjectById(id); // Bu fonksiyonun server'da çalışabilir olması lazım

  return {
    title: project ? `${project.title} | Portföyüm` : 'Proje Detayı',
    description: project ? project.description?.substring(0, 150) : 'Proje detayı sayfası',
  }
}
*/