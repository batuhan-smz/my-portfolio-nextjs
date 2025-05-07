// src/components/CustomNavbar.tsx
// (Giriş Animasyonu ve Veri Yükleme Senkronizasyonu Entegre Edilmiş Hali)
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion'; // Sadece framer-motion kullanacağız
import { getProjects  } from '../../services/projectService'; // Yolu kontrol et
import { IProject } from '../../types/projects'; // IProject kullanıyoruz
import { CodeXml, Mail, Languages, FolderKanban } from 'lucide-react';
import { cn } from '../../lib/utils'; // Yolu kontrol et

const CustomNavbar: React.FC = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Yükleme state'i önemli

  useEffect(() => {
    const fetchNavbarProjects = async () => {
      try {
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
      } catch (err) { console.error("Navbar proje fetch hatası:", err); }
      finally { setLoading(false); } // Yükleme bitince state'i güncelle
    };
    // Sayfa yüklendikten kısa süre sonra veriyi çekmeye başla (isteğe bağlı)
    const timer = setTimeout(fetchNavbarProjects, 150); // Hafif gecikme
    return () => clearTimeout(timer);
    // fetchNavbarProjects(); // Direkt başlatmak için
  }, []);

  const scrollToProject = (projectId: string) => {
      const element = document.getElementById(`project-${projectId}`);
      if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
          console.warn(`Element with id 'project-${projectId}' not found.`);
      }
  };


  // --- Animasyon Variantları (Test Navbar'ından alındı ve gecikmeler ayarlandı) ---
  const startDelay = 0.1; // Animasyonların başlaması için genel gecikme (loading false olduktan sonra)

  const logoContainerVariants = {
    hidden: { y: -80, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 15, delay: startDelay } }
  };

  const logoItselfVariants = {
    rest: { rotate: 0 },
    spin: { rotate: 360, transition: { delay: startDelay + 0.4, duration: 0.5, ease: 'linear' } }
  };

  const barContainerVariants = {
    hidden: { width: 0, opacity: 0, transition: { duration: 0.3 } },
    // Proje yoksa genişlik auto yerine 0 kalmalı
    visible: (hasProjects: boolean) => ({ // Custom prop alıyor
      width: hasProjects ? 'auto' : 0, // Proje varsa genişle, yoksa 0
      opacity: 1,
      transition: { delay: startDelay + 0.5, duration: 0.4, ease: 'easeOut' }
    })
  };

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: startDelay + 0.7 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };


  return (
    // Ana Konteyner (Konumlandırma)
    <motion.div
      className="fixed top-0 left-1/2 -translate-x-1/2 mt-[20px] z-1000"
      // Bu dış div'in animasyonu yok, içindekiler animate oluyor
    >
      <div className="container flex justify-center">
        {/* Navbar'ın görünen kısmı (Stil ve Layout) */}
        <div className={cn(
            "flex items-center", // Logo ve bar yan yana
            "bg-white/80 dark:bg-gray-900/80",
            "border border-gray-200 dark:border-gray-700/50",
            "backdrop-blur-lg",
            "py-2 pl-2 pr-3 rounded-full shadow-lg",
            "overflow-hidden" // Genişleme animasyonu için önemli
         )}>

          {/* 1. Logo Konteyneri (Düşme animasyonu - loading bitince başlar) */}
          <motion.div
            variants={logoContainerVariants}
            initial="hidden"
            animate={!loading ? "visible" : "hidden"} // Yükleme bitince tetikle
            className="flex-shrink-0 z-10" // Üstte kalması için
          >
            {/* 2. Logonun Kendisi (Dönme animasyonu - loading bitince başlar) */}
            <motion.div
                variants={logoItselfVariants}
                initial="rest"
                animate={!loading ? "spin" : "rest"} // Yükleme bitince tetikle
                className="flex items-center justify-center w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-full text-white shadow" // MAVİ RENK BURADA
                aria-label="Ana Sayfa"
                title="Ana Sayfa"
            >
               <Link href="/" className="flex items-center justify-center w-full h-full">
                  <CodeXml size={20} />
               </Link>
            </motion.div>
          </motion.div>

          {/* 3. Bar Konteyneri (Genişleme animasyonu - loading bitince başlar) */}
          <motion.div
            className="flex items-center overflow-hidden ml-2" // Logodan sonra başla
            variants={barContainerVariants}
            initial="hidden"
            animate={!loading ? "visible" : "hidden"} // Yükleme bitince tetikle
            // 'visible' variantına proje olup olmadığını custom prop olarak gönderiyoruz
            custom={projects.length > 0}
          >
                        {/* Dinamik Proje Scroll Linkleri (Bar içinde, Stagger animasyonlu) */}
            {/* Proje yoksa bu UL hiç render edilmeyecek */}
            {projects.length > 0 && (
              <motion.ul
                className="hidden md:flex items-center"
                variants={listVariants}
                // initial/animate parent'tan geliyor, burası sadece stagger için
              >
                {projects.map((project) => (
                  <motion.li key={project.id} variants={itemVariants} className="ml-1 first:ml-0">
                    <a
                      href={`#project-${project.id}`}
                      onClick={(e) => { e.preventDefault(); scrollToProject(project.id); }}
                      className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md transition-colors"
                      title={project.title}
                    >
                       <FolderKanban size={16} />
                       <span className='truncate max-w-[100px]'>{project.title}</span>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            )}

            {/* Statik Linkler (Bar içinde) */}
            <div className="hidden md:flex items-center space-x-3 pl-3 border-l border-gray-300 dark:border-gray-600">
              <Link href="/contact" className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Mail size={16} /> İletişim
              </Link>
            </div>

            {/* Ayırıcı */}
            <div className="hidden md:block h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2"></div>

            {/* Sağ Taraftaki Butonlar (Bar içinde) */}
            <div className="flex items-center gap-1 md:gap-2 pl-1">
                <button title="Dil (Yakında)" disabled className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50">
                  <Languages className="h-5 w-5" />
                </button>
            </div>
          </motion.div> {/* Bar Alanı Sonu */}

          {/* Mobil Hamburger (Placeholder) */}
          <div className="md:hidden ml-2"></div>

        </div> {/* Ana navbar kutusu Sonu */}
      </div>
    </motion.div> // Ana Konteyner Sonu
  );
};

export default CustomNavbar;