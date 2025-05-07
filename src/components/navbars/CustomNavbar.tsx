// src/components/CustomNavbar.tsx
// (Sıralama ve İkon/Yazı Hizalama Düzeltildi, Animasyon Korundu)
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjects } from '../../services/projectService'; // Yolu kontrol et
import { IProject } from '../../types/projects'
import { CodeXml, Mail, Languages, FolderKanban, Menu as MenuIcon, X, Home } from 'lucide-react'; // İkonlar
import { cn } from '../../lib/utils'; // Yolu kontrol et
import { Button } from '../../components/ui/button';

const CustomNavbar: React.FC = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchNavbarProjects = async () => {
      try {
        const fetchedProjects = await getProjects();
        setProjects(fetchedProjects);
      } catch (err) { console.error("Navbar proje fetch hatası:", err); }
      finally { setLoading(false); }
    };
    const timer = setTimeout(fetchNavbarProjects, 150);
    return () => clearTimeout(timer);
  }, []);

  const scrollToProject = (projectId: string) => {
      const element = document.getElementById(`project-${projectId}`);
      if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
          console.warn(`Element with id 'project-${projectId}' not found.`);
      }
  };

  const toggleMobileMenu = () => { setIsMobileMenuOpen(!isMobileMenuOpen); };

  // --- Animasyon Variantları (Aynı Kalıyor) ---
  const startDelay = 0.1;
  const logoContainerVariants = { hidden: { y: -80, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 15, delay: startDelay } }};
  const logoItselfVariants = { rest: { rotate: 0 }, spin: { rotate: 360, transition: { delay: startDelay + 0.4, duration: 0.5, ease: 'linear' } }};
  const barContainerVariants = { hidden: { width: 0, opacity: 0, transition: { duration: 0.3 } }, visible: (hasProjects: boolean) => ({ width: hasProjects ? 'auto' : 0, opacity: 1, transition: { delay: startDelay + 0.5, duration: 0.4, ease: 'easeOut' } })};
  const listVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: startDelay + 0.7 } }};
  const itemVariants = { hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 }};

  return (
    // Ana Konteyner
    <motion.div className="fixed top-0 left-1/2 -translate-x-1/2 mt-[20px] z-50 w-full max-w-fit">
      <div className="container flex justify-center">
        {/* Navbar'ın görünen kutusu */}
        <div className={cn( "flex items-center", "bg-white/80 dark:bg-gray-900/80", "border border-gray-200 dark:border-gray-700/50", "backdrop-blur-lg", "py-2 pl-2 pr-3 rounded-full shadow-lg", "overflow-visible" )}>

          {/* 1. Logo Alanı (Animasyonlu) */}
          <motion.div variants={logoContainerVariants} initial="hidden" animate={!loading ? "visible" : "hidden"} className="flex-shrink-0 z-10">
            <motion.div variants={logoItselfVariants} initial="rest" animate={!loading ? "spin" : "rest"} className="flex items-center justify-center w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-full text-white shadow" aria-label="Ana Sayfa" title="Ana Sayfa">
               <Link href="/" className="flex items-center justify-center w-full h-full"><CodeXml size={20} /></Link>
            </motion.div>
          </motion.div>

          {/* 2. Bar Alanı (Animasyonlu - SADECE MASAÜSTÜ) */}
          <motion.div
            className="hidden md:flex items-center overflow-hidden ml-2" // Mobil için hidden
            variants={barContainerVariants}
            initial="hidden"
            animate={!loading ? "visible" : "hidden"}
            custom={projects.length > 0 || true} // <<< Bar her zaman açılsın (statik linkler var), sadece içindeki UL proje olunca dolsun
          >
            {/* -------- MASAÜSTÜ İçeriği - DOĞRU SIRAYLA -------- */}

            {/* Dinamik Proje Scroll Linkleri */}
            {projects.length > 0 && (
                <motion.ul className="flex items-center" variants={listVariants} initial="hidden" animate="visible" >
                  {projects.map((project) => (
                    <motion.li key={project.id} variants={itemVariants} className="ml-1 first:ml-0">
                      <a href={`#project-${project.id}`} onClick={(e) => { e.preventDefault(); scrollToProject(project.id); }}
                         className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md transition-colors" // <<< flex items-center gap-1
                         title={project.title} >
                         <FolderKanban size={16} />
                         <span className='truncate max-w-[100px]'>{project.title}</span>
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
            )}

            {/* Ayırıcı (Projeler VE Statik Linkler varsa) */}
            {projects.length > 0 && ( // <<< Sadece proje varsa ve statik link de varsa göster
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-3"></div>
            )}

            {/* Statik Linkler */}
            <div className="flex items-center space-x-3  border-gray-300 dark:border-gray-600"> {/* <<< border-l buraya daha mantıklı */}
              <Link href="/contact"
                    className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" // <<< flex items-center gap-1
              >
                <Mail size={16} /> İletişim
              </Link>
              {/* Diğer statik linkler */}
            </div>

            {/* Ayırıcı */}
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-3"></div>

            {/* Sağ Taraftaki Butonlar */}
            <div className="flex items-center gap-1 md:gap-2"> {/* pl-1 kaldırıldı */}
                <button title="Dil (Yakında)" disabled className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50">
                  <Languages className="h-5 w-5" />
                </button>
            </div>
            {/* -------- MASAÜSTÜ İçeriği SONU -------- */}
          </motion.div>

          {/* 3. Mobil Hamburger Butonu */}
          <div className="md:hidden flex items-center ml-auto pl-2 border-l border-gray-300 dark:border-gray-600">
             <button onClick={toggleMobileMenu} className="p-2 ..." aria-label="Menüyü aç/kapat">
               {isMobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
             </button>
          </div>

        </div> {/* Ana navbar kutusu Sonu */}
      </div> {/* Container Sonu */}


      {/* --- MOBİL MENÜ PANELİ (GÜNCELLENDİ) --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            // <<< Panel genişliği artırıldı (left-2 right-2) >>>
            className="absolute left-2 top-[calc(100%+8px)] md:hidden z-40"
          >
             {/* Panel Stili */}
             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 p-3"> {/* Padding biraz azaltıldı */}
               {/* <<< ul ve li kaldırıldı, direkt Button'lar kullanıldı >>> */}
               <div className="flex flex-col space-y-1"> {/* Butonlar arası boşluk */}

                 {/* Mobil Menü Linkleri (Button olarak) */}
                 <Button variant="ghost" size="sm" asChild className="w-full justify-start gap-2">
                   <Link href="/" onClick={toggleMobileMenu}>
                     <Home size={16} /> Ana Sayfa
                   </Link>
                 </Button>

                 <Button variant="ghost" size="sm" asChild className="w-full justify-start gap-2">
                   <Link href="/contact" onClick={toggleMobileMenu}>
                     <Mail size={16} /> İletişim
                   </Link>
                 </Button>


                 {/* Proje Scroll Linkleri (Button olarak) */}
                 {projects.length > 0 && <hr className="my-2 border-gray-200 dark:border-gray-700"/>}
                 {projects.map(project => (
                   <Button variant="ghost" size="sm" asChild key={'mobile-' + project.id} className="w-full justify-start gap-2">
                     <a
                       href={`#project-${project.id}`}
                       onClick={(e) => {
                         e.preventDefault();
                         scrollToProject(project.id);
                         toggleMobileMenu(); // Menüyü kapat
                       }}
                     >
                       <FolderKanban size={16} />
                       {/* <<< Yazı sığması için truncate eklendi >>> */}
                       <span className="truncate">{project.title}</span>
                     </a>
                   </Button>
                 ))}

                 {/* Dil Butonu (Button olarak) */}
                  <hr className="my-2 border-gray-200 dark:border-gray-700"/>
                  <Button variant="ghost" size="sm" disabled className="w-full justify-start gap-2 text-gray-500 disabled:opacity-50">
                     <Languages className="h-5 w-5" /> Dil (Yakında)
                  </Button>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* --- MOBİL MENÜ PANELİ SONU --- */}

    </motion.div> // Ana Konteyner Sonu
  );
};

export default CustomNavbar;