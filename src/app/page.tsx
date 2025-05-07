"use client";
import React, { useState, useEffect } from 'react';
import { IProject } from "../types/projects";
import { getProjects } from '../services/projectService';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Image from 'next/image';
import ProjectCard from '../components/ui/ProjectCard';
import {AnimatedTestimonials} from '../components/ui/animated-testimonials';

export default function Home() {
   // Projeleri tutacak state (başlangıçta boş dizi)
   const [projects, setProjects] = useState<IProject[]>([]);
   // Yüklenme durumunu tutacak state (başlangıçta true)
   const [loading, setLoading] = useState<boolean>(true);
   // Hata mesajını tutacak state (başlangıçta null)
   const [error, setError] = useState<string | null>(null);
 
   // Bileşen yüklendiğinde projeleri çekmek için useEffect kullanıyoruz
   useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProjects = await getProjects();
        console.log("COMPONENT: Fetched projects data:", fetchedProjects); // Log 4 <<< getProjects'ten gelen veri

        // Dizi kontrolünü burada da yapalım (sağlama almak için)
        if (Array.isArray(fetchedProjects)) {
            setProjects(fetchedProjects);
        } else {
            console.error("COMPONENT: Servisten dizi olmayan veri geldi:", fetchedProjects);
            setError("Projeler alınırken beklenmedik bir formatla karşılaşıldı.");
            setProjects([]); // Hata durumunda boş diziye ayarla
        }
      } catch (err) {
        console.error("COMPONENT: Error in fetchData:", err);
        setError("Projeler yüklenirken bir hata oluştu...");
        setProjects([]); // Hata durumunda boş diziye ayarla
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

    // Örnek veriyi tanımla (veya başka bir yerden al)
    const testimonialsData = [
      { quote: "Fit kal, sağlıklı yaşa!", name: "Sporcu Batu", designation: "batuhan.semiz", link:"https://www.instagram.com/batuhan.semiz/", src: "/images/SporcuBatu.jpg"},
      { quote: "Part-time herşeyolog😁", name: "Sıradan Batu", designation: "batuhan.semiz", link:"https://www.instagram.com/batuhan.semiz/", src: "/images/SıradanBatu.jpg" }, 
      { quote: "4 teker bedeni 2 teker ruhu taşır.", name: "Motorcu Batu", designation: "ba2vlog", link:"https://www.instagram.com/ba2vlog/", src: "/images/MotorcuBatu.webp" }, 
      { quote: "Tellerin tınısı, hatırlatır bana senle geçen zamanı.", name: "Gitarcı Batu", designation: "ba2gitar", link:"https://www.instagram.com/ba2gitar/", src: "/images/GitarcıBatu.jpg" },
      //{ quote: "Yeni projler beni bekler.", name: "Cyber Batu", designation: "batuhan.semiz", link:"https://www.instagram.com/batuhan.semiz/", src: "/images/GitarcıBatu.jpg" },  
      // ...
    ];

  // --- Render Logic ---

  // Yükleniyorsa...
  if (loading) {
    return (
      // Spinner'ı sayfanın ortasında göstermek için sarmalayıcı div
      // min-h-[calc(100vh-XXXpx)] ile Navbar ve Footer yüksekliğini hesaba katarak dikey ortalama
      // XXX yerine Navbar + Footer'ın yaklaşık toplam yüksekliğini piksel olarak yazın
      // Örneğin Navbar 80px, Footer 100px ise, XXX = 180px
      <div className="flex flex-grow flex-col justify-center items-center min-h-[calc(100vh-200px)]"> {/* Örnek min yükseklik */}
        <LoadingSpinner size={64} text="Projeler Yükleniyor..." /> {/* Boyut ve yazı özelleştirilebilir */}
      </div>
    );
  }

  // Hata varsa...
  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  // Yükleme bitti ve hata yoksa projeleri göster
  return (
    <div>
      {/* Yeni Testimonials Bölümü */}
      <section className="py-12 md:py-20"> {/* Bölümler arasına boşluk */}
         <h2 className="text-3xl font-bold text-center mb-10">Batuhan Semiz&apos;s Portfolyo</h2>
         <AnimatedTestimonials testimonials={testimonialsData} autoplay={true} />
      </section>

      {/* Hakkımda Bölümü Başlangıcı */}
        <section
          id="hakkimda" // Scroll için ID
          className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800/50 scroll-mt-20 md:scroll-mt-24 rounded-lg" // Arkaplan, padding ve scroll margin
        >
          <div className="container mx-auto px-4">
            {/* Bölüm Başlığı */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 text-gray-900 dark:text-white">
              Hakkımda
            </h2>

            {/* İçerik Alanı (Grid ile resim ve yazı yan yana - opsiyonel) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center max-w-5xl mx-auto"> {/* Max genişlik ve ortalama */}

              {/* Profil Resmi Alanı (Opsiyonel - İstersen bu div'i kaldırabilirsin) */}
              <div className="flex justify-center md:justify-end">
                {/*
                  // Eğer profil resmi kullanacaksan:
                  // 1. Resmi public/images/ klasörüne koy (örn: profile.jpg)
                  // 2. next/image'i import et: import Image from 'next/image';
                  // 3. Hostname'i next.config.mjs'e eklemene gerek yok (public içinde olduğu için)*/
                  <Image
                    src="/images/SıradanBatu.jpg" // public klasörüne göre yol
                    alt="Profil Resmim"
                    width={250} // İstediğin boyut
                    height={250} // İstediğin boyut
                    className="rounded-full shadow-lg object-cover w-[180px] h-[180px] md:w-[250px] md:h-[250px]" // Boyut ve stil
                    priority // Sayfanın üst kısımlarındaysa 'priority' eklemek iyi olabilir
                  />
                }
              </div>

              {/* Metin Alanı */}
              <div className="md:col-span-2 text-center md:text-left">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                  Merhaba! Ben Batuhan Semiz
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {/* Kendini anlatan 1-2 paragraf. Yeteneklerin, tutkuların, hedeflerin... */}
                  Backend ve Frontend teknolojilerine ilgi duyan, sürekli öğrenmeyi seven bir geliştiriciyim. Özellikle React, Next.js ve Node.js ekosistemlerinde modern ve ölçeklenebilir uygulamalar geliştirmekten keyif alıyorum.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {/* İkinci paragraf veya ek bilgiler... */}
                  Temiz kod yazmaya, kullanıcı deneyimine ve performans optimizasyonlarına önem veririm. Aşağıdaki teknolojilerle aktif olarak çalışıyorum:
                </p>

                {/* Yetenekler/Teknolojiler (Opsiyonel) */}
                <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">React</span>
                  <span className="bg-sky-100 text-sky-800 text-xs font-medium px-3 py-1 rounded-full dark:bg-sky-900 dark:text-sky-300">Next.js</span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full dark:bg-green-900 dark:text-green-300">Node.js</span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full dark:bg-yellow-900 dark:text-yellow-300">TypeScript</span>
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full dark:bg-purple-900 dark:text-purple-300">Tailwind CSS</span>
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full dark:bg-red-900 dark:text-red-300">Firebase</span>
                  {/* İstediğin kadar ekle/çıkar */}
                </div>

                {/* Sosyal Medya Linkleri (Opsiyonel) */}
                {/*
                <div className="mt-8 flex justify-center md:justify-start space-x-5">
                    // İkonları lucide-react'tan import et: import { Linkedin, Github, Twitter } from 'lucide-react';
                    <a href="[LinkedIn URL]" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-500 hover:text-blue-700 dark:hover:text-blue-500 transition-colors"><Linkedin size={24} /></a>
                    <a href="[GitHub URL]" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"><Github size={24} /></a>
                    <a href="[Twitter URL]" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-500 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"><Twitter size={24} /></a>
                </div>
                */}

              </div>

            </div>
          </div>
        </section>
      {/* Hakkımda Bölümü Sonu */}

      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-12 md:mb-16 mt-16">
        Projelerim
      </h2>
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">Gösterilecek proje bulunamadı.</p>
      )}
    </div>
  );
};

