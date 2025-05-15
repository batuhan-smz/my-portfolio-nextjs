// src/components/layout/Footer.tsx
"use client"; // useTheme hook'u için gerekli

import React from 'react';
import Link from 'next/link'; // Next.js Link
import { useTheme } from 'next-themes';
// lucide-react ikonları (dicons yerine)
import { Moon, Sun, ArrowUp, Mail, Twitter, Linkedin, Github, CodeXml} from 'lucide-react';

// Scroll to top fonksiyonu
function handleScrollTop() {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
}

const Footer: React.FC = () => {
  const { setTheme } = useTheme();

  // Footer linkleri için veri (Özelleştirilmeli)
  const footerNav = {
    // Belki sadece birkaç ana link yeterli olur?
    anaLinkler: [
      { name: 'Ana Sayfa', href: '/' },
      { name: 'Projelerim (Scroll)', href: '#project-list-start' }, // Veya ana sayfadaki proje listesinin başına ID ver
      { name: 'Hakkımda (Scroll)', href: '#hakkimda' },
    ],
    sosyalMedya: [
      { name: 'GitHub', href: 'https://github.com/batuhan-smz', icon: Github },
      { name: 'LinkedIn', href: 'https://linkedin.com/in/batuhan-semiz', icon: Linkedin },
      { name: 'Twitter', href: 'https://twitter.com/Batuhansemi8', icon: Twitter },
      { name: 'Mail', href: 'mailto:batuhansemiz15@gmail.com', icon: Mail },
    ]
  };

  // Linkler için stil
  const socialLinkStyle = "text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors";
  const footerLinkStyle = "text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors";

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="container mx-auto px-6 py-12 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo ve Açıklama */}
          <div className="space-y-4">
             <Link href="/" className="flex items-center space-x-2">
                {/* Kendi logonuzu veya ikonunuzu kullanın */}
                <CodeXml className="h-8 w-8 text-blue-600 dark:text-blue-500" />
                <span className="text-xl font-semibold text-gray-800 dark:text-white">Portföyüm</span>
             </Link>
            <p className="text-sm leading-6 text-gray-600 dark:text-gray-400 max-w-xs">
               {/* Kısa bir site açıklaması veya motto */}
               Yenilikçi projeler ve çözümlerle dolu portföyüme hoş geldiniz.
            </p>
            {/* Sosyal Medya İkonları */}
            <div className="flex space-x-5">
              {footerNav.sosyalMedya.map((item) => (
                <a key={item.name} href={item.href} className={socialLinkStyle} target="_blank" rel="noopener noreferrer" aria-label={item.name}>
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Sütunları (Basitleştirilmiş) */}
          <div className="mt-16 grid gap-8 xl:mt-0">
             {/* Sütun 1 */}
            <div className="md:grid md:grid-cols-1 md:gap-8">
               <div>
                 <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Navigasyon</h3>
                 <ul role="list" className="mt-4 space-y-2">
                   {footerNav.anaLinkler.map((item) => (
                     <li key={item.name}>
                       {/* Eğer scroll linki ise 'a', sayfa linki ise 'Link' kullan */}
                       {item.href.startsWith('#') ? (
                         <a
                           href={item.href}
                           onClick={(e) => {
                             e.preventDefault();
                             const targetId = item.href.substring(1); // # işaretini kaldır
                             const element = document.getElementById(targetId);
                             if (element) {
                               element.scrollIntoView({ behavior: 'smooth', block: 'start'});
                             }
                           }}
                           className={footerLinkStyle}
                         >
                           {item.name}
                         </a>
                       ) : (
                         <Link href={item.href} className={footerLinkStyle}>
                           {item.name}
                         </Link>
                       )}
                     </li>
                   ))}
                 </ul>
               </div>
            </div>
             {/* İsterseniz daha fazla link sütunu ekleyebilirsiniz */}
             {/* Sütun 2 */}
             {/* <div className="md:grid md:grid-cols-1 md:gap-8"> ... </div> */}
          </div>

          {/* ========= YENİ İLETİŞİM ALANI BAŞLANGICI ========= */}
            <div className="mt-16 grid gap-8 xl:mt-0">
              <div className="md:grid md:grid-cols-1 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                    Hızlı İletişim
                  </h3>
                  <div className="mt-4 space-y-2">
                    <a
                      href="mailto:batuhansemiz15@gmail.com" // <<< Kendi E-posta Adresini Yaz
                      className="flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors group"
                    >
                      <Mail size={16} className="mr-2 flex-shrink-0 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                      batuhansemiz15@gmail.com {/* <<< Kendi E-posta Adresini Yaz */}
                    </a>
                    <Link
                      href="/contact" // İletişim sayfanın yolu
                      className="flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors group"
                    >
                      {/* <MessageCircle (veya başka bir ikon) size={16} className="mr-2 flex-shrink-0 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" /> */}
                      İletişim Sayfasına Git →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* ========= YENİ İLETİŞİM ALANI SONU ========= */}
          

        </div>

        {/* Alt Bölüm: Copyright, Tema ve Yukarı Çık */}
        <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-xs leading-5 text-gray-500 dark:text-gray-400 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Batuhan Semiz. Tüm hakları saklıdır.
          </p>

          {/* Tema ve Yukarı Çık Butonları */}
          <div className="flex items-center space-x-3 border border-gray-300 dark:border-gray-600 rounded-full px-2 py-1">
            <button
              aria-label="Açık Tema"
              title="Açık Tema"
              onClick={() => setTheme("light")}
              className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <Sun className="h-4 w-4" />
            </button>

            <div className="border-l h-4 border-gray-300 dark:border-gray-600"></div> {/* Ayırıcı */}

            <button
              type="button"
              aria-label="Yukarı Çık"
              title="Yukarı Çık"
              onClick={handleScrollTop}
               className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
           >
              <ArrowUp className="h-4 w-4" />
            </button>

            <div className="border-l h-4 border-gray-300 dark:border-gray-600"></div> {/* Ayırıcı */}

            <button
              aria-label="Koyu Tema"
              title="Koyu Tema"
              onClick={() => setTheme("dark")}
               className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
           >
              <Moon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;